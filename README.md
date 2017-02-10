```
       __ _____                     ________                              __
      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
           \/              /____/                              version 1.0.5
```
http://terminal.jcubic.pl

[![npm](https://img.shields.io/badge/npm-1.0.5-blue.svg)](https://www.npmjs.com/package/jquery.terminal)
![bower](https://img.shields.io/badge/bower-1.0.5-yellow.svg)
[![Gitter chat](https://badges.gitter.im/jcubic/jquery.terminal.png)](https://gitter.im/jcubic/jquery.terminal)
[![travis](https://travis-ci.org/jcubic/jquery.terminal.svg?branch=master)](https://travis-ci.org/jcubic/jquery.terminal)
[![Coverage Status](https://coveralls.io/repos/github/jcubic/jquery.terminal/badge.svg?branch=master)](https://coveralls.io/github/jcubic/jquery.terminal?branch=master)
[![package quality](http://npm.packagequality.com/shield/jquery.terminal.svg)](http://packagequality.com/#?package=jquery.terminal)


### Summary

jQuery Terminal Emulator is a plugin for creating command line interpreters in
your applications. It can automatically call JSON-RPC service when a user types
commands or you can provide you own function in which you can parse user
commands. It's ideal if you want to provide additional functionality for power
users. It can also be used to debug your application.

### Features:

* You can create an interpreter for your JSON-RPC service with one line
  of code (just use url as first argument).

* Support for authentication (you can provide functions when users enter
  login and password or if you use JSON-RPC it can automatically call
  login function on the server and pass token to all functions)

* Stack of interpreters - you can create commands that trigger additional
  interpreters (eg. you can use couple of JSON-RPC service and run them
  when user type command)

* Command Tree - you can use nested objects. Each command will invoke a
  function, if the value is an object it will create a new interpreter and
  use the function from that object as commands. You can use as many nested
  object/commands as you like. If the value is a string it will create
  JSON-RPC service.

* Support for command line history, it uses Local Storage if possible

* Support for tab completion

* Includes keyboard shortcut from bash like CTRL+A, CTRL+D, CTRL+E etc.

* Multiply terminals on one page (every terminal can have different
  command, it's own authentication function and it's own command history)

* It catches all exceptions and displays error messages in the terminal
  (you can see errors in your javascript and php code in terminal if they
  are in the interpreter function)

### Installation
You can install jQuery Terminal from bower:

```
bower install jquery.terminal
```

or npm:

```
npm install --save jquery.terminal
```

Include jQuery library, you can use cdn from http://jquery.com/download/


Then include js/jquery.terminal-1.0.5.min.js and css/jquery.terminal-1.0.5.css
You can also include js/jquery.mousewheel-min.js

```html
<script src="js/jquery.terminal-1.0.5.min.js"></script>
<script src="js/jquery.mousewheel-min.js"></script>
<link href="css/jquery.terminal-1.0.5.css" rel="stylesheet"/>
```

**NOTE:** From version 1.0.0 if you want to support old browsers or Safari then you'll need to use [key event property polyfill](https://github.com/cvan/keyboardevent-key-polyfill/)

You can also grab the files from CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.0.5/js/jquery.terminal.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.0.5/css/jquery.terminal.min.css" rel="stylesheet"/>
```

or

```html
<script src="https://cdn.jsdelivr.net/jquery.terminal/1.0.5/jquery.terminal.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.terminal/1.0.5/jquery.terminal.min.css">
```

And you're good to go.


### Example of usage

This is code that uses low level function, that gives you full control of the commands,
just pass anything that the user types into a function.

```javascript
jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command) {
        if (command !== '') {
            var result = window.eval(command);
            if (result != undefined) {
                this.echo(String(result));
            }
        }
    }, {
        greetings: 'Javascript Interpreter',
        name: 'js_demo',
        height: 200,
        width: 450,
        prompt: 'js> '
    });
});
```

Here is a higher level call, using an object as an interpreter, By default the terminal will
parse commands that a user types and replace number like strings with real numbers
regex with regexes and process escape characters in double quoted strings.

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
        prompt: 'demo> '
    });
});
```

Command foo will execute json-rpc from foo.php file.

You can create JSON-RPC interpreter with authentication in just one line:

```javascript
$('#term_demo').terminal('service.php', {login: true});
```

More examples [here](http://terminal.jcubic.pl/examples.php). You can also check
[full documentation](http://terminal.jcubic.pl/api_reference.php).


### Contribution

If you want to contribute make sure you modify `js/jquery.terminal-src.js` and `css/jquery.terminal-src.css` files and run `make` and make sure you're on devel branch and create PR to devel brach as well, fixes to examples and README can be made to master. To build the files (it only replace version, add current date in files and run minifiers on css and js) you need to have nodejs and run:

```
npm install
```

to build the files you need to run

```
make
```

You also need to use bash (on Windows you can use git-bash that's get installed when you install git).

Before you create pull request run `make lint`, it will be run by travis, and fix any errors that may show up, the linter used is [eslint](http://eslint.org/). You can find rules for eslint in package.json.

Non tech contrubution are also wellcome, if you find a bug in documentation on the website you can file an issue to [jcubic/jquery.terminal-www](https://github.com/jcubic/jquery.terminal-www).


### Test

If you want to run tests from browser you need to run

```
bower install --dev
```

and open SpecRunner.html file in the browser


To run tests from command line you need to run this commands:

```
npm install
make test
```

(You don't need to run npm again if you did it when buuilding the files)

you can also run test covarage using

```
make cover
```


### License

Licensed under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2011-2017 [Jakub Jankiewicz](http://jcubic.pl)
