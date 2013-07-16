```
       __ _____                     ________                              __
      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
           \/              /____/                              version 0.7.1
```
http://terminal.jcubic.pl

### Summary

JQuery Terminal Emulator is a plugin for creating command line interpreters in
your applications. It can automatically call JSON-RPC service when user type
commands or you can provide you own function in which you can parse user
command. It's ideal if you want to provide additional functionality for power
users. It can also be used to debug your aplication.

### Features:

* You can create interpreter for your JSON-RPC service with one line
  of code.

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

Licensed under [GNU LGPL Version 3 license](http://www.gnu.org/licenses/lgpl.html)

Copyright (c) 2011-2013 [Jakub Jankiewicz](http://jcubic.pl)
