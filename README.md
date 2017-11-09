```
       __ _____                     ________                              __
      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
           \/              /____/                              version 1.10.1
```
http://terminal.jcubic.pl

[![npm](https://img.shields.io/badge/npm-1.10.1-blue.svg)](https://www.npmjs.com/package/jquery.terminal)
![bower](https://img.shields.io/badge/bower-1.10.1-yellow.svg)
[![travis](https://travis-ci.org/jcubic/jquery.terminal.svg?branch=master)](https://travis-ci.org/jcubic/jquery.terminal)
[![Known Vulnerabilities](https://snyk.io/test/npm/jquery.terminal/badge.svg)](https://snyk.io/test/npm/jquery.terminal)
[![Coverage Status](https://coveralls.io/repos/github/jcubic/jquery.terminal/badge.svg?branch=master&da612e1d75fe037566e431fd381c135c)](https://coveralls.io/github/jcubic/jquery.terminal?branch=master)
![downloads](https://img.shields.io/npm/dm/jquery.terminal.svg?style=flat)
[![package quality](http://npm.packagequality.com/shield/jquery.terminal.svg)](http://packagequality.com/#?package=jquery.terminal)


<a href="https://app.codesponsor.io/link/mm9ExaTRnnyn4TH8MFkSL6zG/jcubic/jquery.terminal" rel="nofollow"><img src="https://app.codesponsor.io/embed/mm9ExaTRnnyn4TH8MFkSL6zG/jcubic/jquery.terminal.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

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

Include jQuery library, you can use cdn from http://jquery.com/download/


```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

```


Then include js/jquery.terminal-1.10.1.min.js and css/jquery.terminal-1.10.1.min.css

You can grab the files from CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.10.1/js/jquery.terminal.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery.terminal/1.10.1/css/jquery.terminal.min.css" rel="stylesheet"/>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal@1.10.1/js/jquery.terminal.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery.terminal@1.10.1/css/jquery.terminal.min.css">
```

**NOTE:** From version 1.0.0 if you want to support old browsers then you'll need to use [key event property polyfill](https://rawgit.com/inexorabletash/polyfill/master/keyboard.js). You can check the support for it on [can I use](https://caniuse.com/#feat=keyboardevent-key).

```html
<script src="https://cdn.rawgit.com/inexorabletash/polyfill/master/keyboard.js"></script>
```


You can also install jQuery Terminal using command line, from [bower repository](https://bower.io/):

```
bower install jquery.terminal
```

or [npm repository](https://www.npmjs.com/):

```
npm install jquery.terminal
```

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

### Contributors

If you want to contrubite read [CONTRIBUTING.md](CONTRIBUTING.md) first. Here are project contributors:

<!-- CONTRIBUTORS-START -->
| [<img src="https://avatars1.githubusercontent.com/u/280241?v=4" width="100px;"/><br /><sub>Jakub Jankiewicz</sub>](http://jcubic.pl/me)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=jcubic) | [<img src="https://avatars1.githubusercontent.com/u/1208327?v=4" width="100px;"/><br /><sub>Zuo Qiyang</sub>](http://zuoqy.com)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=kid1412z) | [<img src="https://avatars1.githubusercontent.com/u/6674275?v=4" width="100px;"/><br /><sub>Sébastien Warin</sub>](http://sebastien.warin.fr)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=sebastienwarin) | [<img src="https://avatars2.githubusercontent.com/u/8646106?v=4" width="100px;"/><br /><sub>Christopher John Ryan</sub>](https://github.com/ChrisJohnRyan)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=ChrisJohnRyan) | [<img src="https://avatars3.githubusercontent.com/u/715580?v=4" width="100px;"/><br /><sub>Johan</sub>](https://github.com/johanjordaan)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=johanjordaan) | [<img src="https://avatars0.githubusercontent.com/u/273194?v=4" width="100px;"/><br /><sub>Florian Schäfer</sub>](https://github.com/fschaefer)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=fschaefer) | [<img src="https://avatars0.githubusercontent.com/u/1751242?v=4" width="100px;"/><br /><sub>Ishan Ratnapala</sub>](https://github.com/IshanRatnapala)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=IshanRatnapala) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/375027?v=4" width="100px;"/><br /><sub>Tomasz Ducin</sub>](http://ducin.it)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=ducin) | [<img src="https://avatars1.githubusercontent.com/u/569896?v=4" width="100px;"/><br /><sub>Anton Vasilev</sub>](https://github.com/avdes)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=avdes) | [<img src="https://avatars3.githubusercontent.com/u/336727?v=4" width="100px;"/><br /><sub>finlob</sub>](https://github.com/finlob)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=finlob) | [<img src="https://avatars2.githubusercontent.com/u/9531780?v=4" width="100px;"/><br /><sub>Hasan</sub>](https://github.com/JuanPotato)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=JuanPotato) | [<img src="https://avatars1.githubusercontent.com/u/137852?v=4" width="100px;"/><br /><sub>Hraban Luyat</sub>](https://luyat.com)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=hraban) | [<img src="https://avatars0.githubusercontent.com/u/74179?v=4" width="100px;"/><br /><sub>Martin v. Löwis</sub>](https://github.com/loewis)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=loewis) | [<img src="https://avatars2.githubusercontent.com/u/27475?v=4" width="100px;"/><br /><sub>Mateusz Paprocki</sub>](https://github.com/mattpap)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=mattpap) |
| [<img src="https://avatars2.githubusercontent.com/u/7055377?v=4" width="100px;"/><br /><sub>exit1</sub>](https://github.com/exit1)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=exit1) | [<img src="https://avatars3.githubusercontent.com/u/1263192?v=4" width="100px;"/><br /><sub>Robert Wikman</sub>](https://github.com/rbw0)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=rbw0) | [<img src="https://avatars1.githubusercontent.com/u/139603?v=4" width="100px;"/><br /><sub>Steve Phillips</sub>](https://tryingtobeawesome.com/)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=elimisteve) | [<img src="https://avatars0.githubusercontent.com/u/1833930?v=4" width="100px;"/><br /><sub>Yutong Luo</sub>](https://yutongluo.com)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=yutongluo) | [<img src="https://avatars3.githubusercontent.com/u/1573141?v=4" width="100px;"/><br /><sub>coderaiser</sub>](http://coderaiser.github.io)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=coderaiser) | [<img src="https://avatars2.githubusercontent.com/u/282724?v=4" width="100px;"/><br /><sub>mrkaiser</sub>](https://github.com/mrkaiser)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=mrkaiser) | [<img src="https://avatars2.githubusercontent.com/u/179534?v=4" width="100px;"/><br /><sub>stereobooster</sub>](https://github.com/stereobooster)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=stereobooster) |
| [<img src="https://avatars1.githubusercontent.com/u/588573?v=4" width="100px;"/><br /><sub>Juraj Vitko</sub>](https://github.com/youurayy)<br>[commits](https://github.com/jcubic/jquery.terminal/commits?author=youurayy) |
<!-- CONTRIBUTORS-END -->

### License

Licensed under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2011-2017 [Jakub Jankiewicz](http://jcubic.pl/jakub-jankiewicz)
