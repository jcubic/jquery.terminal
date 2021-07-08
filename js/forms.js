/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This file is part of jQuery Terminal that creates interactive forms
 *
 * Copyright (c) 2014-2021 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define, Promise */
(function(factory) {
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
    $.terminal.forms = {
        types: {
            input: 'input',
            password: 'password',
            boolean: 'boolean',
            checkboxes: 'checkboxes',
            radio: 'radio'
        },
        form: async function(term, data) {
            var result = {};
            var types = $.terminal.forms.types;
            while (data.length) {
                var item = data.shift();
                const {type, name} = item;
                if (type && types[type]) {
                    if (item.message) {
                        term.echo(item.message);
                    }
                    result[name] = await this[types[type]](term, item);
                }
            }
            return result;
        },
        checkboxes: function(term, data) {
            return checkboxes(term, data.items);
        },
        radio: function(term, data) {
            return select(term, data.items);
        },
        boolean: function(term, data) {
            var prompt = data.prompt || '> ';
            var items = [/y|yes/i, /n|no/i];
            if (Array.isArray(data.items) && data.items.length === 2) {
                items = data.items;
            }
            return new Promise(resolve => {
                term.push(function(str) {
                    var value;
                    if (str.match(items[0])) {
                        value = true;
                    } else if (str.match(items[1])) {
                        value = false;
                    }
                    if (typeof value !== 'undefined') {
                        term.pop();
                        resolve(value);
                    }
                }, {
                    prompt
                });
            });
        },
        password: function(term, data) {
            term.set_mask(true);
            return this.input(term, data).then((result) => {
                term.set_mask(false);
                return result;
            });
        },
        input: function(term, data) {
            var prompt = data.prompt || '> ';
            return new Promise((resolve, reject) => {
                term.push(function(str) {
                    this.pop();
                    resolve(str);
                }, {
                    prompt,
                    keymap: {
                        'CTRL+D': reject
                    }
                });
            });
        }
    };
    // -------------------------------------------------------------------------
    function select(term, data) {
        return new Promise((resolve) => {
            var index = term.last_index();
            var selection = 0;
            var keys, values;
            if (data instanceof Array) {
                keys = values = data;
            } else if (data && typeof data === 'object') {
                keys = Object.keys(data);
                values = keys.map(key => data[key]);
            }
            function render(selection) {
                // align with checkboxes
                return keys.map((label, i) => {
                    return `   <bold>${i === selection ? '(o)' : '( )'}</bold>: ${label}`;
                }).join('\n');
            }
            term.echo(render(selection));

            term.push($.noop, {
                prompt: '',
                keypress: function(e) {
                    if (!e.key.match(/Up|Down/i) && e.key.toLowerCase() !== 'enter') {
                        return false;
                    }
                },
                keymap: {
                    ENTER: function() {
                        this.pop();
                        resolve(values[selection]);
                    },
                    ARROWUP: function() {
                        if (selection > 0) {
                            selection--;
                            this.update(index + 1, render(selection), {});
                        }
                    },
                    ARROWDOWN: function() {
                        if (selection < values.length - 1) {
                            selection++;
                            this.update(index + 1, render(selection), {});
                        }
                    }
                }
            });
        });
    }
    // -------------------------------------------------------------------------
    function checkboxes(term, data) {
        return new Promise((resolve) => {
            var index = term.last_index();
            var selection = [];
            var cursor = 0;
            var keys, values;
            if (data instanceof Array) {
                keys = values = data;
            } else if (data && typeof data === 'object') {
                keys = Object.keys(data);
                values = keys.map(key => data[key]);
            }
            function render(cursor, selection) {
                return keys.map((label, i) => {
                    const prefix = cursor === i ? '=>' : '  ';
                    const selected = selection.includes(i);
                    const checkbox = selected ? '&#91;x&#93;' : '&#91; &#93;';
                    return `${prefix} <bold>${checkbox}</bold>: ${label}`;
                }).join('\n');
            }
            term.echo(render(cursor, selection));

            term.push($.noop, {
                prompt: '',
                keypress: function(e) {
                    if (!e.key.match(/Up|Down/i) &&
                        !['enter', ' '].includes(e.key.toLowerCase())) {
                        return false;
                    }
                },
                keymap: {
                    ENTER: function() {
                        this.pop();
                        resolve(values.filter((_, i) => selection.includes(i)));
                    },
                    ' ': function() {
                        if (selection.includes(cursor)) {
                            selection = selection.filter(x => x !== cursor);
                        } else {
                            selection.push(cursor);
                        }
                        this.update(index + 1, render(cursor, selection));
                        return false;
                    },
                    ARROWUP: function() {
                        if (cursor > 0) {
                            cursor--;
                            this.update(index + 1, render(cursor, selection));
                        }
                    },
                    ARROWDOWN: function() {
                        if (cursor < values.length - 1) {
                            cursor++;
                            this.update(index + 1, render(cursor, selection));
                        }
                    }
                }
            });
        });
    }
    // -------------------------------------------------------------------------
    $.terminal.new_formatter([
        /<bold>(.*?)<\/bold>/g, '[[;rgba(256,256,256,0.99);]$1]'
    ]);
});
