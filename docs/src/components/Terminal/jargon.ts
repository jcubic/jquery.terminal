import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';

import {
    jargon_search,
    jargon_abbrev,
    jargon_query
} from '@site/src/supabase';

export default async function jargon(this: JQueryTerminal, ...args: string[]) {
    const $ = (globalThis as any).$ as JQueryStatic;

    const options = $.terminal.parse_options(args, { boolean: ['s']} as any);
    if (options._.length) {
        const query = options._.join(' ');
        if (options.s) {
            const { data, error } = await jargon_search(query);
            if (error) {
                this.error(error.message);
            } else {
                this.echo(data.map(entry => {
                    return `[[!bu;#fff;;jargon]${entry.term}]`;
                }).join('\n'));
            }
        } else {
            const { data: terms, error } = await jargon_query(query);
            if (error) {
                this.error(error.message);
            } else {
                await Promise.all(terms.map(async (entry: JargonEntry) => {
                    const { data: abbrev, error } = await jargon_abbrev(entry.id);
                    if (!error) {
                        entry.abbr = abbrev.map(entry => entry.name);
                    }
                }));
                const entry = format_entry(terms);
                this.echo(entry.trim(), {
                    keepWords: true
                });
            }
        }
    } else {
        const msg = 'This is the Jargon File, a comprehens'+
            'ive compendium of hacker slang illuminating m'+
            'any aspects of hackish tradition, folklore, a'+
            'nd humor.\n\nusage: jargon [-s] &lt;QUERY&gt;'+
            '\n\n-s search jargon file';
        this.echo(msg, {keepWords: true});
    }
}

type JargonEntry = {
    id: number;
    term: string;
    def: string;
    abbr?: string[];
};

function format_entry(entries: JargonEntry[]) {
    const $ = (globalThis as any).$ as JQueryStatic;

    let result = entries.map(function(entry: JargonEntry) {
        let text = '[[b;#fff;]' + entry.term + ']';
        if (entry.abbr) {
            text += ' (' + entry.abbr.join(', ') + ')';
        }
        let re = new RegExp("((?:https?|ftps?)://\\S+)|\\.(?!\\s|\\]\\s)\\)?", "g");
        let def = entry.def.replace(re, function(text, g) {
            return g ? g : (text == '.)' ? '.) ' : '. ');
        });
        re = /\[(?![^;\]]*;[^;\]]*;[^\]]*\])[^\]]+\]/g;
        def = def.replace(re, function(text) {
            return text.replace(/\]/g, '\\]');
        });
        return text + '\n' + def + '\n';
    }).join('\n');
    result = $.terminal.format_split(result).map(function(str) {
        if ($.terminal.is_formatting(str)) {
            return str.replace(/^\[\[([bu]{2};)/, '[[!$1');
        }
        return str;
    }).join('');

    return result;
}
