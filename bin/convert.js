#!/usr/bin/env node
/**@license
 *       __ _____                     ________                              __
 *      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 * /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 * \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *           \/              /____/                              version {{VER}}
 *
 * This file is part of jQuery Terminal. https://terminal.jcubic.pl
 *
 * Copyright (c) 2010-2021 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Released under the MIT license
 */

const $ = global.$ = global.jQuery = {
    fn: {
        extend: function(obj) {
            Object.assign(global.jQuery.fn, obj);
        }
    },
    extend:  Object.assign
};

global.navigator = {
    userAgent: 'Node'
};

require('../js/jquery.terminal-src')(global, global.$);
require('../js/unix_formatting')(global, global.$);

const fs = require('fs').promises;
const path = require('path');
const ansi = require('ansidec');
const iconv = require('iconv-lite');
const lily = require('@jcubic/lily');

const options = lily(process.argv.slice(2), { boolean: ['a', 'ansi'] });

function read_stdin() {
    return new Promise((resolve) => {
        const buff = [];

        process.stdin.on('data', data => {
            buff.push(data);
        }).on('end', () => {
            var len = buff.map(x => x.length).reduce((acc, e) => acc + e);
            resolve(Buffer.concat(buff, len));
        });
    });
}

const input = options.i || options.input;
const output = options.o || options.output;



if (options.h || options.help) {
    usage();
} else if (input) {
    if (input === '-') {
        read_stdin().then(process_buffer);
    } else {
        fs.readFile(input).then(process_buffer);
    }
} else {
    usage();
}

function usage() {
    const bin = path.basename(process.argv[1]);
    const space = ' '.repeat(bin.length);
    console.log('jQuery Terminal utility to convert ANSI escapes');
    console.log('Copyright (c) 2010-2021 Jakub T. Jankiewicz');
    console.log(`
usage:
  ${bin} [--help] [-h] [--input] [-i] [- | <file>]
  ${space} [--output] [-o] <file> [-a] [--ansi]

--ansi -a if this flag is set it will read file or STDIN as ANSI Art (CP437 encoding)
--input -i <file> input ANSI file, if - is used it will read from STDIN
--output -o <file> output jQuery Terminal formatting file
--help display this help screen

If no output specified it will print to STDOUT`);
}

function process_buffer(buff) {
    var text = format(buff);
    if (output) {
        fs.writeFile(output, text);
    } else {
        console.log(text);
    }
}

function format(buff) {
    var text;
    if (options.ansi || options.a) {
        var meta = ansi.meta(buff);
        let cols = 80;
        if (meta) {
            buff = buff.slice(0, meta.fileSize);
            cols = meta.tInfo[0];
        }
        text = iconv.decode(buff, 'CP437');
        return format_lines(text, cols);
    } else {
        text = buff.toString();
        return format_lines(text);
    }
}

function format_lines(str, len) {
    str = $.terminal.apply_formatters(str, {
        unixFormatting: {
            ansiArt: true
        }
    });
    var lines;
    if (len) {
        var lines = $.terminal.split_equal(str, len);
        // unix formatting don't handle \r\n at the end
        if (lines[lines.length - 1] === '') {
            lines.pop();
        }
        return lines.join('\n');
    } else {
        return str;
    }
}
