/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/
 * http://terminal.jcubic.pl
 *
 * this is utility that monkey patch Prism functions to output
 * terminal formatting (it was first created here https://codepen.io/jcubic/pen/zEyxjJ)
 *
 * usage:
 *
 *     you need to include both css and js (it need to be before this file)
 *
 * js code:
 *
 *     code = $.terminal.escape_brackets(code);
 *     code = $.terminal.prism(language, code);
 *
 *     term.echo(code); // or term.less(code) if you include less.js
 *
 * you can also use helper that will create formatter
 *
 *     $.terminal.syntax(language);
 *
 * there is one extra language 'website' that format html with script and style tags
 *
 * by default only javascript markup and css languages are defined (also file extension
 * for them. To have more languages you need to include appropriate js files.
 *
 * Copyright (c) 2018-2024 Jakub Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global define */
(function(factory, undefined) {
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
        define(['jquery', 'prismjs', 'jquery.terminal'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery, Prism) {
            if (Prism === undefined) {
                Prism = require('prismjs');
            }
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
            factory(jQuery, Prism);
            return jQuery;
        };
    } else {
        // Browser
        // istanbul ignore next
        factory(root.jQuery, root.Prism);
    }
})(function($, Prism) {
    if (!$) {
        throw new Error('jQuery Not defined');
    }
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }
    if (typeof Prism === 'undefined') {
        throw new Error('PrismJS not defined');
    }
    var Token = Prism.Token;
    var _ = $.extend({}, Prism);

    _.Token = function() {
        Token.apply(this, [].slice.call(arguments));
    };
    _.Token.stringify = function(o, language, parent) {
        if (typeof o === 'string') {
            return o;
        }

        if (_.util.type(o) === 'Array') {
            return o.map(function(element) {
                return _.Token.stringify(element, language, o);
            }).join('');
        }

        var env = {
            content: _.Token.stringify(o.content, language, parent),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {},
            language: language,
            parent: parent
        };

        if (env.type === 'comment') {
            env.attributes['spellcheck'] = 'true';
        }

        if (o.alias) {
            var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
            Array.prototype.push.apply(env.classes, aliases);
        }

        _.hooks.run('wrap', env);

        return env.content.split(/\n/).map(function(content) {
            if (content) {
                // escape nested non formatting
                // so you can use like <script>alert("[[;red;]xxxx]");</script>
                var parts = content.split(format_split_re).filter(Boolean);
                content = parts.map(function(string) {
                    if (!string.match(/^\x00/)) {
                        return $.terminal.escape_brackets(string).replace(/\\/g, '&#92;');
                    }
                    return string;
                }).join('');
                return '\x00\x00\x00\x00[[b;;;' + env.classes.join(' ') + ']' +
                    content + '\x00\x00\x00\x00]';
            }
            return '';
        }).join('\n');
    };
    // we use 0x00 character so we know which one of the formatting came from prism
    // so we can escape the reset because we unescape original values, the values
    // need to be escape in cmd plugin so you can't type in formatting
    /* eslint-disable */
    var format_split_re = /(\x00\x00\x00\x00(?:\[\[[!gbiuso]*;[^;]*;[^\]]*\](?:[^\]\\]*(\\\\)*\\\][^\]]*|[^\]]*|[^[]*\[[^\]]*)\]?|\]))/i;
    /* eslint-enable */
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
        var props = Object.keys($.terminal.prism_formatters);
        for (var i = props.length; i--;) {
            var prop = props[i];
            if (options[prop] === true && $.terminal.prism_formatters[prop] === true) {
                return true;
            }
        }
        return false;
    }
    $.terminal.prism = function prism(language, string, options) {
        if (!should_render(options)) {
            return string;
        }
        if (language === 'website') {
            var re = /(<\/?\s*(?:script|style)[^>]*>)/g;
            var style;
            var script;
            return string.split(re).filter(Boolean).map(function(string) {
                if (script) {
                    script = false;
                    return $.terminal.prism('javascript', string);
                } else if (style) {
                    style = false;
                    return $.terminal.prism('css', string);
                }
                if (string.match(/^<script/)) {
                    script = true;
                } else if (string.match(/^<style/)) {
                    style = true;
                }
                return $.terminal.prism('html', string);
            }).join('');
        }
        if (language && _.languages[language]) {
            string = $.terminal.unescape_brackets(string);
            var env = {
                code: string,
                grammar: _.languages[language],
                language: language
            };
            _.hooks.run('before-tokenize', env);
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run('after-tokenize', env);
            string = _.Token.stringify(env.tokens, env.language);
            string = string.split(format_split_re).filter(Boolean).map(function(string) {
                if (string.match(/^\x00/)) {
                    return string.replace(/\x00/g, '');
                }
                return $.terminal.escape_brackets(string);
            }).join('');
        }
        return string;
    };
    $.terminal.prism_formatters = {
        echo: true,
        animation: true,
        command: true
    };
    $.terminal.syntax = function syntax(language) {
        // we create function with name so we will see it in developer tools
        // we bind jQuery as argument so it will work when jQuery with noConflict
        // is added after this script
        var name = 'syntax_' + language;
        var fn = new Function('$', 'return function ' + name +
                              '(string, options) { return $.terminal.prism("' + language +
                              '", string, options); }')($);
        fn.__no_warn__ = true;
        var formatters = $.terminal.defaults.formatters;
        $.terminal.defaults.formatters = formatters.filter(function(formatter) {
            if (typeof formatter !== 'function') {
                return true;
            }
            return formatter.name !== name;
        });
        // disable warning because it may create nested formatting
        $.terminal.new_formatter(fn);
    };
});
