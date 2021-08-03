/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This is example of how to create less like command for jQuery Terminal
 * the code is based on the one from leash shell and written as jQuery plugin
 *
 * Copyright (c) 2018-2021 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define */
(function(factory, undefined) {
    var root;
    if (typeof window !== 'undefined') {
        root = window;
    } else if (typeof self !== 'undefined') {
        root = self;
    } else if (typeof global !== 'undefined') {
        root = global;
    } else {
        throw new Error('Unknow context');
    }
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // istanbul ignore next
        define(['jquery', 'jquery.terminal'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (window !== undefined) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            if (!jQuery.fn.terminal) {
                if (window !== undefined) {
                    require('jquery.terminal');
                } else {
                    require('jquery.terminal')(jQuery);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser
        // istanbul ignore next
        factory(root.jQuery);
    }
})(function($) {
    var img_split_re = /(\[\[(?:[^;]*@[^;]*);[^;]*;[^\]]*\]\s*\])/;
    var img_re = /\[\[(?:[^;]*@[^;]*);[^;]*;[^;]*;[^;]*;([^;]*)\] ?\]/;
    // -------------------------------------------------------------------------
    function find(arr, fn) {
        for (var i in arr) {
            if (fn(arr[i])) {
                return arr[i];
            }
        }
    }
    // -------------------------------------------------------------------------
    // $.when is always async we don't want that for normal non images
    // -------------------------------------------------------------------------
    function unpromise(args, fn) {
        var found = find(args, function(arg) {
            return typeof arg.then === 'function';
        });
        if (found) {
            return $.when.apply($, args).then(fn);
        } else {
            return fn.apply(null, args);
        }
    }
    // -------------------------------------------------------------------------
    // slice images into terminal lines - each line is unique blob url
    function slice_image(img_data, width, y1, y2) {
        // render slice on canvas and get Blob Data URI
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = y2 - y1;
        ctx.putImageData(img_data, 0, 0);
        var defer = $.Deferred();
        canvas.toBlob(function(blob) {
            if (blob === null) {
                defer.resolve(null);
            } else {
                defer.resolve(URL.createObjectURL(blob));
            }
        });
        return defer.promise();
    }
    function slice(src, options) {
        var settings = $.extend({
            width: null,
            line_height: null
        }, options);
        var img = new Image();
        var defer = $.Deferred();
        var slices = [];
        img.onload = function() {
            var height, width;
            if (settings.width < img.width) {
                height = Math.floor((img.height * settings.width) / img.width);
                width = settings.width;
            } else {
                height = img.height;
                width = img.width;
            }
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            // scale the image to fit the terminal
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
            (function recur(start) {
                // loop over slices
                if (start < height) {
                    var y1 = start, y2 = start + settings.line_height;
                    if (y2 > height) {
                        y2 = height;
                    }
                    var img_data = ctx.getImageData(0, y1, width, y2);
                    slice_image(img_data, width, y1, y2).then(function(uri) {
                        slices.push(uri);
                        recur(y2);
                    });
                } else {
                    defer.resolve(slices);
                }
            })(0);
        };
        img.onerror = function() {
            defer.reject('Error loading the image: ' + src);
        };
        // images need to have CORS if on different server,
        // without this it will throw error
        img.crossOrigin = "anonymous";
        img.src = src;
        return defer.promise();
    }
    // -----------------------------------------------------------------------------------
    function less(term, text, options) {
        var export_data = term.export_view();
        var cols, rows;
        var pos = 0;
        var original_lines;
        var lines;
        var prompt = '';
        var left = 0;
        var $output = term.find('.terminal-output');
        var had_cache = term.option('useCache');
        if (!had_cache) {
            term.option('useCache', true);
        }
        var cmd = term.cmd();
        var scroll_by = 3;
        //term.on('mousewheel', wheel);
        var in_search = false, last_found, search_string;
        // -------------------------------------------------------------------------------
        function print() {
            // performance optimization
            term.find('.terminal-output').css('visibilty', 'hidden');
            term.clear();
            if (lines.length - pos > rows - 1) {
                prompt = ':';
            } else {
                prompt = '[[;;;cmd-inverted](END)]';
            }
            term.set_prompt(prompt);
            var to_print = lines.slice(pos, pos + rows - 1);
            var should_substring = options.wrap ? false : to_print.filter(function(line) {
                var len = $.terminal.length(line);
                return len > cols;
            }).length;
            if (should_substring) {
                to_print = to_print.map(function(line) {
                    return $.terminal.substring(line, left, left + cols - 1);
                });
            }
            if (to_print.length < rows - 1) {
                while (rows - 1 > to_print.length) {
                    to_print.push('~');
                }
            }
            var finalize;
            if (options.ansi) {
                finalize = function(div) {
                    div.addClass('ansi');
                };
            }
            term.echo(to_print.join('\n'), {
                finalize: finalize
            });
            if (term.find('.terminal-output').is(':empty')) {
                // sometimes the output is not flushed not idea why
                // TODO: investigate
                term.flush();
            }
        }
        // -------------------------------------------------------------------------------
        function quit() {
            term.pop().import_view(export_data);
            clear_cache();
            term.removeClass('terminal-less');
            $output.css('height', '');
            var exit = options.exit || options.onExit;
            if ($.isFunction(exit)) {
                exit();
            }
        }
        // -------------------------------------------------------------------------------
        var cache = {};
        function clear_cache() {
            if (!had_cache) {
                term.option('useCache', false).clear_cache();
            }
            Object.keys(cache).forEach(function(width) {
                Object.keys(cache[width]).forEach(function(img) {
                    cache[width][img].forEach(function(uri) {
                        URL.revokeObjectURL(uri);
                    });
                });
            });
            cache = {};
        }
        // -------------------------------------------------------------------------------
        function fixed_output() {
            // this will not change on resize, but the font size may change
            var height = cmd.outerHeight(true);
            term.addClass('terminal-less');
            $output.css('height', 'calc(100% - ' + height + 'px)');
        }
        // -------------------------------------------------------------------------------
        function refresh_view() {
            cols = term.cols();
            rows = term.rows();
            fixed_output();
            function cont(l) {
                original_lines = process_optional_wrap(l);
                lines = original_lines.slice();
                if (in_search) {
                    search(last_found);
                } else {
                    print();
                }
            }
            function process_optional_wrap(arg) {
                if (arg instanceof Array) {
                    if (options.wrap) {
                        arg = arg.join('\n');
                        return $.terminal.split_equal(arg, cols, options.keepWords);
                    }
                    return arg;
                } else if (options.wrap) {
                    return $.terminal.split_equal(arg, cols, options.keepWords);
                } else {
                    return [arg];
                }
            }
            function run(arg) {
                var text;
                if (arg instanceof Array) {
                    if (options.formatters) {
                        text = arg.join('\n');
                    } else {
                        original_lines = arg;
                    }
                } else {
                    text = arg;
                }
                if (text) {
                    if (options.formatters) {
                        text = $.terminal.apply_formatters(text);
                    } else {
                        // prism text will be boken when there are nestings (xml)
                        // and empty formattings
                        text = $.terminal.nested_formatting(text);
                        text = $.terminal.normalize(text);
                    }
                    unpromise([image_formatter(text)], cont);
                } else {
                    unpromise(original_lines.map(image_formatter), function() {
                        var l = Array.prototype.concat.apply([], arguments);
                        cont(l);
                    });
                }
            }
            if ($.isFunction(text)) {
                text(cols, run);
            } else {
                run(text);
            }
        }
        // -------------------------------------------------------------------------------
        function cursor_size() {
            var cursor = term.find('.cmd-cursor')[0];
            return cursor.getBoundingClientRect();
        }
        // -------------------------------------------------------------------------------
        function image_formatter(text) {
            var defer = $.Deferred();
            if (!text.match(img_re)) {
                return text.split('\n');
            }
            var parts = text.split(img_split_re).filter(Boolean);
            var result = [];
            (function recur() {
                function concat_slices(slices) {
                    cache[width][img] = slices;
                    result = result.concat(slices.map(function(uri) {
                        return '[[@;;;;' + uri + ']]';
                    }));
                    recur();
                }
                if (!parts.length) {
                    return defer.resolve(result);
                }
                var part = parts.shift();
                var m = part.match(img_re);
                if (m) {
                    var img = m[1];
                    var rect = cursor_size();
                    var width = term.width();
                    var opts = {
                        width: width,
                        line_height: Math.floor(rect.height)
                    };
                    cache[width] = cache[width] || {};
                    if (cache[width][img]) {
                        concat_slices(cache[width][img]);
                    } else {
                        slice(img, opts).then(concat_slices).catch(function() {
                            var msg = $.terminal.escape_brackets('[BROKEN IMAGE]');
                            var cls = 'terminal-broken-image';
                            result.push('[[;#c00;;' + cls + ']' + msg + ']');
                            recur();
                        });
                    }
                } else {
                    if (part !== '\n') {
                        result = result.concat(part.split('\n'));
                    }
                    recur();
                }
            })();
            return defer.promise();
        }
        // -------------------------------------------------------------------------------
        function search(start, reset) {
            var escape = $.terminal.escape_brackets(search_string);
            var flag = search_string.toLowerCase() === search_string ? 'i' : '';
            var start_re = new RegExp('^(' + escape + ')', flag);
            var index = -1;
            var prev_format = '';
            var formatting = false;
            var in_text = false;
            var count = 0;
            lines = original_lines.slice();
            if (reset) {
                index = pos = 0;
            }
            for (var i = start; i < lines.length; ++i) {
                var line = lines[i];
                for (var j = 0, jlen = line.length; j < jlen; ++j) {
                    if (line[j] === '[' && line[j + 1] === '[') {
                        formatting = true;
                        in_text = false;
                        start = j;
                    } else if (formatting && line[j] === ']') {
                        if (in_text) {
                            formatting = false;
                            in_text = false;
                        } else {
                            in_text = true;
                            prev_format = line.substring(start, j + 1);
                        }
                    } else if (formatting && in_text || !formatting) {
                        if (line.substring(j).match(start_re)) {
                            var rep;
                            if (formatting && in_text) {
                                var style = prev_format.match(/\[\[([^;]+)/);
                                var new_format = ';;;terminal-inverted';
                                style = style ? style[1] : '';
                                if (style.match(/!/)) {
                                    new_format = style + new_format + ';';
                                    new_format += prev_format.replace(/]$/, '')
                                        .split(';').slice(4).join(';');
                                }
                                rep = '][[' + new_format + ']$1]' + prev_format;
                            } else {
                                rep = '[[;;;terminal-inverted]$1]';
                            }
                            line = line.substring(0, j) +
                                line.substring(j).replace(start_re, rep);
                            j += rep.length - 2;
                            if (i >= pos && index === -1) {
                                index = pos = i;
                            }
                            count++;
                        }
                    }
                }
                lines[i] = line;
            }
            print();
            term.set_command('');
            term.set_prompt(prompt);
            if (count === 1) {
                return -1;
            }
            return index;
        }
        // -------------------------------------------------------------------------------
        function scroll(delta, scroll_by) {
            if (delta > 0) {
                pos -= scroll_by;
                if (pos < 0) {
                    pos = 0;
                }
            } else if (pos <= lines.length - rows) {
                pos += scroll_by;
                if (pos - 1 > lines.length - rows) {
                    pos = lines.length - rows + 1;
                }
            }
            print();
            return false;
        }
        term.push($.noop, {
            onResize: refresh_view,
            touchscroll: function(event, delta) {
                var offset = Math.abs(delta);
                scroll(delta, Math.round(offset / 14));
                return false;
            },
            onPaste: function() {
                if (term.get_prompt() !== '/') {
                    return false;
                }
            },
            mousewheel: function(event, delta) {
                return scroll(delta, scroll_by);
            },
            name: 'less',
            keydown: function(e) {
                var command = term.get_command();
                var key = e.key.toUpperCase();
                if (term.get_prompt() !== '/') {
                    if (key === '/') {
                        term.set_prompt('/');
                    } else if (in_search &&
                               $.inArray(e.which, [78, 80]) !== -1) {
                        if (key === 'N') { // search_string
                            if (last_found !== -1) {
                                var ret = search(last_found + 1);
                                if (ret !== -1) {
                                    last_found = ret;
                                }
                            }
                        } else if (key === 'P') {
                            last_found = search(0, true);
                        }
                    } else if (key === 'Q') {
                        quit();
                    } else if (key === 'ARROWRIGHT') {
                        if (!options.wrap) {
                            left += Math.round(cols / 2);
                            print();
                        }
                    } else if (key === 'ARROWLEFT') {
                        if (!options.wrap) {
                            left -= Math.round(cols / 2);
                            if (left < 0) {
                                left = 0;
                            }
                            print();
                            // scroll
                        }
                    } else if (lines.length > rows) {
                        if (key === 'ARROWUP') { //up
                            if (pos > 0) {
                                --pos;
                                print();
                            }
                        } else if (key === 'ARROWDOWN') { //down
                            if (pos <= lines.length - rows) {
                                ++pos;
                                print();
                            }
                        } else if (key === 'PAGEDOWN') {
                            pos += rows - 1;
                            var limit = lines.length - rows + 1;
                            if (pos > limit) {
                                pos = limit;
                            }
                            print();
                        } else if (key === 'PAGEUP') {
                            //Page Down
                            pos -= rows - 1;
                            if (pos < 0) {
                                pos = 0;
                            }
                            print();
                        }
                    }
                    if (!e.ctrlKey && !e.alKey) {
                        return false;
                    }
                    // search
                } else if (e.which === 8 && command === '') {
                    // backspace
                    term.set_prompt(prompt);
                } else if (e.which === 13) { // enter
                    // basic search find only first
                    if (command.length > 0) {
                        in_search = true;
                        pos = 0;
                        search_string = command;
                        last_found = search(0);
                    }
                    // this will disable history
                    return false;
                }
            },
            prompt: prompt
        });
        // -------------------------------------------------------------------------------
        refresh_view();
    }
    // -----------------------------------------------------------------------------------
    $.fn.less = function(text, options) {
        var settings = $.extend({
            onExit: $.noop,
            ansi: false,
            formatters: false
        }, options);
        if (!(this instanceof $.fn.init && this.terminal)) {
            throw new Error('This plugin require jQuery Terminal');
        }
        var term = this.terminal();
        if (!term) {
            throw new Error(
                'You need to invoke this plugin on selector that have ' +
                'jQuery Terminal or on jQuery Terminal instance'
            );
        }
        less(term, text, settings);
        return term;
    };
});
