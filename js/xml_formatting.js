/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This is example of how to create custom formatter for jQuery Terminal
 *
 * Copyright (c) 2014-2017 Jakub Jankiewicz <http://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global jQuery */
(function($) {
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }
    // this formatter allow to echo xml where tags are colors like:
    // <red>hello <navy>blue</navy> world</red>
    $.terminal.defaults.formatters.push(function(string) {
        var stack = [];
        var output = [];
        var parts = string.split(/(<\/?[a-zA-Z]+>)/);
        for (var i = 0; i < parts.length; ++i) {
            if (parts[i][0] === '<') {
                if (parts[i][1] === '/') {
                    if (stack.length) {
                        stack.pop();
                    }
                } else {
                    stack.push(parts[i].replace(/^<|>$/g, ''));
                }
            } else {
                if (stack.length) {
                    // top of the stack
                    output.push('[[;' + stack[stack.length - 1] + ';]');
                }
                output.push(parts[i]);
                if (stack.length) {
                    output.push(']');
                }
            }
        }
        return output.join('');
    });
})(jQuery);
