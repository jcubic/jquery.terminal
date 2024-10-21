import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnhpsdjbfeldnuclwsgu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduaHBzZGpiZmVsZG51Y2x3c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NDU5MzAsImV4cCI6MjA0NTAyMTkzMH0.KcNTiEJTDqkePhjrCKNBW5Y2uqJvWIKvDJSNk94hLm0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function jargon(this: JQueryTerminal, ...args: string[]) {
    const $ = (globalThis as any).$ as JQueryStatic;

    const options = $.terminal.parse_options(args, { boolean: ['s']} as any);
    console.log({options, args});
    if (options._.length) {
        const query = options._.join(' ');
        const jargon = supabase.from('jargon').select();
        if (options.s) {
            const { data, error } = await jargon.textSearch('term', query, {
                type: 'websearch'
            });
            if (error) {
                this.error(error.message);
            } else {
                this.echo(data.map(entry => {
                    return `[[!bu;#fff;;jargon]${entry.term}]`;
                }).join('\n'));
            }
        } else {
            const { data, error } = await jargon.eq('term', query);
            if (error) {
                this.error(error.message);
            } else {
                console.log(data);
                const entry = format_entry(data);
                this.echo(entry.trim(), {
                    keepWords: true
                });
            }
        }
    } else {
        const msg = 'This is the Jargon File, a comprehens'+
            'ive compendium of hacker slang illuminating m'+
            'any aspects of hackish tradition, folklore, a'+
            'nd humor.\n\nusage: jargon [-s] [QUERY]\n\n-s'+
            ' search jargon file';
        this.echo(msg, {keepWords: true});
    }
}

type JargonEntry = {
    id: number;
    term: string;
    def: string;
};

function format_entry(entries: JargonEntry[]) {
    const $ = (globalThis as any).$ as JQueryStatic;

    let result = entries.map(function(entry: JargonEntry) {
        let text = '[[b;#fff;]' + entry.term + ']';
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
