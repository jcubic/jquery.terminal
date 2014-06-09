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
            expect(string).toEqual('[[;#640000;#008787]Foo][[biu;#44D544;#F5F]Bar][[;#000;#AAA]Baz]');
        });
    });
});
