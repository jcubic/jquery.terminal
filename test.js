var term = $.terminal.active();
if (!term) {
    term = $('body').terminal($.noop).css('margin', 0);
    var margin = term.outerHeight() - term.height();
    var $win = $(window);
    $win.resize(function() {
        term.css('height', $(window).height()-20);
    }).resize();
}
term.echo('Testing...');
function assert(cond, msg) {
    var flag = cond ? '[[b;#44D544;]PASS]' : '[[b;#FF5555;]FAIL]';
    term.echo(msg + ' &#91;' + flag + '&#93;');
}
var string = 'name "foo bar" baz /^asd [x]/ str\\ str 10 1e10';
var cmd = $.terminal.splitCommand(string);
assert(cmd.name === 'name' && cmd.args[0] === 'foo bar' &&
       cmd.args[1] === 'baz' && cmd.args[2] === '/^asd [x]/' &&
       cmd.args[3] === 'str str' && cmd.args[4] === '10' &&
       cmd.args[5] === '1e10', '$.terminal.splitCommand');
cmd = $.terminal.parseCommand(string);
assert(cmd.name === 'name' && cmd.args[0] === 'foo bar' &&
       cmd.args[1] === 'baz' && $.type(cmd.args[2]) === 'regexp' &&
       cmd.args[2].source === '^asd [x]' &&
       cmd.args[3] === 'str str' && cmd.args[4] === 10 &&
       cmd.args[5] === 1e10, '$.terminal.parseCommand');
string = '\x1b[2;31;46mFoo\x1b[1;3;4;32;45mBar\x1b[0m\x1b[7mBaz';
assert($.terminal.from_ansi(string) ===
       '[[;#600;#008787]Foo][[biu;#44D544;#F5F]Bar][[;#000;#AAA]Baz]',
       '$.terminal.from_ansi');
string = '[[biugs;#fff;#000]Foo][[i;;;foo]Bar][[ous;;]Baz]';
term.echo('$.terminal.format');
assert($.terminal.format(string) === '<span style="font-weight:bold;text-decoration:underline line-through;font-style:italic;color:#fff;text-shadow:0 0 5px #fff;background-color:#000" data-text="Foo">Foo</span><span style="font-style:italic;" class="foo" data-text="Bar">Bar</span><span style="text-decoration:underline line-through overline;" data-text="Baz">Baz</span>', '\tformatting');
string = 'http://terminal.jcubic.pl/examples.php https://www.google.com/?q=jquery%20terminal';
assert($.terminal.format(string) === '<a target="_blank" href="http://terminal.jcubic.pl/examples.php">http://terminal.jcubic.pl/examples.php</a> <a target="_blank" href="https://www.google.com/?q=jquery%20terminal">https://www.google.com/?q=jquery%20terminal</a>', '\turls');
string = 'foo@bar.com baz.quux@example.com';
assert($.terminal.format(string) === '<a href="mailto:foo@bar.com">foo@bar.com</a> <a href="mailto:baz.quux@example.com">baz.quux@example.com</a>', '\temails');
string = '-_-[[biugs;#fff;#000]Foo]-_-[[i;;;foo]Bar]-_-[[ous;;]Baz]-_-';
assert($.terminal.strip(string) === '-_-Foo-_-Bar-_-Baz-_-', '$.terminal.strip');
string = '[[bui;#fff;]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim et est porttitor semper at vitae augue. Proin at nulla at dui mattis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem convallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare, tellus] est [[b;;#f00]consequat nunc, quis blandit elit odio eu arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidunt orci id commodo. Aliquam] non magna quis [[i;;]tortor malesuada aliquam] eget ut lacus. Nam ut vestibulum est. Praesent volutpat tellus in eros dapibus elementum. Nam laoreet risus non nulla mollis ac luctus [[ub;#fff;]felis dapibus. Pellentesque mattis elementum augue non sollicitudin. Nullam lobortis fermentum elit ac mollis. Nam ac varius risus. Cras faucibus euismod nulla, ac auctor diam rutrum sit amet. Nulla vel odio erat], ac mattis enim.';
term.echo('$.terminal.split_equal');
var cols = [10, 40, 60, 400];
for (var i=cols.length; i--;) {
    var lines = $.terminal.split_equal(string, cols[i]);
    var success = true;
    for (var j=0; j<lines.length; ++j) {
        if ($.terminal.strip(lines[j]).length > cols[i]) {
            success = false;
            break;
        }
    }
    assert(success, '\tsplit ' + cols[i]);
}
