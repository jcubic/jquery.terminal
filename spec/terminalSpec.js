describe('Terminal utils', function() {
    var command = 'test "foo bar" baz /^asd [x]/ str\\ str 10 1e10';
    var args = '"foo bar" baz /^asd [x]/ str\\ str 10 1e10';
    describe('$.terminal.splitArguments', function() {
        it('should create array of arguments', function() {
            expect($.terminal.splitArguments(args)).toEqual([
                    'foo bar',
                    'baz',
                    '/^asd [x]/',
                    'str str',
                    '10',
                    '1e10'
            ]);
        });
    });
    describe('$.terminal.parseArguments', function() {
        it('should create array of arguments and convert types', function() {
            expect($.terminal.parseArguments(args)).toEqual([
                    'foo bar',
                    'baz',
                    /^asd [x]/,
                    'str str',
                    10,
                    1e10
            ]);
        });
    });
    describe('$.terminal.splitCommand', function() {
        it('Should split command', function() {
            var cmd = jQuery.terminal.splitCommand(command);
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
    describe('$.terminal.parseCommand', function() {
        it('should split and parse command', function() {
            var cmd = jQuery.terminal.parseCommand(command);
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
    });
    describe('$.terminal.have_formatting', function() {
    });
    describe('$.terminal.valid_color', function() {
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
        var urls = ['http://terminal.jcubic.pl/examples.php',
                    'https://www.google.com/?q=jquery%20terminal'];
        var links = urls.map(function(href) {
            return '<a target="_blank" href="' + href + '">' + href + '</a>';
        }).join(' ');
        it('should convert url to links', function() {
            expect($.terminal.format(urls.join(' '))).
                toEqual('<span>' + links + '</span>');
        });
        var emails = ['foo@bar.com', 'baz.quux@example.com'];
        var email_links = emails.map(function(email) {
            return '<a href="mailto:' + email + '">' + email + '</a>';
        }).join(' ');
        it('should convert emails to links', function() {
            expect($.terminal.format(emails.join(' '))).
                toEqual('<span>' + email_links + '</span>');
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
