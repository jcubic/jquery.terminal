/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * Example plugin using JQuery Terminal Emulator
 * Copyright (c) 2014-2017 Jakub Jankiewicz <http://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global jQuery setTimeout IntersectionObserver */
(function($) {
    $.extend_if_has = function(desc, source, array) {
        for (var i = array.length; i--;) {
            if (typeof source[array[i]] !== 'undefined') {
                desc[array[i]] = source[array[i]];
            }
        }
        return desc;
    };
    var defaults = Object.keys($.terminal.defaults).concat(['greetings']);
    $.fn.dterm = function(interpreter, options) {
        var op = $.extend_if_has({}, options, defaults);
        op.enabled = false;
        var terminal = this.terminal(interpreter, op).css('overflow', 'hidden');
        if (!options.title) {
            options.title = 'JQuery Terminal Emulator';
        }
        var close = options.close || $.noop;
        if (options.logoutOnClose) {
            options.close = function() {
                terminal.logout();
                terminal.clear();
                close();
            };
        } else {
            options.close = function() {
                terminal.disable();
                close();
            };
        }
        var self = this;
        if (window.IntersectionObserver) {
            var visibility_observer = new IntersectionObserver(function() {
                if (self.is(':visible')) {
                    terminal.enable().resize();
                } else {
                    self.disable();
                }
            }, {
                root: document.body
            });
            visibility_observer.observe(terminal[0]);
        }
        this.dialog($.extend({}, options, {
            resizeStop: function() {
                var content = self.find('.ui-dialog-content');
                terminal.resize(content.width(), content.height());
            },
            open: function(event, ui) {
                if (!window.IntersectionObserver) {
                    setTimeout(function() {
                        terminal.enable().resize();
                    }, 100);
                }
                if (typeof options.open === 'function') {
                    options.open(event, ui);
                }
            },
            show: 'fade',
            closeOnEscape: false
        }));
        self.terminal = terminal;
        return self;
    };
})(jQuery);
