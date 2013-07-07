/**@license
 *|       __ _____                     ________                              __
 *|      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 *|  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 *| /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 *| \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 *|           \/              /____/                              version {{VER}}
 * http://terminal.jcubic.pl
 *
 * Licensed under GNU LGPL Version 3 license
 * Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>
 *
 * Includes:
 *
 * Storage plugin Distributed under the MIT License
 * Copyright (c) 2010 Dave Schindler
 *
 * jQuery Timers licenced with the WTFPL
 * <http://jquery.offput.ca/every/>
 *
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 *
 * Date: {{DATE}}
 */

/*

     TODO:
           add destroy method to terminal (cmd alrady have it)

          distinguish between paused and disabled
          paused should block keydown in terminal it should disable command line
          disable

*/



(function($, undefined) {
    "use strict";

    // map object to object
    $.omap = function(o, fn) {
        var result = {};
        $.each(o, function(k, v) {
            result[k] = fn.call(o, k, v);
        });
        return result;
    };
    // debug function
    function get_stack(caller) {
        if (caller) {
            return [caller.toString().match(/.*\n.*\n/)].
                concat(get_stack(caller.caller));
        } else {
            return [];
        }
    }
    // ----------------------------------------
    // START Storage plugin
    // ----------------------------------------
    // Private data
    var isLS = typeof window.localStorage !== 'undefined';
    // Private functions
    function wls(n, v) {
        var c;
        if (typeof n === 'string' && typeof v === 'string') {
            localStorage[n] = v;
            return true;
        } else if (typeof n === 'object' && typeof v === 'undefined') {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    localStorage[c] = n[c];
                }
            }
            return true;
        }
        return false;
    }
    function wc(n, v) {
        var dt, e, c;
        dt = new Date();
        dt.setTime(dt.getTime() + 31536000000);
        e = '; expires=' + dt.toGMTString();
        if (typeof n === 'string' && typeof v === 'string') {
            document.cookie = n + '=' + v + e + '; path=/';
            return true;
        } else if (typeof n === 'object' && typeof v === 'undefined') {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    document.cookie = c + '=' + n[c] + e + '; path=/';
                }
            }
            return true;
        }
        return false;
    }
    function rls(n) {
        return localStorage[n];
    }
    function rc(n) {
        var nn, ca, i, c;
        nn = n + '=';
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nn) === 0) {
                return c.substring(nn.length, c.length);
            }
        }
        return null;
    }
    function dls(n) {
        return delete localStorage[n];
    }
    function dc(n) {
        return wc(n, '', -1);
    }
    /**
    * Public API
    * $.Storage.set("name", "value")
    * $.Storage.set({"name1":"value1", "name2":"value2", etc})
    * $.Storage.get("name")
    * $.Storage.remove("name")
    */
    $.extend({
        Storage: {
            set: isLS ? wls : wc,
            get: isLS ? rls : rc,
            remove: isLS ? dls : dc
        }
    });
    // ----------------------------------------
    // END Storage plugin
    // ----------------------------------------
    // START jQuery Timers
    // ----------------------------------------
    jQuery.fn.extend({
        everyTime: function(interval, label, fn, times, belay) {
            return this.each(function() {
                jQuery.timer.add(this, interval, label, fn, times, belay);
            });
        },
        oneTime: function(interval, label, fn) {
            return this.each(function() {
                jQuery.timer.add(this, interval, label, fn, 1);
            });
        },
        stopTime: function(label, fn) {
            return this.each(function() {
                jQuery.timer.remove(this, label, fn);
            });
        }
    });

    jQuery.extend({
        timer: {
            guid: 1,
            global: {},
            regex: /^([0-9]+)\s*(.*s)?$/,
            powers: {
                // Yeah this is major overkill...
                'ms': 1,
                'cs': 10,
                'ds': 100,
                's': 1000,
                'das': 10000,
                'hs': 100000,
                'ks': 1000000
            },
            timeParse: function(value) {
                if (value === undefined || value === null) {
                    return null;
                }
                var result = this.regex.exec(jQuery.trim(value.toString()));
                if (result[2]) {
                    var num = parseInt(result[1], 10);
                    var mult = this.powers[result[2]] || 1;
                    return num * mult;
                } else {
                    return value;
                }
            },
            add: function(element, interval, label, fn, times, belay) {
                var counter = 0;

                if (jQuery.isFunction(label)) {
                    if (!times) {
                        times = fn;
                    }
                    fn = label;
                    label = interval;
                }

                interval = jQuery.timer.timeParse(interval);

                if (typeof interval !== 'number' ||
                    isNaN(interval) ||
                    interval <= 0) {
                    return;
                }
                if (times && times.constructor !== Number) {
                    belay = !!times;
                    times = 0;
                }

                times = times || 0;
                belay = belay || false;

                if (!element.$timers) {
                    element.$timers = {};
                }
                if (!element.$timers[label]) {
                    element.$timers[label] = {};
                }
                fn.$timerID = fn.$timerID || this.guid++;

                var handler = function() {
                    if (belay && handler.inProgress) {
                        return;
                    }
                    handler.inProgress = true;
                    if ((++counter > times && times !== 0) ||
                        fn.call(element, counter) === false) {
                        jQuery.timer.remove(element, label, fn);
                    }
                    handler.inProgress = false;
                };

                handler.$timerID = fn.$timerID;

                if (!element.$timers[label][fn.$timerID]) {
                    element.$timers[label][fn.$timerID] = window.setInterval(handler, interval);
                }

                if (!this.global[label]) {
                    this.global[label] = [];
                }
                this.global[label].push(element);

            },
            remove: function(element, label, fn) {
                var timers = element.$timers, ret;

                if (timers) {

                    if (!label) {
                        for (var lab in timers) {
                            if (timers.hasOwnProperty(lab)) {
                                this.remove(element, lab, fn);
                            }
                        }
                    } else if (timers[label]) {
                        if (fn) {
                            if (fn.$timerID) {
                                window.clearInterval(timers[label][fn.$timerID]);
                                delete timers[label][fn.$timerID];
                            }
                        } else {
                            for (var _fn in timers[label]) {
                                if (timers[label].hasOwnProperty(_fn)) {
                                    window.clearInterval(timers[label][_fn]);
                                    delete timers[label][_fn];
                                }
                            }
                        }

                        for (ret in timers[label]) {
                            if (timers[label].hasOwnProperty(ret)) {
                                break;
                            }
                        }
                        if (!ret) {
                            ret = null;
                            delete timers[label];
                        }
                    }

                    for (ret in timers) {
                        if (timers.hasOwnProperty(ret)) {
                            break;
                        }
                    }
                    if (!ret) {
                        element.$timers = null;
                    }
                }
            }
        }
    });

    if (jQuery.browser && jQuery.browser.msie ||
        /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())) {
        jQuery(window).one('unload', function() {
            var global = jQuery.timer.global;
            for (var label in global) {
                if (global.hasOwnProperty(label)) {
                    var els = global[label], i = els.length;
                    while (--i) {
                        jQuery.timer.remove(els[i], label);
                    }
                }
            }
        });
    }
    // ----------------------------------------
    // START CROSS BROWSER SPLIT
    // ----------------------------------------

    (function(undef) {

        // prevent double include

        if (!String.prototype.split.toString().match(/\[native/)) {
            return;
        }

        var nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
        self;

        self = function (str, separator, limit) {
            // If `separator` is not a regex, use `nativeSplit`
            if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
                return nativeSplit.call(str, separator, limit);
            }
            var output = [],
            flags = (separator.ignoreCase ? "i" : "") +
                (separator.multiline  ? "m" : "") +
                (separator.extended   ? "x" : "") + // Proposed for ES6
                (separator.sticky     ? "y" : ""), // Firefox 3+
                lastLastIndex = 0,
            // Make `global` and avoid `lastIndex` issues by working with a copy
            separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + "g");
            str += ""; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
            }
            /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
            // ? Math.pow(2, 32) - 1 : ToUint32(limit)
            limit = limit === undef ? -1 >>> 0 : limit >>> 0;
            while (match = separator.exec(str)) {
                    // `separator.lastIndex` is not reliable cross-browser
                    lastIndex = match.index + match[0].length;
                    if (lastIndex > lastLastIndex) {
                        output.push(str.slice(lastLastIndex, match.index));
                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
                        // nonparticipating capturing groups
                        if (!compliantExecNpcg && match.length > 1) {
                            match[0].replace(separator2, function () {
                                for (var i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === undef) {
                                        match[i] = undef;
                                    }
                                }
                            });
                        }
                        if (match.length > 1 && match.index < str.length) {
                            Array.prototype.push.apply(output, match.slice(1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = lastIndex;
                        if (output.length >= limit) {
                            break;
                        }
                    }
                    if (separator.lastIndex === match.index) {
                        separator.lastIndex++; // Avoid an infinite loop
                    }
                }
            if (lastLastIndex === str.length) {
                if (lastLength || !separator.test("")) {
                    output.push("");
                }
            } else {
                output.push(str.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };

        // For convenience
        String.prototype.split = function (separator, limit) {
            return self(this, separator, limit);
        };

        return self;

    })();

    // -----------------------------------------------------------------------
    /*
    function decodeHTML(str) {
        if (typeof str === 'string') {
            str = str.replace(/&amp;/g, '&');
            str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            str = str.replace(/&#09;/g, '\t');
            str = str.replace(/<br\/?>/g, '\n').replace(/&nbsp;/g, ' ');
            return str;
        } else {
            return '';
        }
    }
    */
    //split string to array of strings with the same length
    function str_parts(str, length) {
        var result = [];
        var len = str.length;
        if (len < length) {
            return [str];
        }
        for (var i = 0; i < len; i += length) {
            result.push(str.substring(i, i + length));
        }
        return result;
    }

    // -----------------------------------------------------------------------
    // CYCLE DATA STRUCTURE
    // -----------------------------------------------------------------------
    function Cycle(init) {
        var data = init ? [init] : [];
        var pos = 0;
        $.extend(this, {
            get: function() {
                return data;
            },
            rotate: function() {
                if (data.length === 1) {
                    return data[0];
                } else {
                    if (pos === data.length - 1) {
                        pos = 0;
                    } else {
                        ++pos;
                    }
                    return data[pos];
                }
            },
            length: function() {
                return data.length;
            },
            set: function(item) {
                for (var i = data.length; i--;) {
                    if (data[i] === item) {
                        pos = i;
                        return;
                    }
                }
                this.append(item);
            },
            front: function() {
                return data[pos];
            },
            append: function(item) {
                data.push(item);
            }
        });
    }
    // -----------------------------------------------------------------------
    // :: STACK DATA STRUCTURE
    // -----------------------------------------------------------------------
    function Stack(init) {
        var data = init ? [init] : [];
        $.extend(this, {
            size: function() {
                return data.length;
            },
            pop: function() {
                if (data.length === 0) {
                    return null;
                } else {
                    var value = data[data.length - 1];
                    data = data.slice(0, data.length - 1);
                    return value;
                }
            },
            push: function(value) {
                data = data.concat([value]);
                return value;
            },
            top: function() {
                return data.length > 0 ? data[data.length - 1] : null;
            }
        });
    }
    // serialize object myself (biwascheme or prototype library do something
    // wiked with JSON serialization for Arrays)
    $.json_stringify = function(object, level) {
        var result = '', i;
        level = level === undefined ? 1 : level;
        var type = typeof object;
        switch (type) {
        case 'function':
            result += object;
            break;
        case 'boolean':
            result += object ? 'true' : 'false';
            break;
        case 'object':
            if (object === null) {
                result += 'null';
            } else if (object instanceof Array) {
                result += '[';
                var len = object.length;
                for (i = 0; i < len - 1; ++i) {
                    result += $.json_stringify(object[i], level + 1);
                }
                result += $.json_stringify(object[len - 1], level + 1) + ']';
            } else {
                result += '{';
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        result += '"' + property + '":' +
                            $.json_stringify(object[property], level + 1);
                    }
                }
                result += '}';
            }
            break;
        case 'string':
            var str = object;
            var repl = {
                '\\\\': '\\\\',
                '"': '\\"',
                '/': '\\/',
                '\\n': '\\n',
                '\\r': '\\r',
                '\\t': '\\t'};
            for (i in repl) {
                if (repl.hasOwnProperty(i)) {
                    str = str.replace(new RegExp(i, 'g'), repl[i]);
                }
            }
            result += '"' + str + '"';
            break;
        case 'number':
            result += String(object);
            break;
        }
        result += (level > 1 ? ',' : '');
        // quick hacks below
        if (level === 1) {
            // fix last comma
            result = result.replace(/,([\]}])/g, '$1');
        }
        // fix comma before array or object
        return result.replace(/([\[{]),/g, '$1');
    };
    // -----------------------------------------------------------------------
    // :: HISTORY CLASS
    // -----------------------------------------------------------------------
    function History(name, size) {
        var enabled = true;
        if (typeof name === 'string' && name !== '') {
            name += '_';
        }
        var data = $.Storage.get(name + 'commands');
        data = data ? new Function('return ' + data + ';')() : [];
        var pos = data.length-1;

        $.extend(this, {
            append: function(item) {
                if (enabled) {
                    if (data[data.length-1] !== item) {
                        data.push(item);
                        pos = data.length-1;
                        if (size && data.length > size) {
                            data = data.slice(-size);
                        }
                        $.Storage.set(name + 'commands', $.json_stringify(data));
                    }
                }
            },
            data: function() {
                return data;
            },
            next: function() {
                if (pos < data.length-1) {
                    ++pos;
                }
                if (pos !== -1) {
                    return data[pos];
                }
            },
            reset: function() {
                pos = data.length-1;
            },
            last: function() {
                return data[length-1];
            },
            end: function() {
                return pos === data.length-1;
            },
            position: function() {
                return pos;
            },
            previous: function() {
                var old = pos;
                if (pos > 0) {
                    --pos;
                }
                if (old !== -1) {
                    return data[old];
                }
            },
            clear: function() {
                data = [];
                $.Storage.remove(name + 'commands');
            },
            enable: function() {
                enabled = true;
            },
            disable: function() {
                enabled = false;
            }
        });
    }
    // -----------------------------------------------------------------------
    // :: COMMAND LINE PLUGIN
    // -----------------------------------------------------------------------
    $.fn.cmd = function(options) {
        var self = this;
        self.addClass('cmd');
        self.append('<span class="prompt"></span><span></span>' +
                    '<span class="cursor">&nbsp;</span><span></span>');
        var clip = $('<textarea/>').addClass('clipboard').appendTo(self);
        if (options.width) {
            self.width(options.width);
        }
        var num_chars; // calculates by draw_prompt
        var prompt_len;
        var reverse_search = false;
        var reverse_search_string = '';
        var reverse_search_position = null;
        var backup_prompt;
        var mask = options.mask || false;
        var command = '';
        var position = 0;
        var prompt;
        var enabled = options.enabled;
        var historySize = options.historySize || 60;
        var name, history;
        var cursor = self.find('.cursor');

        function blink(i) {
            cursor.toggleClass('inverted');
        }
        function draw_reverse_prompt() {
            prompt = "(reverse-i-search)`" + reverse_search_string + "': ";
            draw_prompt();
        }
        function clear_reverse_state() {
            prompt = backup_prompt;
            reverse_search = false;
            reverse_search_position = null;
            reverse_search_string = '';
        }
        // if next is not defined or false it search for first item from the end
        // if true it search for next item
        function reverse_history_search(next) {
            var history_data = history.data();
            var regex;
            var len = history_data.length;
            if (next && reverse_search_position > 0) {
                len -= reverse_search_position;
            }
            if (reverse_search_string.length > 0) {
                for (var j=reverse_search_string.length; j>0; j--) {
                    regex = new RegExp('^' + reverse_search_string.substring(0, j));
                    for (var i=len; i--;) {
                        if (regex.test(history_data[i])) {
                            reverse_search_position = history_data.length - i;
                            position = 0;
                            self.set(history_data[i], true);
                            redraw();
                            if (reverse_search_string.length !== j) {
                                reverse_search_string = reverse_search_string.substring(0, j);
                                draw_reverse_prompt();
                            }
                            return;
                        }
                    }
                }
            }
        }

        function change_num_chars() {
            var W = self.width();
            var w = cursor.innerWidth();
            num_chars = Math.floor(W / w);
        }
        function str_repeat(str, n) {
            var result = '';
            for (var i = n; i--;) {
                result += str;
            }
            return result;
        }
        function get_splited_command_line(string) {
            var first = string.substring(0, num_chars - prompt_len);
            var rest = string.substring(num_chars - prompt_len);
            return [first].concat(str_parts(rest, num_chars));
        }
        var redraw = (function(self) {
            var before = cursor.prev();
            var after = cursor.next();
            function draw_cursor_line(string, position) {
                var len = string.length;
                if (position === len) {
                    before.html($.terminal.encode(string));
                    cursor.html('&nbsp;');
                    after.html('');
                } else if (position === 0) {
                    before.html('');
                    //fix for tilda in IE
                    cursor.html($.terminal.encode(string.slice(0, 1)));
                    //cursor.html($.terminal.encode(string[0]));
                    after.html($.terminal.encode(string.slice(1)));
                } else {
                    var before_str = $.terminal.encode(string.slice(0, position));
                    before.html(before_str);
                    //fix for tilda in IE
                    var c = string.slice(position, position + 1);
                    //cursor.html(string[position]));
                    cursor.html(c === ' ' ? '&nbsp;' : $.terminal.encode(c));
                    if (position === string.length - 1) {
                        after.html('');
                    } else {
                        after.html($.terminal.encode(string.slice(position + 1)));
                    }
                }
            }
            function div(string) {
                return '<div>' + $.terminal.encode(string) + '</div>';
            }
            function lines_after(lines) {
                var last_ins = after;
                $.each(lines, function(i, line) {
                    last_ins = $(div(line)).insertAfter(last_ins).
                        addClass('clear');
                });
            }
            function lines_before(lines) {
                $.each(lines, function(i, line) {
                    before.before(div(line));
                });
            }
            var count = 0;
            return function() {
                var string = mask ? command.replace(/./g, '*') : command;
                var i, first_len;
                self.find('div').remove();
                before.html('');
                // long line
                if (string.length > num_chars - prompt_len - 1 ||
                    string.match(/\n/)) {
                    var array;
                    var tabs = string.match(/\t/g);
                    var tabs_rm = tabs ? tabs.length * 3 : 0;
                    //quick tabulation hack
                    if (tabs) {
                        string = string.replace(/\t/g, '\x00\x00\x00\x00');
                    }
                    // command contain new line characters
                    if (string.match(/\n/)) {
                        var tmp = string.split("\n");
                        first_len = num_chars - prompt_len - 1;
                        // empty character after each line
                        for (i=0; i<tmp.length-1; ++i) {
                            tmp[i] += ' ';
                        }
                        // split first line
                        if (tmp[0].length > first_len) {
                            array = [tmp[0].substring(0, first_len)];
                            array = array.concat(str_parts(tmp[0].substring(first_len), num_chars));
                        } else {
                            array = [tmp[0]];
                        }
                        // process rest of the lines
                        for (i=1; i<tmp.length; ++i) {
                            if (tmp[i].length > num_chars) {
                                array = array.concat(str_parts(tmp[i], num_chars));
                            } else {
                                array.push(tmp[i]);
                            }
                        }
                    } else {
                        array = get_splited_command_line(string);
                    }
                    if (tabs) {
                        array = $.map(array, function(line) {
                            return line.replace(/\x00\x00\x00\x00/g, '\t');
                        });
                    }
                    first_len = array[0].length;
                    //cursor in first line
                    if (first_len === 0 && array.length === 1) {
                        // skip empty line
                    } else if (position < first_len) {
                        draw_cursor_line(array[0], position);
                        lines_after(array.slice(1));
                    } else if (position === first_len) {
                        before.before(div(array[0]));
                        draw_cursor_line(array[1], 0);
                        lines_after(array.slice(2));
                    } else {
                        var num_lines = array.length;
                        var offset = 0;
                        if (position < first_len) {
                            draw_cursor_line(array[0], position);
                            lines_after(array.slice(1));
                        } else if (position === first_len) {
                            before.before(div(array[0]));
                            draw_cursor_line(array[1], 0);
                            lines_after(array.slice(2));
                        } else {
                            var last = array.slice(-1)[0];
                            var from_last = string.length - position;
                            var last_len = last.length;
                            var pos = 0;
                            if (from_last <= last_len) {
                                lines_before(array.slice(0, -1));
                                pos = last_len === from_last ? 0 : last_len-from_last;
                                draw_cursor_line(last, pos+tabs_rm);
                            } else {
                                // in the middle
                                if (num_lines === 3) {
                                    before.before('<div>' + $.terminal.encode(array[0]) +
                                                  '</div>');
                                    draw_cursor_line(array[1], position-first_len-1);
                                    after.after('<div class="clear">' +
                                                $.terminal.encode(array[2]) +
                                                '</div>');
                                } else {
                                    // more lines, cursor in the middle
                                    var line_index;
                                    var current;
                                    pos = position;
                                    for (i=0; i<array.length; ++i) {
                                        var current_len = array[i].length;
                                        if (pos > current_len) {
                                            pos -= current_len;
                                        } else {
                                            break;
                                        }
                                    }
                                    current = array[i];
                                    line_index = i;
                                    // cursor on first character in line
                                    if (pos === current.length) {
                                        pos = 0;
                                        current = array[++line_index];
                                    }
                                    draw_cursor_line(current, pos);
                                    lines_before(array.slice(0, line_index));
                                    lines_after(array.slice(line_index+1));
                                }
                            }
                        }
                    }
                } else {
                     if (string === '') {
                         before.html('');
                         cursor.html('&nbsp;');
                         after.html('');
                     } else {
                         draw_cursor_line(string, position);
                     }
                }
            };
        })(self);
        var last_command;
        var draw_prompt = (function() {
            var prompt_node = self.find('.prompt');
            return function() {
                if (typeof prompt === 'string') {
                    prompt_len = skipFormattingCount(prompt);
                    prompt_node.html($.terminal.format(prompt));
                } else {
                    prompt(function(string) {
                        prompt_len = skipFormattingCount(string);
                        prompt_node.html($.terminal.format(string));
                    });
                }
                //change_num_chars();
            };
        })();
        // paste content to terminal using hidden textarea
        function paste() {
            clip.focus();
            //wait until Browser insert text to textarea
            self.oneTime(1, function() {
                self.insert(clip.val());
                clip.blur().val('');
            });
        }
        //var prevent_keypress = false;
        function keydown_event(e) {
            if (typeof options.keydown == 'function') {
                var result = options.keydown(e);
                if (result !== undefined) {
                    //prevent_keypress = true;
                    return result;
                }
            }
            if (enabled) {
                var pos, len, result;
                // arrows / Home / End / ENTER
                if (reverse_search && (e.which === 35 || e.which === 36 ||
                                       e.which === 37 || e.which === 38 ||
                                       e.which === 39 || e.which === 40 ||
                                       e.which === 13 || e.which === 27)) {
                    clear_reverse_state();
                    draw_prompt();
                    if (e.which === 27) { // ESC
                        command = '';
                    }
                    redraw();
                    // finish reverse search and execute normal event handler
                    keydown_event.call(this, e);
                } else if (e.altKey) {
                    // Chrome on Windows set ctrlKey and altKey for alt
                    // need to check for alt first
                    //if (e.which === 18) { // press ALT
                    if (e.which === 68) { //ALT+D
                        var regex  = /[^ ]+ |[^ ]+$/;
                        self.set(command.slice(0, position) +
                                 command.slice(position).replace(regex, ''),
                                 true);
                        // chrome jump to address bar
                        return false;
                    }
                    return true;
                } else if (e.keyCode === 13) { //enter
                    if ((history && command) &&
                        ((options.historyFilter &&
                         options.historyFilter(command)) ||
                         !options.historyFilter)) {
                        history.append(command);
                    }
                    var tmp = command;
                    history.reset();
                    self.set('');
                    if (options.commands) {
                        options.commands(tmp);
                    }
                    if (typeof prompt === 'function') {
                        draw_prompt();
                    }
                } else if (e.which === 32) { //space
                    if (reverse_search) {
                        reverse_search_string += ' ';
                        draw_reverse_prompt();
                    } else {
                        self.insert(' ');
                    }
                } else if (e.which === 8) { //backspace
                    if (reverse_search) {
                        reverse_search_string = reverse_search_string.slice(0, -1);
                        draw_reverse_prompt();
                    } else {
                        if (command !== '' && position > 0) {
                            command = command.slice(0, position - 1) +
                                command.slice(position, command.length);
                            --position;
                            redraw();
                        }
                    }
                } else if (e.which === 9 && !(e.ctrlKey || e.altKey)) { // TAB
                    self.insert('\t');
                } else if (e.which === 46) {
                    //DELETE
                    if (command !== '' && position < command.length) {
                        command = command.slice(0, position) +
                            command.slice(position + 1, command.length);
                        redraw();
                    }
                    return true;
                } else if (history && e.which === 38 ||
                           (e.which === 80 && e.ctrlKey)) {
                    //UP ARROW or CTRL+P
                    if (history.end()) {
                        last_command = command;
                    }
                    self.set(history.previous());
                } else if (history && e.which === 40 ||
                           (e.which === 78 && e.ctrlKey)) {
                    //DOWN ARROW or CTRL+N
                    self.set(history.end() ? last_command : history.next());
                } else if (e.which === 37 ||
                           (e.which === 66 && e.ctrlKey)) {
                    //CTRL+LEFT ARROW or CTRL+B
                    if (e.ctrlKey && e.which !== 66) {
                        len = position - 1;
                        pos = 0;
                        if (command[len] === ' ') {
                            --len;
                        }
                        for (var i = len; i > 0; --i) {
                            if (command[i] === ' ' && command[i+1] !== ' ') {
                                pos = i + 1;
                                break;
                            } else if (command[i] === '\n' && command[i+1] !== '\n') {
                                pos = i;
                                break;
                            }
                        }
                        self.position(pos);
                    } else {
                        //LEFT ARROW or CTRL+B
                        if (position > 0) {
                            --position;
                            redraw();
                        }
                    }
                } else if (e.which === 82 && e.ctrlKey) { // CTRL+R
                    if (reverse_search) {
                        reverse_history_search(true);
                    } else {
                        backup_prompt = prompt;
                        draw_reverse_prompt();
                        last_command = command;
                        command = '';
                        redraw();
                        reverse_search = true;
                    }
                } else if (e.which == 71 && e.ctrlKey) { // CTRL+G
                    if (reverse_search) {
                        prompt = backup_prompt;
                        draw_prompt();
                        command = last_command;
                        redraw();
                        reverse_search = false;
                    }
                } else if (e.which === 39 ||
                           (e.which === 70 && e.ctrlKey)) {
                    //RIGHT ARROW OR CTRL+F
                    if (e.ctrlKey && e.which !== 70) {
                        // jump to beginig or end of the word
                        if (command[position] === ' ') {
                            ++position;
                        }
                        var match = command.slice(position).match(/\S[\n\s]{2,}|[\n\s]+\S?/);
                        if (!match || match[0].match(/^\s+$/)) {
                            position = command.length;
                        } else {
                            if (match[0][0] !== ' ') {
                                position += match.index + 1;
                            } else {
                                position += match.index + match[0].length - 1;
                                if (match[0][match[0].length-1] !== ' ') {
                                    --position;
                                }
                            }
                        }
                        redraw();
                    } else {
                        if (position < command.length) {
                            ++position;
                            redraw();
                        }
                    }
                } else if (e.which === 123) { //F12 - Allow Firebug
                    return true;
                } else if (e.which === 36) { //HOME
                    self.position(0);
                } else if (e.which === 35) {
                    //END
                    self.position(command.length);
                } else if (e.shiftKey && e.which == 45) { // Shift+Insert
                    paste();
                    return true;
                } else if (e.ctrlKey || e.metaKey) {
                    if (e.which === 192) { // CMD+` switch browser window on Mac
                        return true;
                    }
                    if (e.metaKey) {
                        if(e.which === 82) // CMD+r page reload in Chrome Mac
                            return true;
                        if(e.which === 76)
                            return true; // CMD+l jump into Ominbox on Chrome Mac
                    }
                    if (e.shiftKey) { // CTRL+SHIFT+??
                        if (e.which === 84) {
                            //CTRL+SHIFT+T open closed tab
                            return true;
                        }
                    //} else if (e.altKey) { //ALT+CTRL+??
                    } else {
                        if (e.which === 87) { // CTRL+W
                            if (command !== '') {
                                var first = command.slice(0, position);
                                var last = command.slice(position+1);
                                var m = first.match(/([^ ]+ *$)/);
                                position = first.length-m[0].length;
                                command = first.slice(0, position) + last;
                                redraw();
                            }
                            return false;
                        } else if (e.which === 72) { // CTRL+H
                            if (command !== '' && position > 0) {
                                command = command.slice(0, --position);
                                if (position < command.length-1) {
                                    command += command.slice(position);
                                }
                                redraw();
                            }
                            return false;
                        //NOTE: in opera charCode is undefined
                        } else if (e.which === 65) {
                            //CTRL+A
                            self.position(0);
                        } else if (e.which === 69) {
                            //CTRL+E
                            self.position(command.length);
                        } else if (e.which === 88 || e.which === 67 || e.which === 84) {
                            //CTRL+X CTRL+C CTRL+W CTRL+T
                            return true;
                        } else if (e.which === 86) {
                            //CTRL+V
                            paste();
                            return true;
                        } else if (e.which === 75) {
                            //CTRL+K
                            if (position === 0) {
                                self.set('');
                            } else if (position !== command.length) {
                                self.set(command.slice(0, position));
                            }
                        } else if (e.which === 85) { // CTRL+U
                            self.set(command.slice(position, command.length));
                            self.position(0);
                        } else if (e.which === 17) { //CTRL+TAB switch tab
                            return false;
                        }
                    }
                } else {
                    return true;
                }
                return false;
            } /*else {
                if ((e.altKey && e.which === 68) ||
                    (e.ctrlKey &&
                     $.inArray(e.which, [65, 66, 68, 69, 80, 78, 70]) > -1) ||
                    // 68 === D
                    [35, 36, 37, 38, 39, 40].has(e.which)) {
                    return false;
                }
            } */
        }
        $.extend(self, {
            name: function(string) {
                if (string !== undefined) {
                    name = string;
                    history = new History(string, historySize);
                } else {
                    return name;
                }
            },
            history: function() {
                return history;
            },
            set: function(string, stay) {
                if (string !== undefined) {
                    command = string;
                    if (!stay) {
                        position = command.length;
                    }
                    redraw();
                    if (typeof options.onCommandChange === 'function') {
                        options.onCommandChange(command);
                    }
                }
            },
            insert: function(string, stay) {
                if (position === command.length) {
                    command += string;
                } else if (position === 0) {
                    command = string + command;
                } else {
                    command = command.slice(0, position) +
                        string + command.slice(position);
                }
                if (!stay) {
                    position += string.length;
                }
                redraw();
                if (typeof options.onCommandChange === 'function') {
                    options.onCommandChange(command);
                }
            },
            get: function() {
                return command;
            },
            commands: function(commands) {
                if (commands) {
                    options.commands = commands;
                } else {
                    return commands;
                }
            },
            destroy: function() {
                $(document.documentElement).unbind('.commandline');
                self.find('.prompt').remove();
            },
            prompt: function(user_prompt) {
                if (user_prompt === undefined) {
                    return prompt;
                } else {
                    if (typeof user_prompt === 'string' ||
                        typeof user_prompt === 'function') {
                        prompt = user_prompt;
                    } else {
                        throw 'prompt must be a function or string';
                    }
                    draw_prompt();
                    // we could check if command is longer then numchars-new prompt
                    redraw();
                }
            },
            position: function(n) {
                if (typeof n === 'number') {
                    position = n < 0 ? 0 : n > command.length ? command.length : n;
                    redraw();
                } else {
                    return position;
                }
            },
            visible: (function() {
                var visible = self.visible;
                return function() {
                    visible.apply(self, []);
                    redraw();
                    draw_prompt();
                };
            })(),
            show: (function() {
                var show = self.show;
                return function() {
                    show.apply(self, []);
                    redraw();
                    draw_prompt();
                };
            })(),
            resize: function(num) {
                if (num) {
                    num_chars = num;
                } else {
                    change_num_chars();
                }
                redraw();
            },
            enable: function() {
                if (!enabled) {
                    cursor.addClass('inverted');
                    self.everyTime(500, 'blink', blink);
                    enabled = true;
                }
            },
            isenabled: function() {
                return enabled;
            },
            disable: function() {
                if (enabled) {
                    self.stopTime('blink', blink);
                    cursor.removeClass('inverted');
                    enabled = false;
                }
            },
            mask: function(display) {
                if (typeof display === 'boolean') {
                    mask = display;
                    redraw();
                } else {
                    return mask;
                }
            }
        });
        // INIT
        self.name(options.name || '');
        prompt = options.prompt || '> ';
        draw_prompt();
        if (options.enabled === undefined || options.enabled === true) {
            self.enable();
        }
        // Keystrokes
        var object;
        $(document.documentElement || window).keypress(function(e) {
            /*
            if (prevent_keypress) {
                prevent_keypress = false;
                return false;
            }
            */
            var result;
            if (e.ctrlKey && e.which === 99) { // CTRL+C
                return true;
            }
            if (!reverse_search && typeof options.keypress === 'function') {
                result = options.keypress(e);
            }
            if (result === undefined || result) {
                if (enabled) {
                    if ($.inArray(e.which, [38, 32, 13, 0, 8]) > -1 &&
                        e.keyCode !== 123 && // for F12 which === 0
                        //!(e.which === 40 && e.shiftKey ||
                        !(e.which === 38 && e.shiftKey)) {
                        return false;
                    } else if (!e.ctrlKey && !(e.altKey && e.which === 100)) { // ALT+D
                        // TODO: this should be in one statement
                        if (reverse_search) {
                            reverse_search_string += String.fromCharCode(e.which);
                            reverse_history_search();
                            draw_reverse_prompt();
                        } else {
                            self.insert(String.fromCharCode(e.which));
                        }
                        return false;
                    } else if (e.altKey) {
                        if (reverse_search) {
                            reverse_search_string += String.fromCharCode(e.which);
                            reverse_history_search();
                            draw_reverse_prompt();
                        } else {
                            self.insert(String.fromCharCode(e.which));
                        }
                    }
                }
            } else {
                return result;
            }
        }).keydown(keydown_event);
        // characters
        return self;
    };

    // -------------------------------------------------------------------------
    // :: TOOLS
    // -------------------------------------------------------------------------
    function skipFormattingCount(string) {
        return $('<div>' + $.terminal.strip(string) + '</div>').text().length;
    }
    // -------------------------------------------------------------------------
    function formattingCount(string) {
        return string.length - skipFormattingCount(string);
    }
    // -------------------------------------------------------------------------
    var format_split_re = /(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/;
    var format_re = /\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
    var format_re = /\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
    var color_hex_re = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/;
    var url_re = /https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g;
    var email_regex = /((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
    $.terminal = {
        // split text into lines with equal length and make each line be renderd
        // separatly (text formating can be longer then a line).
        split_equal: function(str, length) {
            var re_format = /\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
            var re_begin = /(\[\[[gbius]*;[^;]*;[^\]]*\])/;
            var re_last = /\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/;
            var formatting = false;
            var in_text = false;
            var braket = 0;
            var prev_format = '';
            var result = [];
            var array = str.replace(re_format, function(_, format, text) {
                var semicolons = format.match(/;/g).length;
                // missing semicolons
                if (semicolons == 2) {
                    semicolons = ';;';
                } else if (semicolons == 3) {
                    semicolons = ';';
                } else {
                    semicolons = '';
                }
                //return '[[' + format + ']' + text + ']';
                // closing braket will break formatting
                return '[[' + format + semicolons +
                    text.replace(/\\\]/g, '&#93;').replace(/\n/g, '\\n') + ']' +
                    text + ']';
            }).split(/\n/g);
            for (var i = 0, len = array.length; i < len; ++i) {
                if (array[i] === '') {
                    result.push('');
                    continue;
                }
                /*
                if (prev_format !== '') {
                    if (array[i] === '') {
                        result.push(prev_format + ']');
                        continue;
                    } else {
                        array[i] = prev_format + array[i];
                        prev_format = '';
                    }
                }*/
                var line = array[i];
                var first_index = 0;
                var count = 0;
                for (var j=0, jlen=line.length; j<jlen; ++j) {
                    if (line[j] === '[' && line[j+1] === '[') {
                        formatting = true;
                    } else if (formatting && line[j] === ']') {
                        if (in_text) {
                            formatting = false;
                            in_text = false;
                        } else {
                            in_text = true;
                        }
                    } else if ((formatting && in_text) || !formatting) {
                        if (line[j] === '&') { // treat entity as one character
                            var m = line.substring(j).match(/^(&[^;]+;)/);
                            if (!m) {
                                throw "Unclosed html entity at char " + j;
                            }
                            j+=m[1].length-2; // because contine add 1 to j
                            // if entity is at the end there is no next loop - issue #77
                            if (j === jlen-1) {
                                result.push(output_line + m[1]);
                            }
                            continue;
                        } else if (line[j] === ']' && line[j-1] === '\\') {
                            // escape \] count as one character
                            --count;
                        } else {
                            ++count;
                        }
                    }
                    if (count === length || j === jlen-1) {
                        var output_line = line.substring(first_index, j+1);
                        if (prev_format) {
                            output_line = prev_format + output_line;
                            if (output_line.match(']')) {
                                prev_format = '';
                            }
                        }
                        first_index = j+1;
                        count = 0;
                        var matched = output_line.match(re_format);
                        if (matched) {
                            var last = matched[matched.length-1];
                            if (last[last.length-1] !== ']') {
                                prev_format = last.match(re_begin)[1];
                                output_line += ']';
                            } else if (output_line.match(re_last)) {
                                var line_len = output_line.length;
                                var f_len = line_len - last[last.length-1].length;
                                output_line = output_line.replace(re_last, '');
                                prev_format = last.match(re_begin)[1];
                            }
                        }
                        result.push(output_line);
                    }
                }
            }
            return result;
        },
        // encode formating as html for inserto into DOM
        encode: function(str) {
            // don't escape entities
            return str.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^=]+=)/, '&amp;')
                      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        // I don't think that it find \n
                      .replace(/\n/g, '<br/>')
                      .replace(/ /g, '&nbsp;')
                      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        },
        format: function(str) {
            if (typeof str === 'string') {
                str = $.terminal.encode(str);
                //support for formating foo[[u;;]bar]baz[[b;#fff;]quux]zzz
                var splited = str.split(format_split_re);
                if (splited && splited.length > 1) {
                    str = $.map(splited, function(text) {
                        if (text === '') {
                            return text;
                        } else if (text.substring(0,1) === '[') {
                            // use substring for IE quirks mode - [0] don't work
                            return text.replace(format_re, function(s,
                                                                    style,
                                                                    color,
                                                                    background,
                                                                    _class,
                                                                    data_text,
                                                                    text) {
                                if (text === '') {
                                    return '<span>&nbsp;</span>';
                                }
                                text = text.replace(/\\]/g, ']');
                                var style_str = '';
                                if (style.indexOf('b') !== -1) {
                                    style_str += 'font-weight:bold;';
                                }
                                var text_decoration = 'text-decoration:';
                                if (style.indexOf('u') !== -1) {
                                    text_decoration += 'underline ';
                                }
                                if (style.indexOf('s') !== -1) {
                                    text_decoration += 'line-through';
                                }
                                if (style.indexOf('s') !== -1 ||
                                    style.indexOf('u') !== -1) {
                                    style_str += text_decoration + ';';
                                }
                                if (style.indexOf('i') !== -1) {
                                    style_str += 'font-style:italic;';
                                }
                                if (color.match(color_hex_re)) {
                                    style_str += 'color:' + color + ';';
                                    if (style.indexOf('g') !== -1) {
                                        style_str += 'text-shadow: 0 0 5px ' + color + ';';
                                    }
                                }
                                if (background.match(color_hex_re)) {
                                    style_str += 'background-color:' + background;
                                }
                                var result = '<span style="' + style_str + '"' + (_class !== '' ? ' class="' + _class + '"' : '') + ' data-text="'+ (data_text==='' ? text : data_text.replace(/&#93;/g, ']')).replace('"', '&quote;') + '">' + text + '</span>';
                                return result;
                            });
                        } else {
                            return '<span>' + text + '</span>';
                        }
                    }).join('');
                }
                return $.map(str.split(/(<\/?span[^>]*>)/g), function(string) {
                    if (!string.match(/span/)) {
                        return string.replace(url_re, function(link) {
                            var comma = link.match(/\.$/);
                            link = link.replace(/\.$/, '');
                            return '<a target="_blank" href="' + link + '">' + link + '</a>' +
                                (comma ? '.' : '');
                        }).replace(email_regex, '<a href="mailto:$1">$1</a>');
                    } else {
                        return string;
                    }
                }).join('').replace(/<span><br\/?><\/span>/g, '<br/>');
            } else {
                return '';
            }
        },
        // remove formatting from text
        strip: function(str) {
            return str.replace(format_re, '$6');
        },
        // return active terminal
        active: function() {
            return terminals.front();
        },
        ansi_colors: {
            normal: {
                black: '#000',
                red: '#AA0000',
                green: '#008400',
                yellow: '#AA5500',
                blue: '#0000AA',
                magenta: '#AA00AA',
                cyan: '#00AAAA',
                white: '#fff'
            },
            bold: {
                white: '#fff',
                red: '#FF5555',
                green: '#44D544',
                yellow: '#FFFF55',
                blue: '#5555FF',
                magenta: '#FF55FF',
                cyan: '#55FFFF',
                black: '#000'
            }
        },
        from_ansi: (function() {
            var color = {
                30:	'black',
                31:	'red',
                32:	'green',
                33:	'yellow',
                34:	'blue',
                35:	'magenta',
                36:	'cyan',
                37:	'white'
            };
            var background = {
                40: 'black',
                41: 'red',
                42: 'green',
                43: 'yellow',
                44: 'blue',
                45: 'magenta',
                46: 'cyan',
                47: 'white'
            };
            function format_ansi(code) {
                var controls = code.split(';');
                var num;
                var styles = [];
                var output_color = '';
                var output_background = '';
                for(var i in controls) {
                    num = parseInt(controls[i], 10);
                    if (num === 1) {
                       styles.push('b');
                    }
                    if (num === 4) {
                       styles.push('u');
                    }
                    if (background[num]) {
                        output_background = background[num];
                    }
                    if (color[num]) {
                        output_color = color[num];
                    }
                }
                var normal = $.terminal.ansi_colors.normal;
                var colors = normal;
                for (var i=styles.length;i--;) {
                    if (styles[i] == 'b') {
                        if (output_color == '') {
                            output_color = 'white';
                        }
                        colors = $.terminal.ansi_colors.bold;
                        break;
                    }
                }
                return '[[' + [styles.join(''),
                               colors[output_color],
                               normal[output_background]
                              ].join(';') + ']';
            }
            return function(input) {
                input = input.replace(/\\\x1B\[|\\x1B\[/g, '[');
                var splitted = input.split(/(\[[0-9;]*m)/g);
                if (splitted.length == 1) {
                    return input;
                }
                var output = [];
                //skip closing at the begining
                if (splitted.length > 3 && splitted.slice(0,3).join('') == '[0m') {
                    splitted = splitted.slice(3);
                }
                var inside = false;
                for (var i=0; i<splitted.length; ++i) {
                    var match = splitted[i].match(/^\[([0-9;]*)m$/);
                    if (match) {
                        if (match[1] == '') {
                            continue;
                        }
                        if (inside) {
                            output.push(']');
                            if (match[1] == '0') {
                                //just closing
                                inside = false;
                            } else {
                                // someone forget to close - process
                                output.push(format_ansi(match[1]));
                            }
                        } else {
                            inside = true;
                            output.push(format_ansi(match[1]));
                        }
                    } else {
                        output.push(splitted[i]);
                    }
                }
                if (inside) {
                    output.push(']');
                }
                return output.join('');
            };
        })()
    };

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------
    $.fn.visible = function() {
        return this.css('visibility', 'visible');
    };
    $.fn.hidden = function() {
        return this.css('visibility', 'hidden');
    };
    // -----------------------------------------------------------------------
    // JSON-RPC CALL
    // -----------------------------------------------------------------------
    $.jrpc = function(url, id, method, params, success, error) {
        var request = $.json_stringify({
           'jsonrpc': '2.0', 'method': method,
            'params': params, 'id': id});
        return $.ajax({
            url: url,
            data: request,
            success: success,
            error: error,
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            cache: false,
            //timeout: 1,
            type: 'POST'});
    };

    // -----------------------------------------------------------------------
    // :: TERMINAL PLUGIN CODE
    // -----------------------------------------------------------------------
    var version = '{{VER}}';
    var copyright = 'Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>';
    var version_string = 'version ' + version;
    //regex is for placing version string aligned to the right
    var reg = new RegExp(" {" + version_string.length + "}$");
    var signatures = [
        ['jQuery Terminal', '(c) 2011-2013 jcubic'],
        ['jQuery Terminal Emulator v. ' + version,
         copyright.replace(/ *<.*>/, '')],
        ['jQuery Terminal Emulator version ' + version_string,
         copyright],
        ['      _______                 ________                        __',
         '     / / _  /_ ____________ _/__  ___/______________  _____  / /',
         ' __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /',
         '/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__',
         '\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/',
         '         \\/          /____/                                   '.replace(reg, '') +
         version_string,
         copyright],
        ['      __ _____                     ________                              __',
         '     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /',
         ' __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /',
         '/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__',
         '\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/',
         '          \\/              /____/                                          '.replace(reg, '') +
         version_string,
         copyright]
    ];
    // for canceling on CTRL+D
    var requests = [];
    var terminals = new Cycle(); //list of terminals global in this scope
    $.fn.terminal = function(init_eval, options) {
        function haveScrollbars() {
            return self.get(0).scrollHeight > self.innerHeight();
        }
        //calculate numbers of characters
        function get_num_chars() {
            var cursor = self.find('.cursor');
            var cur_width = cursor.width();
            var result = Math.floor(self.width() / cur_width);
            if (haveScrollbars()) {
                // assume that scrollbars are 20px - in my Laptop with
                // Linux/Chrome they are 16px
                var margins = self.innerWidth() - self.width();
                result -= Math.ceil((20 - margins / 2) / (cur_width-1));
            }

            return result;
        }
        function escape_brackets(string) {
            return string.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;');
        }
        // display Exception on terminal
        function display_exception(e, label) {
            if (settings.displayExceptions) {
                var message;
                if (typeof e === 'string') {
                    message = e;
                } else {
                    if (typeof e.fileName === 'string') {
                        message = e.fileName + ': ' + e.message;
                    } else {
                        message = e.message;
                    }
                }
                self.error('&#91;' + label + '&#93;: ' + message);
                if (typeof e.fileName === 'string') {
                    //display filename and line which throw exeption
                    self.pause();
                    $.get(e.fileName, function(file) {
                        self.resume();
                        var num = e.lineNumber - 1;
                        var line = file.split('\n')[num];
                        if (line) {
                            self.error('&#91;' + e.lineNumber + '&#93;: ' + line);
                        }
                    });
                }
                if (e.stack) {
                    self.error(e.stack);
                }
            }
        }
        var scroll_object;
        function scroll_to_bottom() {
            var scrollHeight = scroll_object.prop ? scroll_object.prop('scrollHeight') :
                scroll_object.attr('scrollHeight');
            scroll_object.scrollTop(scrollHeight);
        }
        //validating if object is string or function, call that function and
        //display exeption if any
        function validate(label, object) {
            try {
                if (typeof object === 'function') {
                    object(function() {
                        // don't care
                    });
                } else if (typeof object !== 'string') {
                    var msg = label + ' must be string or function';
                    throw msg;
                }
            } catch (e) {
                display_exception(e, label.toUpperCase());
                return false;
            }
            return true;
        }
        function draw_line(string, options) {
            var settings = $.extend({
                raw: false,
                finalize: $.noop
            }, options || {});
            string = $.type(string) === "function" ? string() : string;
            string = $.type(string) === "string" ? string : String(string);
            var div, i, len;
            if (!settings.raw && (string.length > num_chars || string.match(/\n/))) {
                var array = $.terminal.split_equal($.terminal.from_ansi(string), num_chars);

                div = $('<div></div>');
                for (i = 0, len = array.length; i < len; ++i) {
                    if (array[i] === '' || array[i] === '\r') {
                        div.append('<div>&nbsp;</div>');
                    } else {
                        $('<div/>').html(settings.raw ? array[i] : $.terminal.format(array[i])).appendTo(div);
                    }
                }

            } else {
                if (!settings.raw) {
                    string = $.terminal.format($.terminal.from_ansi(string));
                }
                div = $('<div/>').html('<div>' + string + '</div>');
            }
            output.append(div);
            div.width('100%');
            settings.finalize(div);
            scroll_to_bottom();
            return div;
        }

        function show_greetings() {
            if (settings.greetings === undefined) {
                self.echo(self.signature);
            } else if (settings.greetings) {
                self.echo(settings.greetings);
            }
        }

        function is_scrolled_into_view(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
        }
        //function constructor for eval
        function make_json_rpc_eval_fun(url, terminal) {
            var id = 1;
            var service = function(method, params) {
                terminal.pause();
                $.jrpc(url, id++, method, params, function(json) {
                    if (!json.error) {
                        if (typeof json.result === 'string') {
                            terminal.echo(json.result);
                        } else if (json.result instanceof Array) {
                            terminal.echo($.map(json.result, function(object) {
                                return $.json_stringify(object);
                            }).join(' '));
                        } else if (typeof json.result === 'object') {
                            terminal.echo($.json_stringify(json.result));
                        }
                    } else {
                        terminal.error('&#91;RPC&#93; ' + json.error.message);
                    }
                    terminal.resume();
                }, function(xhr, status, error) {
                    if (status !== 'abort') {
                        terminal.error('&#91;AJAX&#93; ' + status +
                                       ' - Server reponse is: \n' +
                                       xhr.responseText);
                    }
                    terminal.resume();
                });
            };
            //this is eval function
            return function(command, terminal) {
                if (command === '') {
                    return;
                }
                var method, params;
                if (!command.match(/^[^ ]+ /)) {
                    method = command;
                    params = [];
                } else {
                    command = split_command_line(command);
                    method = command[0];
                    params = command.slice(1);
                }
                if (!settings.login || method === 'help') {
                    // allow to call help without token
                    service(method, params);
                } else {
                    var token = terminal.token();
                    if (token) {
                        service(method, [token].concat(params));
                    } else {
                        //should never happen
                        terminal.error('&#91;AUTH&#93; Access denied (no token)');
                    }
                }
            };
        }

        //display prompt and last command
        function echo_command(command) {
            command = escape_brackets($.terminal.encode(command));
            var prompt = command_line.prompt();
            if (command_line.mask()) {
                command = command.replace(/./g, '*');
            }
            if (typeof prompt === 'function') {
                prompt(function(string) {
                    self.echo(string + command);
                });
            } else {
                self.echo(prompt + command);
            }
        }
        var prev_command;
        // wrapper over eval it implements exit and catch all exeptions
        // from user code and display them on terminal
        function commands(command, silent) {
            try {
                prev_command = command;
                var interpreter = interpreters.top();
                if (command === 'exit' && settings.exit) {
                    if (interpreters.size() === 1) {
                        if (settings.login) {
                            logout();
                        } else {
                            var msg = "You can't exit from main interpeter";
                            if (!silent) {
                                echo_command(command);
                            }
                            self.echo(msg);
                        }
                    } else {
                        self.pop('exit');
                    }
                } else {
                    if (!silent) {
                        echo_command(command);
                    }
                    var position = lines.length-1;
                    if (command === 'clear' && settings.clear) {
                        self.clear();
                    } else {
                        var result = interpreter['eval'](command, self);
                        if (result !== undefined) {
                            // was lines after echo_command (by eval)
                            if (position === lines.length-1) {
                                lines.pop();
                                if (result !== false) {
                                    self.echo(result);
                                }
                                self.resize();
                            } else {
                                if (result === false) {
                                    lines = lines.slice(0, position).
                                        concat(lines.slice(position+1));
                                } else {
                                    lines = lines.slice(0, position).
                                        concat([result]).
                                        concat(lines.slice(position+1));
                                }
                                self.resize();
                            }
                        }
                    }
                }

            } catch (e) {
                display_exception(e, 'USER');
                self.resume();
                throw e;
            }
        }

        // functions change prompt of command line to login to password
        // and call user login function with callback that set token
        // if user call it with value that is truthy
        function login() {
            var user = null;
            command_line.prompt('login: ');
            // don't stor logins in history
            if (settings.history) {
                command_line.history().disable();
            }
            command_line.commands(function(command) {
                try {
                    echo_command(command);
                    if (!user) {
                        user = command;
                        command_line.prompt('password: ');
                        command_line.mask(true);
                    } else {
                        command_line.mask(false);
                        self.pause();
                        if (typeof settings.login !== 'function') {
                            throw "Value of login property must be a function";
                        }
                        var passwd = command;
                        settings.login(user, passwd, function(token) {
                            if (token) {
                                var name = settings.name;
                                name = (name ? '_' + name : '');
                                $.Storage.set('token' + name, token);
                                $.Storage.set('login' + name, user);
                                //restore commands and run interpreter
                                command_line.commands(commands);
                                // move this to one function init.
                                initialize();
                            } else {
                                self.error('Wrong password try again');
                                command_line.prompt('login: ');
                                user = null;
                            }
                            self.resume();
                            if (settings.history) {
                                command_line.history().enable();
                            }
                        }, self);
                    }
                } catch (e) {
                    display_exception(e, 'LOGIN', self);
                    throw e;
                }
            });
        }

        //logout function remove Storage, disable history and run login function
        //this function is call only when options.login function is defined
        //check for this is in self.pop method
        function logout() {
            if (typeof settings.onBeforelogout === 'function') {
                try {
                    if (settings.onBeforelogout(self) == false) {
                        return;
                    }
                } catch (e) {
                    display_exception(e, 'onBeforelogout');
                    throw e;
                }
            }
            var name = settings.name;
            name = (name ? '_' + name : '');
            $.Storage.remove('token' + name, null);
            $.Storage.remove('login' + name, null);
            if (settings.history) {
                command_line.history().disable();
            }
            login();
            if (typeof settings.onAfterlogout === 'function') {
                try {
                    settings.onAfterlogout(self);
                } catch (e) {
                    display_exception(e, 'onAfterlogout');
                    throw e;
                }
            }
        }

        //function enable history, set prompt, run eval function
        function prepare_top_interpreter() {
            var interpreter = interpreters.top();
            var name = '';
            if (interpreter.name !== undefined &&
                interpreter.name !== '') {
                name += interpreter.name + '_';
            }
            name += terminal_id;
            command_line.name(name);
            if (typeof interpreter.prompt == 'function') {
                command_line.prompt(function(command) {
                    interpreter.prompt(command, self);
                });
            } else {
                command_line.prompt(interpreter.prompt);
            }
            if (settings.history) {
                command_line.history().enable();
            }
            command_line.set('');
            if (typeof interpreter.onStart === 'function') {
                interpreter.onStart(self);
            }
        }
        function initialize() {
            prepare_top_interpreter();
            show_greetings();
            if (typeof settings.onInit === 'function') {
                try {
                    settings.onInit(self);
                } catch (e) {
                    display_exception(e, 'OnInit');
                    throw e;
                }
            }
        }
        // ---------------------------------------------------------------------
        // KEYDOWN EVENT HANDLER
        // ---------------------------------------------------------------------
        var tab_count = 0;

        function key_down(e) {
            var top = interpreters.top();
            if ($.type(top.keydown) === 'function') {
                var result = top.keydown(e, self);
                if (result !== undefined) {
                    return result;
                }
            }
            var i;
            // after text pasted into textarea in cmd plugin
            self.oneTime(10, function() {
                on_scrollbar_show_resize();
            });
            if ($.type(settings.keydown) === 'function') {
                var result = settings.keydown(e, self);
                if (result !== undefined) {
                    return result;
                }
            }
            if (!self.paused()) {
                if (e.which !== 9) { // not a TAB
                    tab_count = 0;
                }
                if (e.which === 68 && e.ctrlKey) { // CTRL+D
                    if (command_line.get() === '') {
                        if (interpreters.size() > 1 ||
                            settings.login !== undefined) {
                            self.pop('');
                        } else {
                            self.resume();
                            self.echo('');
                        }
                    } else {
                        self.set_command('');
                    }
                    return false;
                } else if (settings.tabcompletion && e.which === 9) { // TAB
                    // TODO: move this to cmd plugin
                    //       add tabcompletion = array | function
                    ++tab_count;
                    var command = command_line.get().substring(0, command_line.position());
                    var strings = command.split(' ');
                    var string;
                    if (strings.length == 1) {
                        string = strings[0];
                    } else {
                        var string = strings[strings.length-1];
                        for (var i=strings.length-1; i>0;i--) {
                            // treat escape space as part of the string
                            if (strings[i-1][strings[i-1].length-1] == '\\') {
                                string = strings[i-1] + ' ' + string;
                            } else {
                                break;
                            }
                        }
                    }
                    var reg = new RegExp('^' + string);
                    interpreters.top().completion(self, string, function(commands) {
                        var matched = [];
                        for (i=commands.length; i--;) {
                            if (reg.test(commands[i])) {
                                matched.push(commands[i]);
                            }
                        }
                        if (matched.length === 1) {
                            self.insert(matched[0].replace(reg, ''));
                        } else if (matched.length > 1) {
                            if (tab_count >= 2) {
                                echo_command(command);
                                self.echo(matched.join('\t'));
                                tab_count = 0;
                            }
                        }
                    });
                    return false;
                } else if (e.which === 86 && e.ctrlKey) { // CTRL+V
                    self.oneTime(1, function() {
                        scroll_to_bottom();
                    });
                    return;
                } else if (e.which === 9 && e.ctrlKey) { // CTRL+TAB
                    if (terminals.length() > 1) {
                        self.focus(false);
                        return false;
                    }
                } else if (e.which === 34) { // PAGE DOWN
                    self.scroll(self.height());
                } else if (e.which === 33) { // PAGE UP
                    self.scroll(-self.height());
                } else {
                    self.attr({scrollTop: self.attr('scrollHeight')});
                }
            } else if (e.which === 68 && e.ctrlKey) { // CTRL+D
                for (i=requests.length; i--;) {
                    var r = requests[i];
                    if (4 !== r.readyState) {
                        try {
                            r.abort();
                        } catch(e) {
                            self.error('error in aborting ajax');
                        }
                    }
                }
                self.resume();
                return false;
            }
        }

        // function split arguments and work with string like
        // 'asd' 'asd\' asd' "asd asd" asd\ 123 -n -b / [^ ]+ / /\s+/ asd\ asd
        // if processArguments is true then it create regex and numbers and
        // replace escape characters
        function split_command_line(string) {
            var re = /('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g;
            return $.map(string.match(re), function(arg) {
                if (arg[0] === "'" && arg[arg.length-1] === "'") {
                    return arg.replace(/^'|'$/g, '');
                } else if (arg[0] === '"' && arg[arg.length-1] === '"') {
                    arg = arg.replace(/^"|"$/g, '').replace(/\\([" ])/g, '$1');
                    if (settings.processArguments) {
                        return arg.replace(/\\\\|\\t|\\n/g, function(string) {
                            if (string[1] === 't') {
                                return '\t';
                            } else if (string[1] === 'n') {
                                return '\n';
                            } else {
                                return '\\';
                            }
                        });
                    } else {
                        return arg;
                    }
                } else {
                    if (settings.processArguments) {
                        if (arg[0] === '/' && arg[arg.length-1] == '/') {
                            return new RegExp(arg.replace(/^\/|\/$/g, ''));
                        } else if (arg.match(/^-?[0-9]+$/)) {
                            return parseInt(arg, 10);
                        } else if (arg.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)) {
                            return parseFloat(arg);
                        } else {
                            return arg.replace(/\\ /g, ' ');
                        }
                    } else {
                        if (arg[0] === '/' && arg[arg.length-1] == '/') {
                            return arg;
                        } else {
                            return arg.replace(/\\ /g, ' ');
                        }
                    }
                }
            });
        }
        function make_eval_from_object(object) {
            // function that maps commands to object methods
            // it keeps terminal context
            return function(command, terminal) {
                if (command === '') {
                    return;
                }
                command = split_command_line(command);
                var method = command[0];
                var params = command.slice(1);
                var val = object[method];
                var type = $.type(val);
                if (type === 'function') {
                    return val.apply(self, params);
                } else if (type === 'object' || type === 'string') {
                    var commands = [];
                    if (type === 'object') {
                        for (var m in val) {
                            if (val.hasOwnProperty(m)) {
                                commands.push(m);
                            }
                        }
                        val = make_eval_from_object(val);
                    }
                    self.push(val, {
                        prompt: method + '> ',
                        name: method,
                        completion: type === 'object' ? function(term, string, callback) {
                            callback(commands);
                        } : undefined
                    });
                } else {
                    self.error("Command '" + method + "' Not Found");
                }
            };
        }
        var self = this;
        if (this.length > 1) {
            return this.each(function() {
                $.fn.terminal.call($(this),
                                   init_eval,
                                   $.extend({name: self.selector}, options));
            });
        } else {
            // array of line objects:
            // - string (printed as-is)
            // - function (called whenever necessary, result is printed)
            // - array (expected form: [line, finalize function])
            // - anything else (cast to string when painted)
            var lines = [];
            var output;
            var terminal_id = terminals.length();
            var num_chars; // numer of chars in line
            var command_list = []; // for tab completion
            var settings = $.extend({
                name: self.selector,
                prompt: '> ',
                history: true,
                exit: true,
                clear: true,
                enabled: true,
                historySize: 60,
                displayExceptions: true,
                cancelableAjax: true,
                processArguments: true,
                login: null,
                tabcompletion: null,
                historyFilter: null,
                onInit: $.noop,
                onClear: $.noop,
                onBlur: $.noop,
                onFocus: $.noop,
                onTerminalChange: $.noop,
                onExit: $.noop,
                keypress: $.noop,
                keydown: $.noop
            }, options || {});

            if (settings.width) {
                self.width(settings.width);
            }
            if (settings.height) {
                self.height(settings.height);
            }
            if (!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/) &&
                self[0].tagName.toLowerCase() == 'body') {
                scroll_object = $('html');
            } else {
                scroll_object = self;
            }
            var pause = !settings.enabled;
            if (self.length === 0) {
                throw 'Sorry, but terminal said that "' + self.selector +
                    '" is not valid selector!';
            }
            // register ajaxSend for cancel requests on CTRL+D
            self.ajaxSend(function(e, xhr, opt) {
                requests.push(xhr);
            });
            // terminal already exist
            if (self.data('terminal')) {
                return self.data('terminal');
            }
            output = $('<div>').addClass('terminal-output').appendTo(self);
            self.addClass('terminal').append('<div/>');
            // keep focus in clipboard textarea in mobile
            if (('ontouchstart' in window) || window.DocumentTouch &&
                document instanceof DocumentTouch) {
                self.click(function() {
                    self.find('textarea').focus();
                });
                self.find('textarea').focus();
            }
            /*
              self.bind('touchstart.touchScroll', function() {

              });
              self.bind('touchmove.touchScroll', function() {

              });
            */
            //$('<input type="text"/>').hide().focus().appendTo(self);

            // ----------------------------------------------------------
            // TERMINAL METHODS
            // ----------------------------------------------------------
            var old_width, old_height;
            var dalyed_commands = [];
            $.extend(self, $.omap({
                clear: function() {
                    output.html('');
                    command_line.set('');
                    lines = [];
                    try {
                        settings.onClear(self);
                    } catch (e) {
                        display_exception(e, 'onClear');
                        throw e;
                    }
                    self.attr({ scrollTop: 0});
                    return self;
                },
                export_view: function() {
                    return {
                        prompt: self.get_prompt(),
                        command: self.get_command(),
                        position: command_line.position(),
                        lines: lines.slice(0)
                    };
                },
                import_view: function(view) {
                    self.set_prompt(view.prompt);
                    self.set_command(view.command);
                    command_line.position(view.position);
                    lines = view.lines;
                    self.resize();
                    return self;
                },
                exec: function(command, silent) {
                    if (pause) {
                        dalyed_commands.push([command, silent]);
                    } else {
                        commands(command, silent);
                    }
                    return self;
                },
                commands: function() {
                    return interpreters.top().eval;
                },
                greetings: function() {
                    show_greetings();
                    return self;
                },
                paused: function() {
                    return pause;
                },
                pause: function() {
                    if (command_line) {
                        pause = true;
                        self.disable();
                        command_line.hidden();
                    }
                    return self;
                },
                resume: function() {
                    if (command_line) {
                        self.enable();
                        var original = dalyed_commands;
                        dalyed_commands = [];
                        while (original.length) {
                            var command = original.shift();
                            self.exec.apply(self, command);
                        }
                        command_line.visible();
                        scroll_to_bottom();
                    }
                    return self;
                },
                cols: function() {
                    return num_chars;
                },
                rows: function() {
                    return Math.floor(self.height() / self.find('.cursor').height());
                },
                history: function() {
                    return command_line.history();
                },
                next: function() {
                    if (terminals.length() === 1) {
                        return self;
                    } else {
                        var offsetTop = self.offset().top;
                        var height = self.height();
                        var scrollTop = self.scrollTop();
                        if (!is_scrolled_into_view(self)) {
                            self.enable();
                            $('html,body').animate({scrollTop: offsetTop-50}, 500);
                            return self;
                        } else {
                            terminals.front().disable();
                            var next = terminals.rotate().enable();
                            // 100 provides buffer in viewport
                            var x = next.offset().top - 50;
                            $('html,body').animate({scrollTop: x}, 500);
                            try {
                                settings.onTerminalChange(next);
                            } catch (e) {
                                display_exception(e, 'onTerminalChange');
                                throw e;
                            }
                            return next;
                        }
                    }
                },
                // silent used so events are not fired on init
                focus: function(toggle, silent) {
                    self.oneTime(1, function() {
                        if (terminals.length() === 1) {
                            if (toggle === false) {
                                try {
                                    if (!silent && settings.onBlur(self) !== false) {
                                        self.disable();
                                    }
                                } catch (e) {
                                    display_exception(e, 'onBlur');
                                    throw e;
                                }
                            } else {
                                try {
                                    if (!silent && settings.onFocus(self) !== false) {
                                        self.enable();
                                    }
                                } catch (e) {
                                    display_exception(e, 'onFocus');
                                    throw e;
                                }
                            }
                        } else {
                            if (toggle === false) {
                                self.next();
                            } else {
                                var front = terminals.front();
                                if (front != self) {
                                    front.disable();
                                    if (!silent) {
                                        try {
                                            settings.onTerminalChange(self);
                                        } catch (e) {
                                            display_exception(e, 'onTerminalChange');
                                            throw e;
                                        }
                                    }
                                }
                                terminals.set(self);
                                self.enable();
                            }

                        }
                    });
                    return self;
                },
                enable: function() {
                    if (num_chars === undefined) {
                        //enabling first time
                        self.resize();
                    }
                    if (pause) {
                        if (command_line) {
                            command_line.enable();
                            pause = false;
                        }
                    }
                    return self;
                },
                disable: function() {
                    if (command_line) {
                        pause = true;
                        command_line.disable();
                    }
                    return self;
                },
                enabled: function() {
                    return pause;
                },
                signature: function() {
                    var cols = self.cols();
                    var i = cols < 15 ? null : cols < 35 ? 0 : cols < 55 ? 1 : cols < 64 ? 2 : cols < 75 ? 3 : 4;
                    if (i !== null) {
                        return signatures[i].join('\n') + '\n';
                    } else {
                        return '';
                    }
                },
                version: function() {
                    return version;
                },
                /* COMMAND LINE FUNCTIONS */
                get_command: function() {
                    return command_line.get();
                },
                insert: function(string) {
                    if (typeof string === 'string') {
                        command_line.insert(string);
                        return self;
                    } else {
                        throw "insert function argument is not a string";
                    }
                },
                set_prompt: function(prompt) {
                    if (validate('prompt', prompt)) {
                        if (typeof prompt == 'function') {
                            command_line.prompt(function(command) {
                                prompt(command, self);
                            });
                        } else {
                            command_line.prompt(prompt);
                        }
                        interpreters.top().prompt = prompt;
                    }
                    return self;
                },
                get_prompt: function() {
                    return interpreters.top().prompt;
                    // command_line.prompt(); - can be a wrapper
                    //return command_line.prompt();
                },
                set_command: function(command) {
                    command_line.set(command);
                    return self;
                },
                set_mask: function(display) {
                    command_line.mask(display);
                    return self;
                },
                get_output: function(raw) {
                    if (raw) {
                        return lines;
                    } else {
                        return $.map(lines, function(i, item) {
                            return typeof item == 'function' ? item() : item;
                        }).join('\n');
                    }
                },
                resize: function(width, height) {
                    if (width && height) {
                        self.width(width);
                        self.height(height);
                    }
                    var width = self.width();
                    var height = self.height();
                    num_chars = get_num_chars();
                    command_line.resize(num_chars);
                    var o = output.detach();
                    output.html('');
                    $.each(lines, function(i, line) {
                        draw_line.apply(null, line);
                    });
                    self.prepend(o);
                    scroll_to_bottom();
                    if ($.type(settings.onResize) === 'function' &&
                        (old_height !== height || old_width !== width)) {
                        settings.onResize(self);
                    }
                    if (old_height !== height || old_width !== width) {
                        old_height = height;
                        old_width = width;
                    }
                    return self;
                },
                // Print data to terminal output. If a second argument is
                // supplied it is called with the container div that holds the
                // output (as a jquery object) every time the output is printed
                // (including resize and scrolling)
                // If the line is a function it will be called for every redraw.
                echo: function(string, options) {
                    var settings = $.extend({
                        raw: false,
                        finalize: $.noop
                    }, options || {});
                    lines.push([string, settings]);
                    draw_line(string, settings);
                    on_scrollbar_show_resize();
                    return self;
                },
                error: function(message, finalize) {
                    //echo red message
                    //quick hack to fix trailing back slash
                    return self.echo('[[;#f00;]' + escape_brackets(message).
                                     replace(/\\$/, '&#92;') + ']', finalize);
                },
                scroll: function(amount) {
                    var pos;
                    amount = Math.round(amount);
                    if (scroll_object.prop) {
                        if (amount > scroll_object.prop('scrollTop') && amount > 0) {
                            scroll_object.prop('scrollTop', 0);
                        }
                        pos = scroll_object.prop('scrollTop');
                        scroll_object.scrollTop(pos + amount);
                        return self;
                    } else {
                        if (amount > scroll_object.attr('scrollTop') && amount > 0) {
                            scroll_object.attr('scrollTop', 0);
                        }
                        pos = scroll_object.attr('scrollTop');
                        scroll_object.scrollTop(pos + amount);
                        return self;
                    }
                },
                logout: settings.login ? function() {
                    while (interpreters.size() > 1) {
                        interpreters.pop();
                    }
                    logout();
                    return self;
                } : function() {
                    throw "You don't have login function";
                },
                token: settings.login ? function() {
                    var name = settings.name;
                    return $.Storage.get('token' + (name ? '_' + name : ''));
                } : $.noop,
                login_name: settings.login ? function() {
                    var name = settings.name;
                    return $.Storage.get('login' + (name ? '_' + name : ''));
                } : $.noop,
                name: function() {
                    return interpreters.top().name;
                },
                push: function(_eval, options) {
                    if (options && (!options.prompt || validate('prompt', options.prompt)) ||
                        !options) {
                        options = options || {};
                        options.name = options.name || prev_command;
                        interpreters.top().mask = command_line.mask();
                        if ($.type(_eval) === 'string') {
                            //_eval = make_json_rpc_eval_fun(options['eval'], self);
                            _eval = make_json_rpc_eval_fun(_eval, self);
                        } else if ($.type(_eval) === 'object') {
                            var commands = [];
                            for (var name in _eval) {
                                commands.push(name);
                            }
                            _eval = make_eval_from_object(_eval);
                            options = options || {};
                            options['completion'] = function(term, string, callback) {
                                callback(commands);
                            };
                        } else if ($.type(_eval) != 'function') {
                            throw "Invalid value as eval in push command";
                        }
                        interpreters.push($.extend({'eval': _eval}, options));
                        prepare_top_interpreter();
                    }
                    return self;
                },
                pop: function(string) {
                    if (string !== undefined) {
                        echo_command(string);
                    }
                    if (interpreters.top().name === settings.name) {
                        if (settings.login) {
                            logout();
                            if ($.type(settings.onExit) === 'function') {
                                try {
                                    settings.onExit(self);
                                } catch (e) {
                                    display_exception(e, 'onExit');
                                    throw e;
                                }
                            }
                        }
                    } else {
                        var current = interpreters.pop();
                        prepare_top_interpreter();
                        if ($.type(current.onExit) === 'function') {
                            try {
                                current.onExit(self);
                            } catch (e) {
                                display_exception(e, 'onExit');
                                throw e;
                            }
                        }
                        // restore mask
                        self.set_mask(interpreters.top().mask);
                    }
                    return self;
                },
                level: function() {
                    return interpreters.size();
                },
                reset: function() {
                    self.clear();
                    while(interpreters.size() > 1) {
                        interpreters.pop();
                    }
                    initialize();
                }
            }, function(_, fun) {
                // wrap all functions and display execptions
                return function() {
                    try {
                        return fun.apply(this, Array.prototype.slice.apply(arguments));
                    } catch(e) {
                        if (_ !== 'exec') { // exec catch by command
                            display_exception(e, 'TERMINAL');
                        }
                        throw e;
                    }
                };
            }));

            // ---------------------------------------------------------------------
            var on_scrollbar_show_resize = (function() {
                var scrollBars = haveScrollbars();
                return function() {
                    if (scrollBars !== haveScrollbars()) {
                        // if scollbars appearance change we will have different
                        // number of chars
                        self.resize();
                        scrollBars = haveScrollbars();
                    }
                };
            })();

            // ---------------------------------------------------------------------
            // INIT CODE
            // ---------------------------------------------------------------------
            var url;
            if (settings.login && $.type(settings.onBeforeLogin) === 'function') {
                try {
                    settings.onBeforeLogin(self);
                } catch (e) {
                    display_exception(e, 'onBeforeLogin');
                    throw e;
                }
            }

            if ($.type(init_eval) === 'string') {
                url = init_eval; //url variable is use when making login function
                init_eval = make_json_rpc_eval_fun(init_eval, self);
            } else if ($.type(init_eval) === 'array') {
                throw "You can't use array as eval";
            } else if ($.type(init_eval) === 'object') {
                // top commands
                for (var i in init_eval) {
                    if (init_eval.hasOwnProperty(i)) {
                        command_list.push(i);
                    }
                }
                init_eval = make_eval_from_object(init_eval);
            } else if ($.type(init_eval) !== 'function') {
                throw 'Unknow object "' + String(init_eval) + '" passed as eval';
            }

            // create json-rpc authentication function
            if (url && ($.type(settings.login) === 'string' || settings.login)) {
                settings.login = (function(method) {
                    var id = 1;
                    return function(user, passwd, callback, term) {
                        self.pause();
                        $.jrpc(url,
                               id++,
                               method,
                               [user, passwd],
                               function(response) {
                                   self.resume();
                                   if (!response.error && response.result) {
                                       callback(response.result);
                                   } else {
                                       callback(null);
                                   }
                               }, function(xhr, status, error) {
                                   self.resume();
                                   self.error('&#91;AJAX&#92; Response: ' +
                                              status + '\n' +
                                              xhr.responseText);
                               });
                    };
                    //default name is login so you can pass true
                })($.type(settings.login) === 'boolean' ? 'login' : settings.login);
            }
            if (validate('prompt', settings.prompt)) {
                var interpreters = new Stack({
                    name: settings.name,
                    'eval': init_eval,
                    prompt: settings.prompt,
                    completion: settings.completion ?
                        settings.completion :
                        function(term, string, callback) {
                            callback(command_list);
                        },
                    greetings: settings.greetings
                });
                var command_line = self.find('.terminal-output').next().cmd({
                    prompt: settings.prompt,
                    history: settings.history,
                    historyFilter: settings.historyFilter,
                    historySize: settings.historySize,
                    width: '100%',
                    keydown: key_down,
                    keypress: settings.keypress ? function(e) {
                        return settings.keypress(e, self);
                    } : null,
                    onCommandChange: function(command) {
                        if ($.type(settings.onCommandChange) === 'function') {
                            try {
                                settings.onCommandChange(command, self);
                            } catch (e) {
                                display_exception(e, 'onCommandChange');
                                throw e;
                            }
                        }
                        scroll_to_bottom();
                    },
                    commands: commands
                });
                num_chars = get_num_chars();
                terminals.append(self);
                if (settings.enabled === true) {
                    self.focus(undefined, true);
                } else {
                    self.disable();
                }
                $(document).click(function(e) {
                    if (!$(e.target).parents().hasClass('terminal') &&
                        settings.onBlur(self) !== false) {
                        self.disable();
                    }
                });
                $(window).resize(function() {
                    if (self.is(':visible')) {
                        var width = self.width();
                        var height = self.height();
                        // prevent too many calculations in IE because of resize event bug
                        if (old_height !== height || old_width !== width) {
                            self.resize();
                        }
                    }
                });
                self.click(function() {
                    //if (!(pause && terminals.length() > 1 &&
                    //     self === $.terminal.active())) {
                    self.focus();
                });
                if (settings.login && self.token && !self.token() && self.login_name &&
                    !self.login_name()) {
                    login();
                } else {
                    initialize();
                }
                if ($.type($.fn.init.prototype.mousewheel) === 'function') {
                    self.mousewheel(function(event, delta) {
                        //self.echo(dir(event));
                        if (delta > 0) {
                            self.scroll(-40);
                        } else {
                            self.scroll(40);
                        }
                        return false;
                    }, true);
                }
            }
            self.data('terminal', self);
            return self;
        }
    }; //terminal plugin
})(jQuery);
