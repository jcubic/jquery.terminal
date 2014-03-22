```
       __ _____                     ________                              __
      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
           \/              /____/                              version 0.8.7
```
http://terminal.jcubic.pl

### Summary

jQuery Terminal Emulator is a plugin for creating command line interpreters in
your applications. It can automatically call JSON-RPC service when a user types
commands or you can provide you own function in which you can parse user
commands. It's ideal if you want to provide additional functionality for power
users. It can also be used to debug your application.

### Features:

* You can create interpreter for your JSON-RPC service with one line
  of code (just use url as first argument).

* Support for authentication (you can provide function when user enter
  login and password or if you use JSON-RPC it can automatically call
  login function on the server and pass token to all functions)

* Stack of interpreters - you can create commands that trigger additional
  interpreters (eg. you can use couple of JSON-RPC service and run them
  when user type command)

* Command Tree - you can use nested objects. Each command will invoke a
  function, if the value is an object it will create new interpreter and
  use function from that object as commands. You can use as much nested
  object/commands as you like. If the value is a string it will create
  JSON-RPC service.

* Support for command line history it use Local Storage if posible

* Support for tab completion

* Include keyboard shortcut from bash like CTRL+A, CTRL+D, CTRL+E etc.

* Multiply terminals on one page (every terminal can have different
  command, it's own authentication function and it's own command history)

* It catch all exceptions and display error messages in terminal
  (you can see errors in your javascript and php code in terminal if they
  are in interpreter function)

### Example of usage (javascript interpreter)

This is code that use low level, that give you full control of the comands,
just pass anything that user type into a function.

```javascript
jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command, term) {
        if (command !== '') {
            var result = window.eval(command);
            if (result != undefined) {
                term.echo(String(result));
            }
        }
    }, {
        greetings: 'Javascript Interpreter',
        name: 'js_demo',
        height: 200,
        width: 450,
        prompt: 'js> '});
});
```

Here is higher level, using object as interpreter, By default terminal will
parse command that user type and replace number like strings with real numbers
regex with regexes nad process escape characters in double quoted strings.
Command foo will execute json-rpc from foo.php file.

```javascript
jQuery(function($, undefined) {
    $('#term_demo').terminal({
        add: function(a, b) {
            this.echo(a + b);
        },
        foo: 'foo.php',
        bar: {
            sub: function(a, b) {
                this.echo(a - b);
            }
        }
    }, {
        height: 200,
        width: 450,
        prompt: 'demo> '});
});
```

You can create JSON-RPC interpreter with authentication with just one line:

```javascript
$('#term_demo').terminal('service.php', {login: true});
```

More examples [here](http://terminal.jcubic.pl/examples.php). You can also check
[full documentation](http://terminal.jcubic.pl/api_reference.php).

Licensed under [GNU LGPL Version 3 license](http://www.gnu.org/licenses/lgpl.html)

Copyright (c) 2011-2014 [Jakub Jankiewicz](http://jcubic.pl)
