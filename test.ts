/// <reference path="./js/jquery.terminal.d.ts" />

import "jquery";
import "jquery.terminal";

// -----------------------------------------------------------------------------
// :: instance
// -----------------------------------------------------------------------------

$('.term').terminal(function(command, term) {

});
$('.term').terminal(function(command) {

});
$('.term').terminal([function(command, term) {

}]);
$('.term').terminal("foo.php");
$('.term').terminal(["foo.php"]);
var obj_interpreter: JQueryTerminal.ObjectInterpreter = {
    foo: function(...args) {
    },
    bar: function(a, b) {
        return Promise.resolve("foo");
    },
    baz: {
        a: function() {
        },
        b: {
            c: function() {
            }
        }
    }
};
$('.term').terminal([obj_interpreter]);
$('.term').terminal(["foo.php", obj_interpreter]);
$('.term').terminal(["foo.php", obj_interpreter, function(command) {
}]);
// -----------------------------------------------------------------------------
// :: Options
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// :: Methods
// -----------------------------------------------------------------------------
(function() {
    var term = $('.term').terminal();

    // -------------------------------------------------------------------------
    // :: echo
    // -------------------------------------------------------------------------
    term.echo("foo");
    term.echo(["foo", "bar"]);
    term.echo(function() {
        return "foo";
    });
    term.echo(function() {
        return ["foo", "bar"];
    });
    term.echo(Promise.resolve("foo"));
    term.echo(Promise.resolve(["foo"]));
    term.echo(Promise.resolve(function(): string {
        return "foo";
    }));
    term.echo(Promise.resolve(function(): string[] {
        return ["foo"];
    }));
});
