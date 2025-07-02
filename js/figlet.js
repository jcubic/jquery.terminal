/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This is wrapper over Figlet.js library by patorjk
 *
 * Copyright (c) 2024-2025 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define */
(function(factory, undefined) {
    if (typeof module === 'object' && module.exports) {
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
            const figlet = require('figlet');
            factory(jQuery, figlet);
            return jQuery;
        };
    } else {
        // Browser
        // istanbul ignore next
        factory(jQuery, figlet);
    }
})(function($, figlet) {
    if (!$) {
        throw new Error('jQuery Not defined');
    }
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }

    $.terminal.figlet = function(font, text, { color = null, ...options } = {}) {
        return function() {
            const cols = this.cols();
            let result = figlet.textSync(text, {
                font: font,
                width: cols,
                whitespaceBreak: true,
                ...options
            });
            result = trim(result);
            if (color === null) {
                return result;
            }
            return '[[;' + color + ';]' + result + ']';
        };
    };

    const fontpath = 'https://cdn.jsdelivr.net/npm/figlet/fonts';

    $.terminal.figlet.load = (function() {
        const installed = [];
        return function(fonts, fontPath = fontpath) {
            if (all_include(fonts, installed)) {
                return Promise.resolve();
            }
            let last_path;
            return new Promise(resolve => {
                if (last_path !== fontPath) {
                    last_path = fontPath;
                    figlet.defaults({ fontPath });
                }
                figlet.preloadFonts(fonts, () => {
                    installed.push(...fonts);
                    resolve();
                });
            });
        };
    })();

    function all_include(items, list) {
        return items.every(item => list.includes(item));
    }

    function trim(str) {
        return str.replace(/[\s\n]+$/, '').replace(/^\s+\n/, '');
    }
});
