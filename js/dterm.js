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
/* global jQuery */
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
        if (options.logoutOnClose) {
            options.close = function() {
                terminal.logout();
                terminal.clear();
            };
        } else {
            options.close = function() {
                terminal.disable();
            };
        }
        var self = this;
        this.dialog($.extend(options, {
            resizeStop: function() {
                var content = self.find('.ui-dialog-content');
                terminal.resize(content.width(), content.height());
            },
            open: function() {
                terminal.focus();
                terminal.resize();
            },
            show: 'fade',
            closeOnEscape: false
        }));
        self.terminal = terminal;
        return self;
    };
})(jQuery);
