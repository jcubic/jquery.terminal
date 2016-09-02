/*!
 * Example plugin using JQuery Terminal Emulator
 * Copyright (C) 2010-2016 Jakub Jankiewicz <http://jcubic.pl>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
(function($) {
    $.extend_if_has = function(desc, source, array) {
        for (var i=array.length;i--;) {
            if (typeof source[array[i]] != 'undefined') {
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
            options.close = function(e, ui) {
                terminal.logout();
                terminal.clear();
            };
        } else {
            options.close = function(e, ui) {
                terminal.disable();
            };
        }
        var self = this;
        this.dialog($.extend(options, {
            resizeStop: function(e, ui) {
                var content = self.find('.ui-dialog-content');
                terminal.resize(content.width(), content.height());
            },
            open: function(e, ui) {
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
