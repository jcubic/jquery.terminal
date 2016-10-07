if (typeof window === 'undefined') {
    var node = true;
    var jsdom = require("jsdom");
    global.document = jsdom.jsdom();
    global.window = global.document.parentWindow;
    var navigator = {userAgent: "node-js", platform: "Linux i686"};
    global.window.navigator = global.navigator = navigator;
    global.jQuery = global.$ = require("jquery");
    require('../js/jquery.terminal-src');
    require('../js/unix_formatting');
    global.location = global.window.location = {hash: ''};
    global.window.Element.prototype.getBoundingClientRect = function() {
        var self = $(this);
        return {width: self.width(), height: self.height()};
    };
    global.window.Element.prototype.getClientRects = function() {
        var self = $(this);
        return [{width: self.width(), height: self.height()}];
    };
}
describe('Terminal utils', function() {
    var command = 'test "foo bar" baz /^asd [x]/ str\\ str 10 1e10';
    var args = '"foo bar" baz /^asd [x]/ str\\ str 10 1e10';
    describe('$.terminal.split_arguments', function() {
        it('should create array of arguments', function() {
            expect($.terminal.split_arguments(args)).toEqual([
                    'foo bar',
                    'baz',
                    '/^asd [x]/',
                    'str str',
                    '10',
                    '1e10'
            ]);
        });
    });
    describe('$.terminal.parse_arguments', function() {
        it('should create array of arguments and convert types', function() {
            expect($.terminal.parse_arguments(args)).toEqual([
                    'foo bar',
                    'baz',
                    /^asd [x]/,
                    'str str',
                    10,
                    1e10
            ]);
        });
    });
    describe('$.terminal.split_command', function() {
        it('Should split command', function() {
            var cmd = jQuery.terminal.split_command(command);
            expect(cmd).toEqual({
                command: command,
                name: 'test',
                args: [
                    'foo bar',
                    'baz',
                    '/^asd [x]/',
                    'str str',
                    '10',
                    '1e10'
                ],
                rest: '"foo bar" baz /^asd [x]/ str\\ str 10 1e10'
            });
        });
    });
    describe('$.terminal.parse_command', function() {
        it('should split and parse command', function() {
            var cmd = jQuery.terminal.parse_command(command);
            expect(cmd).toEqual({
                command: command,
                name: 'test',
                args: [
                    'foo bar',
                    'baz',
                    /^asd [x]/,
                    'str str',
                    10,
                    1e10
                ],
                rest: '"foo bar" baz /^asd [x]/ str\\ str 10 1e10'
            });
        });
    });
    var ansi_string = '\x1b[2;31;46mFoo\x1b[1;3;4;32;45mBar\x1b[0m\x1b[7mBaz';
    describe('$.terminal.from_ansi', function() {
        it('should convert ansi to terminal formatting', function() {
            var string = $.terminal.from_ansi(ansi_string);
            expect(string).toEqual('[[;#640000;#008787]Foo][[biu;#44D544;#F5F]'+
                                   'Bar][[;#000;#AAA]Baz]');
        });
    });
    describe('$.terminal.overtyping', function() {
        var string = 'HELLO TERMINAL'.replace(/./g, function(chr) {
            return chr == ' ' ? chr : chr + '\x08' + chr;
        });
        var result = '[[b;#fff;]HELLO] [[b;#fff;]TERMINAL]';
        it('should convert to terminal formatting', function() {
            expect($.terminal.overtyping(string)).toEqual(result);
        });
    });
    describe('$.terminal.escape_brackets', function() {
        var string = '[[jQuery]] [[Terminal]]';
        var result = '&#91;&#91;jQuery&#93;&#93; &#91;&#91;Terminal&#93;&#93;';
        it('should replace [ and ] with html entities', function() {
            expect($.terminal.escape_brackets(string)).toEqual(result);
        });
    });
    describe('$.terminal.encode', function() {
        var tags = '<hello> </hello>\t<world> </world>';
        var tags_result = '&lt;hello&gt;&nbsp;&lt;/hello&gt;&nbsp;&nbsp;&nbsp;'+
            '&nbsp;&lt;world&gt;&nbsp;&lt;/world&gt;';
        it('should convert < > space and tabs', function() {
            expect($.terminal.encode(tags)).toEqual(tags_result);
        });
        var entites = '& & &amp; &64; &#61; &#91';
        //'&amp;&nbsp;&amp;&nbsp;&amp;&nbsp;&amp;64;&nbsp;&#61;&nbsp;&#91'
        var ent_result = '&amp;&nbsp;&amp;&nbsp;&amp;&nbsp;&amp;64;&nbsp;&#61;'+
            '&nbsp;&amp;#91';
        it('it should convert & but not when used with entities', function() {
            expect($.terminal.encode(entites)).toEqual(ent_result);
        });
    });
    describe('$.terminal.format_split', function() {
    });
    describe('$.terminal.is_formatting', function() {

        it('should detect terminal formatting', function() {
            var formattings = [
                '[[;;]Te[xt]',
                '[[;;]Te\\]xt]',
                '[[;;]]',
                '[[gui;;;class]Text]',
                '[[b;#fff;]Text]',
                '[[b;red;blue]Text]'];
            var not_formattings = [
                '[[;;]Text[',
                '[[Text]]',
                '[[Text[[',
                '[[;]Text]',
                'Text]',
                '[[Text',
                '[;;]Text]'];
            formattings.forEach(function(formatting) {
                expect($.terminal.is_formatting(formatting)).toEqual(true);
            });
            not_formattings.forEach(function(formatting) {
                expect($.terminal.is_formatting(formatting)).toEqual(false);
            });
        });
    });
    describe('$.terminal.escape_regex', function() {
        it('should escape regex special characters', function() {
            var safe = "\\\\\\^\\*\\+\\?\\.\\$\\[\\]\\{\\}\\(\\)";
            expect($.terminal.escape_regex('\\^*+?.$[]{}()')).toEqual(safe);
        });
    });
    describe('$.terminal.have_formatting', function() {
        var formattings = [
            'some text [[;;]Te[xt] and formatting',
            'some text [[;;]Te\\]xt] and formatting',
            'some text [[;;]] and formatting',
            'some text [[gui;;;class]Text] and formatting',
            'some text [[b;#fff;]Text] and formatting',
            'some text [[b;red;blue]Text] and formatting'];
        var not_formattings = [
            'some text [[;;]Text[ and formatting',
            'some text [[Text]] and formatting',
            'some text [[Text[[ and formatting',
            'some text [[;]Text] and formatting',
            'some text Text] and formatting',
            'some text [[Text and formatting',
            'some text [;;]Text] and formatting'];
        it('should detect terminal formatting', function() {
            formattings.forEach(function(formatting) {
                expect($.terminal.have_formatting(formatting)).toEqual(true);
            });
            not_formattings.forEach(function(formatting) {
                expect($.terminal.have_formatting(formatting)).toEqual(false);
            });
        });
    });
    describe('$.terminal.valid_color', function() {
        it('should mark hex color as valid', function() {
            var valid_colors = ['#fff', '#fab', '#ffaacc', 'red', 'blue'];
            valid_colors.forEach(function(color) {
                expect($.terminal.valid_color(color)).toBe(true);
            });
        });
    });
    describe('$.terminal.format', function() {
        var format = '[[biugs;#fff;#000]Foo][[i;;;foo]Bar][[ous;;]Baz]';
        it('should create html span tags with style and classes', function() {
            var string = $.terminal.format(format);
            expect(string).toEqual('<span style="font-weight:bold;text-decorat'+
                                   'ion:underline line-through;font-style:ital'+
                                   'ic;color:#fff;text-shadow:0 0 5px #fff;bac'+
                                   'kground-color:#000" data-text="Foo">Foo</s'+
                                   'pan><span style="font-style:italic;" class'+
                                   '="foo" data-text="Bar">Bar</span><span sty'+
                                   'le="text-decoration:underline line-through'+
                                   ' overline;" data-text="Baz">Baz</span>');
        });
    });
    describe('$.terminal.strip', function() {
        var formatting = '-_-[[biugs;#fff;#000]Foo]-_-[[i;;;foo]Bar]-_-[[ous;;'+
            ']Baz]-_-';
        var result = '-_-Foo-_-Bar-_-Baz-_-';
        it('should remove formatting', function() {
            expect($.terminal.strip(formatting)).toEqual(result);
        });
    });
    describe('$.terminal.split_equal', function() {
        var text = ['[[bui;#fff;]Lorem ipsum dolor sit amet, consectetur adipi',
            'scing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim',
            ' et est porttitor semper at vitae augue. Proin at nulla at dui ma',
            'ttis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem co',
            'nvallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare,',
            ' tellus] est [[b;;#f00]consequat nunc, quis blandit elit odio eu ',
            'arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidun',
            't orci id commodo. Aliquam] non magna quis [[i;;]tortor malesuada',
            ' aliquam] eget ut lacus. Nam ut vestibulum est. Praesent volutpat',
            ' tellus in eros dapibus elementum. Nam laoreet risus non nulla mo',
            'llis ac luctus [[ub;#fff;]felis dapibus. Pellentesque mattis elem',
            'entum augue non sollicitudin. Nullam lobortis fermentum elit ac m',
            'ollis. Nam ac varius risus. Cras faucibus euismod nulla, ac aucto',
            'r diam rutrum sit amet. Nulla vel odio erat], ac mattis enim.'
        ].join('');
        it('should split text that into equal length chunks', function() {
            var cols = [10, 40, 60, 400];
            for (var i=cols.length; i--;) {
                var lines = $.terminal.split_equal(text, cols[i]);
                var success = true;
                for (var j=0; j<lines.length; ++j) {
                    if ($.terminal.strip(lines[j]).length > cols[i]) {
                        success = false;
                        break;
                    }
                }
                expect(success).toEqual(true);
            }
        });
    });
});
var support_animations = (function() {
    var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '',
        elm = document.createElement('div');
    if (elm.style.animationName) { animation = true; }
    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            var name = domPrefixes[i] + 'AnimationName';
            if (elm.style[ name ] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    return animation;
})();
function enter_text(text) {
    var e;
    var $root = $(document.documentElement || window);
    for (var i=0; i<text.length; ++i) {
        e = $.Event("keypress");
        e.which = e.keyCode = text.charCodeAt(i);
        e.ctrlKey = false;
        e.altKey = false;
        $root.trigger(e);
    }
}
function shortcut(ctrl, alt, shift, which) {
    var e = $.Event("keydown");
    e.ctrlKey = ctrl;
    e.altKey = alt;
    e.shiftKey = shift;
    e.which = e.keyCode = which;
    $(document.documentElement || window).trigger(e);
}
function enter_key() {
    shortcut(false, false, false, 13);
}
function enter(term, text) {
    var active = $.terminal.active();
    term.insert(text).focus();
    enter_key();
    active.focus();
}
function tests_on_ready() {
    describe('Terminal plugin', function() {
        describe('terminal create / terminal destroy', function() {
            var term = $('<div/>').appendTo('body').terminal();
            it('should create terminal', function() {
                expect(term.length).toBe(1);
            });
            it('should have proper elements', function() {
                expect(term.hasClass('terminal')).toBe(true);
                expect(term.find('.terminal-output').length).toBe(1);
                expect(term.find('.cmd').length).toBe(1);
                var prompt = term.find('.prompt');
                expect(prompt.length).toBe(1);
                expect(prompt.is('span')).toBe(true);
                expect(prompt.children().length).toBe(1);
                var cursor = term.find('.cursor');
                expect(cursor.length).toBe(1);
                expect(cursor.is('span')).toBe(true);
                expect(cursor.prev().is('span')).toBe(true);
                expect(cursor.next().is('span')).toBe(true);
                term.focus(true);
                expect(cursor.hasClass('blink')).toBe(true);
                expect(term.find('.clipboard').length).toBe(1);
            });
            it('should have signature', function() {
                var sig = term.find('.terminal-output div div').map(function() { return $(this).text(); }).get().join('\n');
                expect(term.signature().replace(/ /g, '\xA0')).toEqual(sig);
            });
            it('should have default prompt', function() {
                var prompt = term.find('.prompt');
                expect(prompt.html()).toEqual("<span>&gt;&nbsp;</span>");
                expect(prompt.text()).toEqual('>\xA0');
            });
            it('should destroy terminal', function() {
                term.destroy();
                expect(term.children().length).toBe(0);
                term.remove();
            });
        });
        describe('cursor', function() {
            it('only one terminal should have blinking cursor', function() {
                var term1 = $('<div/>').appendTo('body').terminal($.noop);
                term1.focus();
                var term2 = $('<div/>').appendTo('body').terminal($.noop);
                term1.pause();
                term2.focus();
                term1.resume();
                expect($('.cursor.blink').length).toEqual(1);
                term1.destroy().remove();
                term2.destroy().remove();
            });
        });
        describe('enter text', function() {
            var interpreter = {
                foo: function() {
                }
            };
            var term = $('<div/>').appendTo('body').terminal(interpreter);
            it('text should appear and interpreter function should be called', function() {
                term.focus(true);
                var spy = spyOn(interpreter, 'foo');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                enter_text('foo');
                enter_key();
                expect(interpreter.foo).toHaveBeenCalled();
                var last_div = term.find('.terminal-output > div:last-child');
                expect(last_div.hasClass('command')).toBe(true);
                expect(last_div.children().html()).toEqual('<span>&gt;&nbsp;foo</span>');
                term.destroy().remove();
            });
        });
        describe('prompt', function() {
            var term = $('<div/>').appendTo('body').terminal($.noop, {
                prompt: '>>> '
            });
            it('should return prompt', function() {
                expect(term.get_prompt()).toEqual('>>> ');
                expect(term.find('.prompt').html()).toEqual('<span>&gt;&gt;&gt;&nbsp;</span>');
            });
            it('should set prompt', function() {
                term.set_prompt('||| ');
                expect(term.get_prompt()).toEqual('||| ');
                expect(term.find('.prompt').html()).toEqual('<span>|||&nbsp;</span>');
                function prompt(callback) {
                    callback('>>> ');
                }
                term.set_prompt(prompt);
                expect(term.get_prompt()).toEqual(prompt);
                expect(term.find('.prompt').html()).toEqual('<span>&gt;&gt;&gt;&nbsp;</span>');
            });
            it('should format prompt', function() {
                var prompt = '<span style="font-weight:bold;text-decoration:underline;color:#fff;" data-text=">>>">&gt;&gt;&gt;</span><span>&nbsp;</span>';
                term.set_prompt('[[ub;#fff;]>>>] ');
                expect(term.find('.prompt').html()).toEqual(prompt);
                term.set_prompt(function(callback) {
                    callback('[[ub;#fff;]>>>] ');
                });
                expect(term.find('.prompt').html()).toEqual(prompt);
                term.destroy().remove();
            });
        });
        describe('cmd plugin', function() {
            var term = $('<div/>').appendTo('body').css('overflow-y', 'scroll').terminal($.noop, {
                name: 'cmd',
                numChars: 150,
                numRows: 20
            });
            var string = '';
            for (var i=term.cols(); i--;) {
                term.insert('M');
            }
            var cmd = term.cmd();
            var line = cmd.find('.prompt').next();
            it('text should have 2 lines', function() {
                expect(line.is('div')).toBe(true);
                expect(line.text().length).toBe(term.cols()-2);
            });
            it('cmd plugin moving cursor', function() {
                cmd.position(-8, true);
                var before = cmd.find('.prompt').next();
                var cursor = cmd.find('.cursor');
                var after = cursor.next();
                expect(before.is('span')).toBe(true);
                expect(before.text().length).toBe(term.cols()-8);
                expect(after.next().text().length).toBe(2);
                expect(after.text().length).toBe(5);
                expect(cursor.text()).toBe('M');
            });
            it('should remove characters', function() {
                cmd['delete'](-10);
                var before = cmd.find('.prompt').next();
                var cursor = cmd.find('.cursor');
                var after = cursor.next();
                expect(before.text().length).toEqual(term.cols()-8-10);
                cmd['delete'](8);
                expect(cursor.text()).toEqual('\xA0');
                expect(after.text().length).toEqual(0);
            });
            var history = cmd.history();
            it('should have one entry in history', function() {
                cmd.purge();
                term.set_command('something').focus(true);
                enter_key();
                expect(history.data()).toEqual(['something']);
            });
            it('should not add item to history if history is disabled', function() {
                history.disable();
                term.set_command('something else');
                enter_key();
                expect(history.data()).toEqual(['something']);
            });
            it('should remove commands from history', function() {
                var spy = spyOn(history, 'purge');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                cmd.purge();
                expect(history.purge).toHaveBeenCalled();
                expect(history.data()).toEqual([]);
            });
            it('should have name', function() {
                expect(cmd.name()).toEqual('cmd_3');
            });
            it('should return command', function() {
                cmd.set('foo');
                expect(cmd.get()).toEqual('foo');
            });
            it('should not move position', function() {
                var pos = cmd.position();
                cmd.insert('bar', true);
                expect(cmd.position()).toEqual(pos);
            });
            it('should return $.noop for commands', function() {
                expect($.terminal.active().commands()).toEqual($.noop);
            });
            it('should set position', function() {
                cmd.position(0);
                expect(cmd.position()).toEqual(0);
            });
            it('should set and remove mask', function() {
                cmd.mask('•');
                cmd.position(6);
                var before = cmd.find('.prompt').next();
                expect(before.text()).toEqual('••••••');
                expect(cmd.get()).toEqual('foobar');
                cmd.mask(false);
                expect(before.text()).toEqual('foobar');
            });
            it('should execute functions on shortcuts', function() {
                var spy;
                spy = spyOn(cmd, 'position');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                shortcut(true, false, false, 65); // CTRL+A
                expect(cmd.position).toHaveBeenCalled();
                spy = spyOn(cmd, 'delete');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                shortcut(true, false, false, 75); // CTRL+K
                expect(cmd['delete']).toHaveBeenCalled();
                spy = spyOn(cmd, 'insert');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                shortcut(true, false, false, 89); // CTRL+Y
                expect(cmd.insert).toHaveBeenCalled();
                shortcut(true, false, false, 85); // CTRL+U
                expect(cmd.kill_text()).toEqual('foobar');
                shortcut(true, false, true, 13);
                expect(cmd.find('.prompt').next().text()).toEqual('\xA0');
                expect(cmd.get()).toEqual('\n');
                cmd.set('');
                shortcut(false, false, false, 9); // TAB
                expect(cmd.get()).toEqual('\t');
                history.enable();
                cmd.set('foo bar');
                enter_key();
                shortcut(false, false, false, 38); // UP ARROW
                expect(cmd.get()).toEqual('foo bar');
                shortcut(false, false, false, 40); // DOWN ARROW
                expect(cmd.get()).toEqual('');
                cmd.insert('hello');
                shortcut(false, false, false, 38);
                shortcut(false, false, false, 40);
                expect(cmd.get()).toEqual('hello');
                shortcut(true, false, false, 80); // CTRL+P
                expect(cmd.get()).toEqual('foo bar');
                shortcut(true, false, false, 78); // CTRL+N
                expect(cmd.get()).toEqual('hello');
                cmd.set('foo bar baz');
                shortcut(false, false, false, 37); // LEFT ARROW
                expect(cmd.position()).toEqual(10);
                shortcut(true, false, false, 37); // moving by words
                expect(cmd.position()).toEqual(8);
                shortcut(true, false, false, 37);
                expect(cmd.position()).toEqual(4);
                shortcut(true, false, false, 37);
                expect(cmd.position()).toEqual(0);
                shortcut(false, false, false, 39); // RIGHT ARROW
                expect(cmd.position()).toEqual(1);
                shortcut(true, false, false, 39);
                expect(cmd.position()).toEqual(3);
                shortcut(true, false, false, 39);
                expect(cmd.position()).toEqual(7);
                shortcut(true, false, false, 39);
                expect(cmd.position()).toEqual(11);
                shortcut(false, false, false, 36); // HOME
                expect(cmd.position()).toEqual(0);
                shortcut(false, false, false, 35); // END
                expect(cmd.position()).toEqual(cmd.get().length);
                shortcut(true, false, false, 82); // CTRL+R
                expect(cmd.prompt()).toEqual("(reverse-i-search)`': ");
                enter_text('foo');
                expect(cmd.get()).toEqual('foo bar');
                shortcut(true, false, false, 71); // CTRL+G
                expect(cmd.get()).toEqual('foo bar baz');
                cmd.purge();
                term.destroy().remove();
            });
        });
        function JSONRPCMock(url, object, options) {
            var defaults = {
                no_system_describe: false,
                async: false,
                error: $.noop
            };
            var settings = $.extend({}, defaults, options);
            var ajax = $.ajax;
            var system = {
                'sdversion': '1.0',
                'name': 'DemoService',
                'address': url,
                // md5('JSONRPCMock')
                'id': 'urn:md5:e1a975ac782ce4ed0a504ceb909abf44',
                'procs': []
            };
            for (var key in object) {
                var proc = {
                    name: key
                };
                if ($.isFunction(object[key])) {
                    var re = /function[^\(]+\(([^\)]+)\)/;
                    var m = object[key].toString().match(re);
                    if (m) {
                        proc.params = m[1].split(/\s*,\s*/);
                    }
                }
                system.procs.push(proc);
            }
            $.ajax = function(obj) {
                function done() {
                    if ($.isFunction(obj.success)) {
                        obj.success(resp, 'OK', {
                            getResponseHeader: function(header) {
                                if (header == 'Content-Type') {
                                    return 'application/json';
                                }
                            }
                        });
                    }
                    defer.resolve(resp);
                }
                if (obj.url == url) {
                    var defer = $.Deferred();
                    try {
                        var req = JSON.parse(obj.data);
                        var resp;
                        if (req.method == 'system.describe') {
                            if (!settings.no_system_describe) {
                                resp = system;
                            } else {
                                var data = obj.data;
                                if (typeof data == 'string') {
                                    data = JSON.parse(data);
                                }
                                resp = {
                                    "jsonrpc": "2.0",
                                    "result": null,
                                    "id": data.id,
                                    "error": {
                                        "code": -32601,
                                        "message": "There is no system.describe method"
                                    }
                                };
                            }
                        } else {
                            var error = null;
                            var ret = null;
                            try {
                                ret = object[req.method].apply(null, req.params);
                            } catch (e) {
                                error = {message: e.message};
                            }
                            resp = {
                                id: req.id,
                                jsonrpc: '1.1',
                                result: ret,
                                error: error
                            };
                        }
                        resp = JSON.stringify(resp);
                        if (settings.async) {
                            setTimeout(done, 100);
                        } else {
                            done();
                        }
                    } catch (e) {
                        throw new Error(e.message);
                    }
                    return defer.promise();
                } else {
                    return ajax.apply($, arguments);
                }
            };
        }
        var token = 'TOKEN';
        var exception = 'Some Exception';
        var object = {
            echo: function(token, str) {
                return str;
            },
            foo: function(token, obj) {
                return obj;
            },
            exception: function(token) {
                throw new Error(exception);
            },
            login: function(user, password) {
                if (user == 'demo' && password == 'demo') {
                    return token;
                } else {
                    return null;
                }
            }
        };
        JSONRPCMock('/test', object);
        JSONRPCMock('/no_describe', object, {no_system_describe: true});
        JSONRPCMock('/async', object, {async: true});
        describe('JSON-RPC', function() {
            var term = $('<div/>').appendTo('body').terminal('/test', {
                login: true
            });
            it('should call login', function() {
                if (term.token()) {
                    term.logout();
                }
                term.focus();
                var spy = spyOn(object, 'login');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                enter(term, 'test');
                enter(term, 'test');
                var last_div = term.find('.terminal-output > div:last-child');
                expect(last_div.text()).toEqual('Wrong password try again!');
                expect(object.login).toHaveBeenCalledWith('test', 'test');
                enter(term, 'demo');
                enter(term, 'demo');
                expect(object.login).toHaveBeenCalledWith('demo', 'demo');
                expect(term.token()).toEqual(token);
            });
            it('should call a function', function() {
                term.focus();
                var spy = spyOn(object, 'echo');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                enter(term, 'echo hello');
                expect(object.echo).toHaveBeenCalledWith(token, 'hello');
                term.destroy().remove();
            });
            describe('No system.describe', function() {
                it('should call login rpc method', function() {
                    term = $('<div/>').appendTo('body').terminal('/no_describe', {
                        login: true
                    });
                    if (term.token()) {
                        term.logout();
                    }
                    var spy = spyOn(object, 'login');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    enter(term, 'demo');
                    enter(term, 'demo');
                    expect(object.login).toHaveBeenCalledWith('demo', 'demo');
                });
                it('should pass TOKEN to method', function() {
                    var spy = spyOn(object, 'echo');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    enter(term, 'echo hello');
                    expect(object.echo).toHaveBeenCalledWith(token, 'hello');
                    term.destroy().remove();
                });
                it('should call login function', function() {
                    var options = {
                        login: function(user, password, callback) {
                            if (user == 'foo' && password == 'bar') {
                                callback(token);
                            } else {
                                callback(null);
                            }
                        }
                    };
                    var spy = spyOn(options, 'login');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    spy = spyOn(object, 'echo');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    term = $('<div/>').appendTo('body').terminal('/no_describe',
                                                                      options);
                    if (term.token()) {
                        term.logout();
                    }
                    enter(term, 'test');
                    enter(term, 'test');
                    expect(options.login).toHaveBeenCalled();
                    expect(term.token()).toBeFalsy();
                    enter(term, 'foo');
                    enter(term, 'bar');
                    expect(options.login).toHaveBeenCalled();
                    expect(term.token()).toEqual(token);
                    enter(term, 'echo hello');
                    expect(object.echo).toHaveBeenCalledWith(token, 'hello');
                    term.destroy().remove();
                });
                it('should ignore system.describe method', function() {
                    term = $('<div/>').appendTo('body').terminal('/test', {
                        ignoreSystemDescribe: true,
                        completion: true
                    });
                    expect(term.export_view().interpreters.top().completion).toBeFalsy();
                    term.destroy().remove();
                });
            });
        });
        describe('nested object interpreter', function() {
            var interpereter = {
                foo: {
                    bar: {
                        baz: function() {
                        },
                        add: function(a, b) {
                            this.echo(a+b);
                        },
                        type: function(obj) {
                            type.test(obj.constructor);
                            this.echo(JSON.stringify([].slice.call(arguments)));
                        }
                    }
                },
                quux: '/test'
            };
            var type = {
                test: function(obj) { }
            };
            var fallback = {
                interpreter: function(command, term) { }
            };
            var term = $('<div/>').appendTo('body').terminal(interpereter);
            it('should created nested intepreter', function() {
                term.focus();
                var spy = spyOn(interpereter.foo.bar, 'baz');
                enter(term, 'foo');
                expect(term.get_prompt()).toEqual('foo> ');
                enter(term, 'bar');
                expect(term.get_prompt()).toEqual('bar> ');
                enter(term, 'baz');
                expect(interpereter.foo.bar.baz).toHaveBeenCalled();
            });
            it('should convert arguments', function() {
                var spy = spyOn(type, 'test');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                term.insert('add 10 20');
                enter_key();
                var last_div = term.find('.terminal-output > div:last-child');
                expect(last_div.text()).toEqual('30');
                enter(term, 'type /foo/gi');
                expect(type.test).toHaveBeenCalledWith(RegExp);
                enter(term, 'type 10');
                expect(type.test).toHaveBeenCalledWith(Number);
            });
            it('should show error on wrong arity', function() {
                enter(term, 'type 10 20');
                var last_div = term.find('.terminal-output > div:last-child');
                expect(last_div.text()).toEqual("[Arity] Wrong number of arguments. Function 'type' expects 1 got 2!");
                term.destroy().remove();
            });
            it('should call fallback function', function() {
                var spy = spyOn(fallback, 'interpreter');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                term = $('<div/>').appendTo('body').terminal([
                    interpereter, fallback.interpreter
                ], {
                    checkArity: false
                });
                enter(term, 'baz');
                expect(fallback.interpreter).toHaveBeenCalledWith('baz', term);
            });
            it('should not show error on wrong arity', function() {
                // checkArity is false from last spec
                var spy = spyOn(type, 'test');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                enter(term, 'foo');
                enter(term, 'bar');
                enter(term, 'type 10 20');
                expect(type.test).toHaveBeenCalled();
            });
            it('should call json-rpc', function() {
                var spy = spyOn(object, 'echo');
                if (spy.andCallThrough) {
                    spy.andCallThrough();
                } else {
                    spy.and.callThrough();
                }
                term.pop().pop().focus();
                enter(term, 'quux');
                expect(term.get_prompt()).toEqual('quux> ');
                // for unknown reason cmd have visibility set to hidden
                term.cmd().enable().visible();
                enter(term, 'echo foo bar');
                expect(object.echo).toHaveBeenCalledWith('foo', 'bar');
                term.destroy().remove();
                term = $('<div/>').appendTo('body').terminal([
                    interpereter, '/test', fallback.interpreter
                ]);
                term.focus();
                enter(term, 'echo TOKEN world'); // we call echo without login
                expect(spy).toHaveBeenCalledWith('TOKEN', 'world');
            });
            it('should show error', function() {
                enter(term, 'exception TOKEN');
                var last_div = term.find('.terminal-output > div:last-child');
                expect(last_div.text().replace(/ /g, ' ')).toEqual('[RPC] ' +exception);
                term.destroy().remove();
            });
        });
        describe('jQuery Terminal object', function() {
            var test = {
                test: function(term) {}
            };
            var term = $('<div/>').appendTo('body').terminal([{
                foo: function() {
                    test.test(this);
                }
            }, function(cmd, term) {
                test.test(term);
            }]);
            it('value returned by plugin should be the same as in intepreter', function() {
                term.focus();
                var spy = spyOn(test, 'test');
                enter(term, 'foo');
                expect(test.test).toHaveBeenCalledWith(term);
                enter(term, 'bar');
                expect(test.test).toHaveBeenCalledWith(term);
                term.destroy().remove();
            });
        });
        describe('Completion', function() {
            var term = $('<div/>').appendTo('body').terminal($.noop, {
                name: 'completion',
                greetings: false,
                completion: ['foo', 'bar', 'baz', 'lorem\\ ipsum']
            });
            it('should complete text for main intepreter', function() {
                term.focus();
                term.insert('f');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('foo');
                term.set_command('');
                term.insert('lorem\\ ');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('lorem\\ ipsum');
            });
            it('should complete text for nested intepreter', function() {
                term.push($.noop, {
                    completion: ['lorem', 'ipsum', 'dolor']
                });
                term.insert('l');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('lorem');
                term.pop();
            });
            it('should complete when completion is a function with setTimeout', function(done) {
                var term = $('<div/>').appendTo('body').terminal($.noop);
                term.focus().push($.noop, {
                    completion: function(term, string, callback) {
                        setTimeout(function() {
                            callback(['one', 'two', 'tree']);
                        }, 100);
                    }
                });
                term.set_command('');
                term.insert('o');
                shortcut(false, false, false, 9);
                setTimeout(function() {
                    expect(term.get_command()).toEqual('one');
                    term.destroy().remove();
                    done();
                }, 200);
            });
            function completion(term, string, callback) {
                var command = term.get_command();
                var cmd = $.terminal.parse_command(command);
                var re = new RegExp('^\\s*' + $.terminal.escape_regex(string));
                if (command.match(re)) {
                    callback(['foo', 'bar', 'baz', 'lorem\\ ipsum']);
                } else if (cmd.name == 'foo') {
                    callback(['one', 'two', 'tree']);
                } else {
                    callback(['four', 'five', 'six']);
                }
            }
            it('should complete argument', function() {
                term.focus().push($.noop, {completion: completion});
                term.set_command('');
                term.insert('foo o');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('foo one');
                term.pop();
            });
            it('should complete in the middle of the word', function() {
                term.push($.noop, {completion: completion});
                term.set_command('f one');
                var cmd = term.cmd();
                cmd.position(1);
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('foo one');
                var command = 'lorem\\ ip';
                term.set_command(command +' one');
                cmd.position(command.length);
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('lorem\\ ipsum one');
            });
            it('should complete rpc method', function() {
                term.push('/test', {
                    completion: true
                });
                term.set_command('').resume().focus();
                term.insert('ec');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('echo');
            });
            it('should complete command from array when used with JSON-RPC', function() {
                term.push('/test', {
                    completion: ['foo', 'bar', 'baz']
                });
                term.focus().resume().set_command('');
                term.insert('f');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('foo');
            });
            it('should insert tab when RPC used without system.describe', function(done) {
                term.push('/no_describe', {
                    completion: true
                });
                setTimeout(function() {
                    term.focus().set_command('').cmd().enable().visible();
                    term.insert('f');
                    shortcut(false, false, false, 9);
                    expect(term.get_command()).toEqual('f\t');
                    term.destroy().remove();
                    done();
                }, 200);
            });
            it('should insert tab when ignoreSystemDescribe', function() {
                term = $('<div/>').appendTo('body').terminal('/test', {
                    ignoreSystemDescribe: true,
                    completion: true
                });
                term.insert('f');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('f\t');
                term.destroy().remove();
            });
            it('should not complete by default for json-rpc', function() {
                term = $('<div/>').appendTo('body').terminal('/test');
                term.focus();
                term.insert('ec');
                shortcut(false, false, false, 9);
                expect(term.get_command()).toEqual('ec\t');
            });
        });
        describe('jQuery Terminal methods', function() {
            var terminal_name = 'methods';
            var greetings = 'Hello World!';
            var completion = ['foo', 'bar', 'baz'];
            var exported_view;
            var command = 'baz';
            var prompt = '$ ';
            var mask = '-';
            var position;
            var term = $('<div/>').appendTo('body').terminal($.noop, {
                name: terminal_name,
                greetings: greetings,
                completion: completion
            });
            it('should return id of the terminal', function() {
                term.focus();
                expect(term.id()).toEqual(8);
            });
            it('should clear the terminal', function() {
                term.clear();
                expect(term.find('.terminal-output').html()).toEqual('');
            });
            it('should export view', function() {
                enter(term, 'foo');
                enter(term, 'bar');
                term.insert(command);
                term.set_prompt(prompt);
                term.set_mask(mask);
                position = term.cmd().position();
                exported_view = term.export_view();
                expect(exported_view.prompt).toEqual(prompt);
                expect(exported_view.position).toEqual(command.length);
                expect(exported_view.focus).toEqual(true);
                expect(exported_view.mask).toEqual(mask);
                expect(exported_view.command).toEqual(command);
                expect(exported_view.lines[0][0]).toEqual('> foo');
                expect(exported_view.lines[1][0]).toEqual('> bar');
                expect(exported_view.interpreters.size()).toEqual(1);
                var top = exported_view.interpreters.top();
                expect(top.interpreter).toEqual($.noop);
                expect(top.name).toEqual(terminal_name);
                expect(top.prompt).toEqual(prompt);
                expect(top.prompt).toEqual(prompt);
                expect(top.greetings).toEqual(greetings);
                expect(top.completion).toEqual('settings');
            });
            it('should import view', function() {
                term.clear().push($.noop).set_prompt('# ')
                    .set_mask(false)
                    .set_command('foo');
                var cmd = term.cmd();
                cmd.position(0);
                term.import_view(exported_view);
                expect(cmd.mask()).toEqual(mask);
                expect(term.get_command()).toEqual(command);
                expect(term.get_prompt()).toEqual(prompt);
                expect(cmd.position()).toEqual(position);
                var html = '<div class="command">'+
                               '<div style="width: 100%;"><span>&gt;&nbsp;foo</span></div>'+
                           '</div>'+
                           '<div class="command">'+
                               '<div style="width: 100%;"><span>&gt;&nbsp;bar</span></div>'+
                           '</div>';
                expect(term.find('.terminal-output').html()).toEqual(html);
            });
            it('should save commands in hash', function() {
                location.hash = '';
                term.save_state(); // initial state
                term.save_state('foo');
                term.save_state('bar');
                expect(location.hash).toEqual('#[[8,1,"foo"],[8,2,"bar"]]');
                term.destroy().remove();
            });
            describe('exec', function() {
                var counter = 0;
                var interpreter = {
                    foo: function() {
                        this.pause();
                        setTimeout(function() {
                            this.echo('Hello ' + counter++).resume();
                        }.bind(this), 200);
                    },
                    bar: function() {
                        var d = $.Deferred();
                        setTimeout(function() {
                            d.resolve('Foo Bar');
                        }, 1000);
                        return d.promise();
                    },
                    baz: {
                        quux: function() {
                            this.echo('quux');
                        }
                    }
                };

                var term = $('<div/>').appendTo('body').terminal(interpreter);
                term.focus();
                it('should execute function', function(done) {
                    var spy = spyOn(interpreter, 'foo');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    term.exec('foo').then(function() {
                        expect(interpreter.foo).toHaveBeenCalled();
                        done();
                    });
                });
                it('should echo text when promise is resolved', function(done) {
                    term.exec('bar').then(function() {
                        var last_div = term.find('.terminal-output > div:last-child');
                        expect(last_div.text()).toEqual('Foo Bar');
                        done();
                    });
                });
                it('should create nested interpreter', function(done) {
                    term.exec('baz').then(function() {
                        expect(term.get_prompt()).toEqual('baz> ');
                        term.exec('quux').then(function() {
                            var last_div = term.find('.terminal-output > div:last-child');
                            expect(last_div.text()).toEqual('quux');
                            term.pop();
                            done();
                        });
                    });
                });
                var arr = [];
                for (i = 0; i<10; i++) {
                    arr.push('Hello ' + i);
                }
                var test_str = arr.join('\n');
                function text_echoed() {
                    return term.find('.terminal-output > div:not(.command)')
                        .map(function() {
                            return $(this).text();
                        }).get().join('\n');
                }
                it('should execute functions in order when using exec.then', function(done) {
                    term.clear();
                    counter = 0;
                    var i = 0;
                    (function recur() {
                        if (i++ < 10) {
                            term.exec('foo').then(recur);
                        } else {
                            expect(text_echoed()).toEqual(test_str);
                            done();
                        }
                    })();
                }, 10000);
                it('should execute functions in order when used delayed commands', function(done) {
                    term.clear();
                    counter = 0;
                    var promises = [];
                    for (var i = 0; i<10; i++) {
                        promises.push(term.exec('foo'));
                    }
                    $.when.apply($, promises).then(function() {
                        expect(text_echoed()).toEqual(test_str);
                        done();
                    });
                }, 10000);
                it('should execute array', function(done) {
                    term.clear();
                    counter = 0;
                    var array = [];
                    for (var i = 0; i<10; i++) {
                        array.push('foo');
                    }
                    term.exec(array).then(function() {
                        expect(text_echoed()).toEqual(test_str);
                        term.destroy().remove();
                        done();
                    });
                }, 10000);
                //*/
                it('should login from exec array', function(done) {
                    var test = {
                        test: function() {
                        }
                    };
                    var token = 'TOKEN';
                    var options = {
                        login: function(user, password, callback) {
                            if (user == 'foo' && password == 'bar') {
                                callback(token);
                            } else {
                                callback(null);
                            }
                        },
                        name: 'exec_login_array',
                        greetings: false
                    };
                    spyOn(test, 'test');
                    var spy = spyOn(options, 'login');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    var term = $('<div/>').terminal({
                        echo: function(arg) {
                            test.test(arg);
                        }
                    }, options);
                    var array = ['foo', 'bar', 'echo foo'];
                    term.exec(array).then(function() {
                        expect(options.login).toHaveBeenCalled();
                        expect(test.test).toHaveBeenCalledWith('foo');
                        term.destroy().remove();
                        done();
                    });
                });
                it('should login from hash', function(done) {
                    var test = {
                        test: function() {
                        }
                    };
                    var token = 'TOKEN';
                    var options = {
                        login: function(user, password, callback) {
                            if (user == 'foo' && password == 'bar') {
                                callback(token);
                            } else {
                                callback(null);
                            }
                        },
                        name: 'exec_login_array',
                        execHash: true,
                        greetings: 'exec'
                    };
                    var next_id = $.terminal.last_id() + 1;
                    location.hash = '#' + JSON.stringify([
                        [next_id,1,"foo"],
                        [next_id,2,"bar"],
                        [next_id,3,"echo foo"]
                    ]);
                    spyOn(test, 'test');
                    var spy = spyOn(options, 'login');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    var term = $('<div/>').terminal({
                        echo: function(arg) {
                            test.test(arg);
                        }
                    }, options);
                    setTimeout(function() {
                        expect(options.login).toHaveBeenCalled();
                        expect(test.test).toHaveBeenCalledWith('foo');
                        term.logout().destroy().remove();
                        done();
                    }, 500);
                }, 1000);
            });
            describe('methods after creating async rpc with system.describe', function() {
                it('should call methods', function(done) {
                    var spy = spyOn(object, 'echo');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    var term = $('<div/>').terminal('/async');
                    term.exec('echo foo bar');
                    term.insert('foo');
                    setTimeout(function() {
                        expect(spy).toHaveBeenCalledWith('foo', 'bar');
                        expect(term.get_command()).toEqual('foo');
                        term.destroy().remove();
                        done();
                    }, 800);
                });
            });
            describe('autologin', function() {
                var token = 'TOKEN';
                var options = {
                    greetings: 'You have been logged in',
                    login: function(user, password, callback) {
                        if (user == 'demo' && password == 'demo') {
                            callback(token);
                        } else {
                            callback(null);
                        }
                    }
                };
                var term = $('<div/>').appendTo('body').terminal($.noop, options);
                it('should log in', function() {
                    var spy = spyOn(options, 'login');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    term.autologin('user', token);
                    expect(options.login).not.toHaveBeenCalled();
                    expect(term.token()).toEqual(token);
                    var last_div = term.find('.terminal-output > div:last-child');
                    expect(last_div.text()).toEqual('You have been logged in');
                    term.destroy().remove();
                });
            });
            describe('login', function() {
                var term = $('<div/>').appendTo('body').terminal($.noop, {
                    name: 'login_method',
                    greetings: 'You have been logged in'
                });
                var token = 'TOKEN';
                var login = {
                    callback: function(user, password, callback) {
                        if (user === 'foo' && password == 'bar') {
                            callback(token);
                        } else {
                            callback(null);
                        }
                    }
                };
                it('should not login', function() {
                    var spy = spyOn(login, 'callback');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    term.focus().login(login.callback);
                    enter(term, 'foo');
                    enter(term, 'foo');
                    expect(login.callback).toHaveBeenCalled();
                    var last_div = term.find('.terminal-output > div:last-child');
                    expect(last_div.text()).toEqual('Wrong password!');
                    expect(term.get_prompt()).toEqual('> ');
                });
                it('should ask for login/password on wrong user/password', function() {
                    term.login(login.callback, true);
                    for(var i=0; i<10; i++) {
                        enter(term, 'foo');
                        expect(term.get_prompt()).toEqual('password: ');
                        enter(term, 'foo');
                        expect(term.get_prompt()).toEqual('login: ');
                    }
                    term.pop();
                });
                it('should login after first time', function() {
                    term.push($.noop, {prompt: '$$ '}).login(login.callback, true);
                    enter(term, 'foo');
                    enter(term, 'bar');
                    expect(term.token(true)).toEqual(token);
                    expect(term.get_prompt()).toEqual('$$ ');
                    // logout from interpreter, will call login so we need to pop from login
                    // and then from intepreter that was pushed
                    term.logout(true).pop().pop();
                });
                it('should login after second time', function() {
                    term.push($.noop, {prompt: '>>> '}).login(login.callback, true);
                    if (term.token(true)) {
                        term.logout(true);
                    }
                    enter(term, 'foo');
                    enter(term, 'foo');
                    expect(term.token(true)).toBeFalsy();
                    enter(term, 'foo');
                    enter(term, 'bar');
                    expect(term.token(true)).toEqual(token);
                    expect(term.get_prompt()).toEqual('>>> ');
                    term.logout(true).pop().pop();
                });
                it('should login to nested interpreter when using login option', function() {
                    term.push($.noop, {
                        prompt: '$$$ ',
                        name: 'option',
                        login: login.callback,
                        infiniteLogin: true
                    });
                    if (term.token(true)) {
                        term.logout(true);
                    }
                    enter(term, 'foo');
                    enter(term, 'foo');
                    expect(term.token(true)).toBeFalsy();
                    enter(term, 'foo');
                    enter(term, 'bar');
                    expect(term.token(true)).toEqual(token);
                    expect(term.get_prompt()).toEqual('$$$ ');
                    term.destroy().remove();
                });
            });
            describe('settings', function() {
                var term = $('<div/>').appendTo('body').terminal();
                it('should return settings even when option is not defined', function() {
                    var settings = term.settings();
                    expect($.isPlainObject(settings)).toEqual(true);
                    term.destroy().remove();
                    for (var key in settings) {
                        // name is selector if not defined
                        if (settings.hasOwnProperty(key) && key !== 'name') {
                            expect($.terminal.defaults[key]).toEqual(settings[key]);
                        }
                    }
                });
            });
            describe('commands', function() {
                function interpreter(command, term) {}
                it('should return function', function() {
                    var term = $('<div/>').appendTo('body').terminal(interpreter);
                    expect(term.commands()).toEqual(interpreter);
                    term.push('/test');
                    expect($.isFunction(term.commands())).toEqual(true);
                    term.destroy().remove();
                });
            });
            describe('setInterpreter', function() {
                it('should call set_interpreter with warning', function() {
                    var term = $('<div/>').appendTo('body').terminal();
                    spyOn(term, 'set_interpreter');
                    var warn = console.warn;
                    console.warn = $.noop;
                    spyOn(console, 'warn');
                    term.setInterpreter($.noop);
                    expect(term.set_interpreter).toHaveBeenCalledWith($.noop);
                    var warning = 'This function is deprecated, use set_interpreter insead!';
                    expect(console.warn).toHaveBeenCalledWith(warning);
                    console.warn = warn;
                    term.destroy().remove();
                });
            });
            describe('set_interpreter', function() {
                var term = $('<div/>').appendTo('body').terminal($.noop);
                it('should change intepreter', function() {
                    var test = {
                        interpreter: function(command, term) {}
                    };
                    var spy = spyOn(test, 'interpreter');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    expect(term.commands()).toEqual($.noop);
                    term.set_interpreter(test.interpreter);
                    expect(term.commands()).toEqual(test.interpreter);
                    term.exec('foo');
                    expect(test.interpreter).toHaveBeenCalledWith('foo', term);
                });
                it('should create async JSON-RPC with login', function(done) {
                    var spy_echo = spyOn(object, 'echo');
                    if (spy_echo.andCallThrough) {
                        spy_echo.andCallThrough();
                    } else {
                        spy_echo.and.callThrough();
                    }
                    var spy_login = spyOn(object, 'login');
                    if (spy_login.andCallThrough) {
                        spy_login.andCallThrough();
                    } else {
                        spy_login.and.callThrough();
                    }
                    term.set_prompt('$ ');
                    term.set_interpreter('/async', true).focus();
                    if (term.token(true)) {
                        term.logout(true);
                    }
                    enter(term, 'demo');
                    enter(term, 'demo');
                    setTimeout(function() {
                        expect(term.get_prompt()).toEqual('$ ');
                        expect(spy_login).toHaveBeenCalledWith('demo', 'demo');
                        enter(term, 'echo foo');
                        setTimeout(function() {
                            expect(spy_echo).toHaveBeenCalledWith(token, 'foo');
                            term.destroy().remove();
                            done();
                        }, 1000);
                    }, 1000);
                });
            });
            describe('greetings', function() {
                it('should show greetings', function(done) {
                    var greetings = {
                        fn: function(callback) {
                            setTimeout(function() {
                                callback(greetings.string);
                            }, 200);
                        },
                        string: 'Hello World!'
                    };
                    var spy = spyOn(greetings, 'fn');
                    if (spy.andCallThrough) {
                        spy.andCallThrough();
                    } else {
                        spy.and.callThrough();
                    }
                    var term = $('<div/>').terminal($.noop, {
                        greetings: greetings.string
                    });
                    term.clear().greetings();
                    var last_div = term.find('.terminal-output > div:last-child');
                    expect(last_div.text()).toEqual(greetings.string.replace(/ /g, ' '));
                    term.settings().greetings = greetings.fn;
                    term.clear().greetings();
                    expect(greetings.fn).toHaveBeenCalled();
                    setTimeout(function() {
                        last_div = term.find('.terminal-output > div:last-child');
                        expect(last_div.text()).toEqual(greetings.string.replace(/ /g, ' '));
                        term.settings().greetings = undefined;
                        term.clear().greetings();
                        last_div = term.find('.terminal-output > div:last-child');
                        var text = last_div.find('div').map(function() {
                            return $(this).text();
                        }).get().join('\n');
                        expect(text).toEqual(term.signature().replace(/ /g, ' '));
                        term.destroy().remove();
                        done();
                    }, 400);
                });
            });
            describe('pause/paused/resume', function() {
                var term = $('<div/>').appendTo('body').terminal();
                it('should return true on init', function() {
                    expect(term.paused()).toBeFalsy();
                });
                it('should return true when paused', function() {
                    term.pause();
                    expect(term.paused()).toBeTruthy();
                });
                it('should return false when called resume', function() {
                    term.resume();
                    expect(term.paused()).toBeFalsy();
                    term.destroy().remove();
                });
            });
            describe('cols/rows', function() {
                var numChars = 100;
                var numRows = 25;
                var term = $('<div/>').appendTo('body').terminal($.noop, {
                    numChars: numChars,
                    numRows: numRows
                });
                it('should return number of cols', function() {
                    expect(term.cols()).toEqual(numChars);
                });
                it('should return number of rows', function() {
                    expect(term.rows()).toEqual(numRows);
                    term.destroy().remove();
                });
            });
            describe('history', function() {
                var term = $('<div/>').appendTo('body').terminal($.noop, {
                    name: 'history'
                });
                var history;
                it('should return history object', function() {
                    history = term.history();
                    expect(history).toEqual(jasmine.any(Object));
                });
                it('should have entered commands', function() {
                    history.clear();
                    term.focus();
                    enter(term, 'foo');
                    enter(term, 'bar');
                    enter(term, 'baz');
                    expect(history.data()).toEqual(['foo', 'bar', 'baz']);
                    term.destroy().remove();
                });
            });
            describe('history_state', function() {
                var term = $('<div/>').appendTo('body').terminal($.noop);
                term.echo('history_state');
                it('should not record commands', function() {
                    var hash = location.hash;
                    term.focus();
                    enter(term, 'foo');
                    expect(location.hash).toEqual(hash);
                });
                it('should start recording commands', function(done) {
                    location.hash = '';
                    term.clear_history_state().clear();
                    var id = term.id();
                    window.id = id;
                    var hash = '#[['+id+',1,"foo"],['+id+',2,"bar"]]';
                    term.history_state(true);
                    // historyState option is turn on after 1 miliseconds to prevent
                    // command, that's enabled the history, to be included in hash
                    setTimeout(function() {
                        term.focus();
                        //delete window.commands;
                        enter(term, 'foo');
                        enter(term, 'bar');
                        setTimeout(function() {
                            expect(location.hash).toEqual(hash);
                            term.destroy().remove();
                            done();
                        }, 400);
                    }, 100);
                });
            });
            describe('next', function() {
                var term1 = $('<div/>').terminal();
                var term2 = $('<div/>').terminal();
                it('should swith to next terminal', function() {
                    term1.focus();
                    term1.next();
                    expect($.terminal.active()).toBe(term2);
                    term1.destroy();
                    term2.destroy();
                });
            });
            describe('focus', function() {
                var term1 = $('<div/>').terminal();
                var term2 = $('<div/>').terminal();
                it('should focus on first terminal', function() {
                    term1.focus();
                    expect($.terminal.active()).toBe(term1);
                });
                it('should focus on second terminal', function() {
                    term1.focus(false);
                    expect($.terminal.active()).toBe(term2);
                    term1.destroy();
                    term2.destroy();
                });
            });
            describe('freeze/frozen', function() {
                var term = $('<div/>').appendTo('body').terminal();
                it('should accept input', function() {
                    term.focus();
                    enter_text('foo');
                    expect(term.frozen()).toBeFalsy();
                    expect(term.get_command()).toEqual('foo');
                });
                it('should be frozen', function() {
                    term.set_command('');
                    term.freeze(true);
                    expect(term.frozen()).toBeTruthy();
                    enter_text('bar');
                    expect(term.get_command()).toEqual('');
                });
                it('should not enable terminal', function() {
                    expect(term.enabled()).toBeFalsy();
                    term.enable();
                    expect(term.enabled()).toBeFalsy();
                });
                it('should accpet input again', function() {
                    term.freeze(false);
                    expect(term.frozen()).toBeFalsy();
                    enter_text('baz');
                    expect(term.get_command()).toEqual('baz');
                    term.destroy();
                });
            });
            describe('enable/disable/enabled', function() {
                var term = $('<div/>').appendTo('body').terminal();
                it('terminal should be enabled', function() {
                    term.focus();
                    expect(term.enabled()).toBeTruthy();
                });
                it('should disable terminal', function() {
                    term.disable();
                    expect(term.enabled()).toBeFalsy();
                });
                it('should disable command line plugin', function() {
                    expect(term.cmd().isenabled()).toBeFalsy();
                });
                it('should enable terminal', function() {
                    term.enable();
                    expect(term.enabled()).toBeTruthy();
                });
                it('should enable command line plugin', function() {
                    expect(term.cmd().isenabled()).toBeTruthy();
                    term.destroy().remove();
                });
            });
            describe('signature', function() {
                var term = $('<div/>').terminal($.noop, {
                    numChars: 14
                });
                function max_length() {
                    var lines = term.signature().split('\n');
                    return Math.max.apply(null, lines.map(function(line) {
                        return line.length;
                    }));
                }
                it('should return empty string', function() {
                    expect(term.signature()).toEqual('');
                });
                it('should return proper max length of signature', function() {
                    var numbers = {20: 20, 36: 30, 60: 49, 70: 64, 100: 75};
                    Object.keys(numbers).forEach(function(numChars) {
                        var length = numbers[numChars];
                        term.option('numChars', numChars);
                        expect(max_length()).toEqual(length);
                    });
                    term.destroy();
                });
            });
            describe('version', function() {
                var term = $('<div/>').terminal();
                it('should return version', function() {
                    expect(term.version()).toEqual($.terminal.version);
                    term.destroy();
                });
            });
            // missing methods after version
            describe('flush', function() {
                var term = $('<div/>').terminal($.noop, {greetings: false});
                it('should echo stuff that was called with flush false', function() {
                    term.echo('foo', {flush: false});
                    term.echo('bar', {flush: false});
                    term.echo('baz', {flush: false});
                    term.flush();
                    expect(term.find('.terminal-output').text()).toEqual('foobarbaz');
                });
            });
        });
        describe('jQuery Terminal options', function() {

        });
    });
}
if (node) {
    tests_on_ready();
} else {
    $(tests_on_ready);
}
