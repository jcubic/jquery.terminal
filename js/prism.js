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
 *     code = $.terminal.prism(language, code);
 *
 *     term.echo(code); // or term.less(code) if you include less.js
 *
 * by default only javascript markup and css languages are defined (also file extension
 * for them. To have more languages you need to include appropriate js files.
 *
 * Copyright (c) 2018 Jakub Jankiewicz <http://jcubic.pl/me>
 * Released under the MIT license
 *
 */
/* global jQuery, Prism */



(function(Token, $) {
    if (typeof Prism === 'undefined') {
        throw new Error('PrismJS not defined');
    }
    var _ = $.extend({}, Prism);

    _.Token = function(type, content, alias, matchedStr, greedy) {
        Token.apply(this, [].slice.call(arguments));
    };
    _.Token.stringify = function(o, language, parent) {
        if (typeof o == 'string') {
            return o;
        }

        if (_.util.type(o) === 'Array') {
            return o.map(function(element) {
                return _.Token.stringify(element, language, o);
            }).join('');
        }

        var env = {
            type: o.type,
            content: _.Token.stringify(o.content, language, parent),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {},
            language: language,
            parent: parent
        };

        if (env.type == 'comment') {
            env.attributes['spellcheck'] = 'true';
        }

        if (o.alias) {
            var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
            Array.prototype.push.apply(env.classes, aliases);
        }

        _.hooks.run('wrap', env);

        return env.content.split(/\n/).map(function(content) {
            return content ? '[[b;;;' + env.classes.join(' ') + ']' + content + ']' : '';
        }).join('\n');
    };
    if (!$) {
        throw new Error('jQuery Not defined');
    }
    if (!$.terminal) {
        throw new Error('$.terminal is not defined');
    }
    jQuery.terminal.prism = function(language, text) {
        if (language && _.languages[language]) {
            var grammar = _.languages[language];
            var tokens = _.tokenize(text, grammar);
            text = _.Token.stringify(tokens, language);
        }
        return text;
    };
})(Prism.Token, jQuery);
