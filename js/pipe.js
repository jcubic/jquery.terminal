/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This is object enchancment that will add pipe operator and redirects to commands
 *
 * Copyright (c) 2014-2019 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define, global, require, module */
(function(factory) {
    var root = typeof window !== 'undefined' ? window : global;
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
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            if (!jQuery.fn.terminal) {
                if (typeof window !== 'undefined') {
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
    // -----------------------------------------------------------------------
    // :: split over array - returns array of arrays
    // -----------------------------------------------------------------------
    function array_split(array, splitter) {
        var test_fn;
        if (splitter instanceof RegExp) {
            test_fn = function(item) {
                if (item instanceof RegExp) {
                    item = item.source;
                } else if (typeof item !== 'string') {
                    item = item.toString();
                }
                var m = item.match(splitter);
                if (m) {
                    if (m.length > 1) {
                        return m.slice(1);
                    }
                    return true;
                }
            };
        } else {
            test_fn = function(item) {
                return splitter === item;
            };
        }
        var output = [];
        var sub = [];
        array.forEach(function(item) {
            var check = test_fn(item);
            if (check) {
                output.push(sub);
                sub = [];
                if (check instanceof Array) {
                    output.push(check);
                }
            } else {
                sub.push(item);
            }
        });
        output.push(sub);
        return output;
    }
    $.terminal.pipe = function pipe(interpreter, options) {
        var settings = $.extend({
            processArguments: true,
            overwrite: undefined,
            redirects: {}
        }, options);
        if (!$.isPlainObject(interpreter)) {
            throw new Error('Only plain objects supported');
        }
        // -----------------------------------------------------------------
        function parse_redirect(args, re) {
            var redirects = [];
            if (args.length) {
                var cmd_redirect, settings_redirect;
                for (var i = 0; i < args.length; ++i) {
                    var operator = null;
                    if (args[i].length === 1 && args[i][0].match(re)) {
                        operator = args[i][0];
                    }
                    if (operator) {
                        for (var j = settings.redirects.length; j--;) {
                            if (operator === settings.redirects[j].name) {
                                settings_redirect = settings.redirects[j];
                                break;
                            }
                        }
                        cmd_redirect = {
                            fn: settings_redirect.callback,
                            args: []
                        };
                        redirects.push(cmd_redirect);
                    } else {
                        cmd_redirect.args = args[i];
                    }
                }
            }
            return redirects;
        }
        // -----------------------------------------------------------------
        function parse_command(command) {
            var tokens;
            if (settings.processArguments) {
                tokens = $.terminal.parse_arguments(command);
            } else {
                tokens = $.terminal.split_arguments(command);
            }
            return array_split(tokens, '|').map(function(args) {
                var cmd = {
                    redirects: []
                };
                if (settings.redirects.length) {
                    var redirect_names = settings.redirects.map(function(redirect) {
                        return $.terminal.escape_regex(redirect.name);
                    });
                    var re = new RegExp('^(' + redirect_names.join('|') + ')$');
                    var split_args = array_split(args, re);
                    if (split_args.length > 1) {
                        args = split_args[0];
                        cmd.redirects = parse_redirect(split_args.slice(1), re);
                    }
                }
                cmd.name = args[0];
                cmd.args = args.slice(1);
                return cmd;
            });
        }
        // -----------------------------------------------------------------
        function overwrite(command) {
            return command.overwrite === true ||
                typeof command.overwrite === 'undefined' ||
                settings.overwrite === true;
        }
        // -----------------------------------------------------------------
        function redirects(command) {
            var defer = $.Deferred();
            if (overwrite(command)) {
                overwrite_buffer = true;
            }
            function resolve() {
                overwrite_buffer = false;
                defer.resolve();
            }
            if (command.redirects.length) {
                var i = 0;
                (function loop() {
                    var redirect = command.redirects[i++];
                    if (redirect) {
                        var fn = redirect.fn;
                        var args = redirect.args;
                        continuation(fn.apply(term, args), function(value) {
                            echo_non_empty(value);
                            loop();
                        });
                    } else {
                        resolve();
                    }
                })();
            } else {
                resolve();
            }
            return defer.promise();
        }
        // -----------------------------------------------------------------
        function continuation(promise, callback) {
            if (promise && promise.then) {
                promise.then(callback);
                return promise;
            } else {
                callback();
            }
        }
        // -----------------------------------------------------------------
        function echo_non_empty(value) {
            if (typeof value !== 'undefined') {
                term.echo(value);
            }
        }
        // -----------------------------------------------------------------
        function single_command(commands) {
            return commands.length === 1 && !commands[0].redirects.length;
        }
        // -----------------------------------------------------------------
        function make_tty() {
            var tty = {
                read: function(message, callback) {
                    if (typeof tty.buffer === 'undefined') {
                        return orig.read.apply(term, arguments);
                    } else {
                        var text = tty.buffer.replace(/\n$/, '');
                        delete tty.buffer;
                        var d = new $.Deferred();
                        if (typeof callback === 'function') {
                            callback(text);
                        }
                        d.resolve(text);
                        return d.promise();
                    }
                },
                echo: function(string) {
                    if (overwrite_buffer) {
                        overwrite_buffer = false;
                        tty.buffer = '';
                    }
                    tty.buffer = (tty.buffer || '') + string + '\n';
                }
            };
            return tty;
        }
        // -----------------------------------------------------------------
        var overwrite_buffer;
        var term;
        var orig;
        return function(command, t) {
            term = t; // for echo_non_empty and function that call it
            orig = {
                echo: term.echo,
                read: term.read
            };
            var tty = make_tty();
            var commands = parse_command(command);
            function loop(callback) {
                var i = 0;
                var d = new $.Deferred();
                return function inner() {
                    var command = commands[i++];
                    if (command) {
                        redirects(command).then(function() {
                            if (!commands[i]) {
                                $.extend(term, {echo: orig.echo});
                            }
                            continuation(callback(command), inner);
                        });
                    } else {
                        d.resolve();
                    }
                    return d.promise();
                };
            }
            if (single_command(commands)) {
                var cmd = commands[0];
                term.push(interpreter[cmd.name], {
                    prompt: cmd.name + '> ',
                    name: cmd.name,
                    completion: Object.keys(interpreter[cmd.name])
                });
            } else {
                $.extend(term, tty);
                var promise;
                if ($.isPlainObject(interpreter)) {
                    promise = loop(function(command) {
                        var inter = interpreter[command.name];
                        if (typeof inter === 'function') {
                            var ret = inter.apply(term, command.args);
                            return continuation(ret, echo_non_empty);
                        } else if ($.isPlainObject(inter)) {
                            throw new Error('You can\'t pipe nested ' +
                                            'interpreter');
                        } else {
                            throw new Error('Command not found');
                        }
                    })();
                }
                if (promise) {
                    return promise.then(function() {
                        $.extend(term, orig);
                    });
                }
            }
        };
    };
});
