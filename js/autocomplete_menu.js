/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * Wwrapper for options that will create autocomplete menu for jQuery Terminal
 *
 * Copyright (c) 2014-2019 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define, global, require, module, setTimeout */
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
    var jquery_terminal = $.fn.terminal;
    $.fn.terminal = function(interpreter, options) {
        return jquery_terminal.call(this, interpreter, autocomplete_menu(options));
    };
    function autocomplete_menu(options) {
        var settings = options || {};
        function complete_menu(term, e, list) {
            var matched = [];
            var word = term.before_cursor(true);
            var regex = new RegExp('^' + $.terminal.escape_regex(word));
            for (var i = list.length; i--;) {
                if (regex.test(list[i])) {
                    matched.push(list[i]);
                }
            }
            if (e.which === 9) {
                if (term.complete(matched)) {
                    word = term.before_cursor(true);
                    regex = new RegExp('^' + $.terminal.escape_regex(word));
                }
            }
            if (word && matched.length) {
                ul.hide();
                for (i = 0; i < matched.length; ++i) {
                    var text = matched[i].replace(regex, '');
                    if (text) {
                        $('<li>' + text + '</li>').appendTo(ul);
                    }
                }
                ul.show();
            }
        }
        var ul;
        if (typeof settings.completion !== 'undefined') {
            var onInit = settings.onInit || $.noop;
            var keydown = settings.keydown || $.noop;
            var completion = settings.completion;
            delete settings.completion;
            settings.onInit = function(term) {
                onInit.call(this, term);
                var wrapper = this.cmd().find('.cmd-cursor').
                    wrap('<span/>').parent().addClass('cursor-wrapper');
                ul = $('<ul></ul>').appendTo(wrapper);
                ul.on('click', 'li', function() {
                    term.insert($(this).text());
                    ul.empty();
                });
            };
            settings.keydown = function(e, term) {
                // setTimeout because terminal is adding characters in keypress
                // we use keydown because we need to prevent default action
                // for tab and still execute custom code
                setTimeout(function() {
                    ul.empty();
                    if (typeof completion === 'function') {
                        var ret = completion.call(term);
                        if (ret && typeof ret.then === 'function') {
                            ret.then(complete_menu.bind(null, term, e));
                        } else if (ret instanceof Array) {
                            complete_menu(term, e, ret);
                        }
                    } else if (completion instanceof Array) {
                        complete_menu(term, e, completion);
                    }
                }, 0);
                var ret = keydown.call(this, e, term);
                if (typeof ret !== 'undefined') {
                    return false;
                }
                if (e.which === 9) {
                    return false;
                }
            };
        }
        return settings;
    }
});
