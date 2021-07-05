#!/usr/bin/env node

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

const options = lily(process.argv.slice(2));

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
    const bin = path.basename(process.argv[1]);
    console.log(`usage:\n\t${bin} [--help] [-h] [--input] [-i] <file> [--output] [-o] <file>

--input -i <file> input ANSI art file
--output -o <file> output jQuery Terminal formatting file

If no input specified it will read from STDIN
If no output specified it will print to STDOUT`);
} else if (input) {
    fs.readFile(input).then(process_buffer);
} else {
    read_stdin().then(process_buffer);
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
    var meta = ansi.meta(buff);
    let cols = 80;
    if (meta) {
        buff = buff.slice(0, meta.fileSize);
        cols = meta.tInfo[0];
    }
    var text = iconv.decode(buff, 'CP437');
    return format_lines(text, cols).join('\n');
}

function format_lines(str, len) {
    str = $.terminal.apply_formatters(str, {
        unixFormatting: {
            ansiArt: true
        }
    });
    var lines = $.terminal.split_equal(str, len || 80);
    // unix formatting don't handle \r\n at the end
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }
    return lines;
}


