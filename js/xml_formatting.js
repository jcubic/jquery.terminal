/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * This is example of custom formatter for jQuery Terminal
 *
 * Copyright (c) 2014-2024 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define */
(function(factory) {
    var root;
    /* istanbul ignore next */
    if (typeof window !== 'undefined') {
        root = window;
    } else if (typeof self !== 'undefined') {
        root = self;
    } else if (typeof global !== 'undefined') {
        root = global;
    } else {
        throw new Error('Unknow context');
    }
    /* istanbul ignore next */
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
    /* istanbul ignore next */
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }
    // this formatter allow to echo xml where tags are colors like:
    // <red>hello <navy>blue</navy> world</red>
    // it allso support special tags e.g. link, img or bold
    var tags = {
        font: function(attrs) {
            var styles = [];
            if ('size' in attrs) {
                styles.push('--size:' + attrs.size);
            }
            if ('spacing' in attrs) {
                styles.push('letter-spacing: ' + attrs.spacing);
            }
            var background = attrs.background || '';
            var color = attrs.color || '';
            var style = styles.length ? '{"style": "' + styles.join(';') + '"}' : '';
            return '[[;' + color + ';' + background + ';;;' + style + ']';
        },
        img: function(attrs) {
            var cls = attrs.class || '';
            var alt = attrs.alt || '';
            var src = attrs.src || '';
            delete attrs.alt;
            delete attrs.class;
            delete attrs.src;
            var formatting = ['@', '', '', cls, src, JSON.stringify(attrs)];
            return '[[' + formatting.join(';') + ']' + alt + ']';
        },
        bold: style('b'),
        overline: style('o'),
        strike: style('s'),
        underline: style('u'),
        glow: style('g'),
        italic: style('i'),
        reverse: style('r'),
        span: function(attrs) {
            var cls = attrs.class || '';
            delete attrs.class;
            var formatting = ['', '', '', cls, '', JSON.stringify(attrs)];
            return '[[' + formatting.join(';') + ']';
        },
        link: function(attrs) {
            var cls = attrs.class || '';
            var href = attrs.href || '';
            delete attrs.class;
            delete attrs.href;
            var formatting = ['!', '', '', cls, href, JSON.stringify(attrs)];
            return '[[' + formatting.join(';') + ']';
        }
    };
    function style(value) {
        return function(attrs) {
            var cls = attrs.class || '';
            delete attrs.class;
            var formatting = [value, '', '', cls, '', JSON.stringify(attrs)];
            return '[[' + formatting.join(';') + ']';
        };
    }
    // short aliases
    tags.b = tags.bold;
    tags.a = tags.link;
    tags.i = tags.italic;
    tags.r = tags.reverse;
    var tag_re = /(<\/?\s*[a-zA-Z]+(?:\s?[^>]+)?>)/;
    function no_target(options) {
        if (!options) {
            return true;
        }
        return Object.keys(options).length === 1 && 'position' in options;
    }
    function should_render(options) {
        if (no_target(options)) {
            return true;
        }
        for (var i = targets.length; i--;) {
            var prop = targets[i];
            if (options[prop] === true && $.terminal.xml_formatter[prop] === true) {
                return true;
            }
        }
        return false;
    }
    function xml_formatter(string, options) {
        if (!should_render(options)) {
            return string;
        }
        return string.split(tag_re).map(function(string) {
            if (string.match(tag_re)) {
                if (string[1] === '/') {
                    return ']';
                }
                string = string.replace(/^<|>$/g, '');
                var m = string.match(/^([a-zA-Z]+)(?:\s*(.+))?/);
                if (!m) {
                    // invalid XML
                    return string;
                }
                var name = m[1].toLowerCase();
                var attrs = {};
                if (m[2]) {
                    var string_attrs = m[2];
                    var re = /([\w-]+)\s*=\s*"([^"]+)"/g;
                    var match;
                    while (match = re.exec(string_attrs)) {
                        var attr_name = match[1];
                        var value = match[2];
                        attrs[attr_name] = value;
                    }
                }
                if (tags[name]) {
                    return tags[name](attrs);
                } else {
                    var cls = attrs.class || '';
                    var formatting = ['', name, '', cls, '', JSON.stringify(attrs)];
                    return '[[' + formatting.join(';') + ']';
                }
            }
            return string.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }).join('');
    }
    xml_formatter.__no_warn__ = true;
    xml_formatter.tags = tags;

    var targets = ['echo', 'prompt', 'animation', 'command'];
    targets.forEach(function(target) {
        xml_formatter[target] = true;
    });

    $.terminal.defaults.allowedAttributes.push('style');
    $.terminal.xml_formatter = xml_formatter;
    $.terminal.new_formatter(xml_formatter);
});
