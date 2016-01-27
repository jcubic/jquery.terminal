/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * Copyright (c) 2014-2016 Jakub Jankiewicz <http://jcubic.pl>
 *
 * This is example of how to create custom formatter for jQuery Terminal
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
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }
    // this formatter allow to echo xml where tags are colors like:
    // <red>hello <navy>blue</navy> world</red>
    $.terminal.defaults.formatters.push(function(string) {
        var stack = [];
        var output = [];
        var parts = string.split(/(<\/?[a-zA-Z]+>)/);
        for (var i=0; i<parts.length; ++i) {
            if (parts[i][0] == '<') {
                if (parts[i][1] == '/') {
                    if (stack.length) {
                        stack.pop();
                    }
                } else {
                    stack.push(parts[i].replace(/^<|>$/g, ''));
                }
            } else {
                if (stack.length) {
                    // top of the stack
                    output.push('[[;' + stack[stack.length-1] + ';]');
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
