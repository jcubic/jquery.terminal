# 1.4.3
* don't execute keypress callback when terminal is disabled (reported by @artursOs)
* fix android (input event was not bind)
* disable keypress when you press CTRL+key and caps-lock is on (bug in firefox reported by @artursOs)

## 1.4.2
* fix context menu pasting and pasting images when terminal not in focus (thanks to Alex Molchanov
  for reporing a bug)

## 1.4.1
* add rel="noopener" to all links
* remove anonymous function name that was duplicating parameter with the same name that was causing error
  in PhantomJS (thanks to @rteshnizi for bug report)

## 1.4.0
### Features
* add paste using context menu
### Bugs
* fix recursive exception when `finalize` echo function throw exception
* fix underline animation
* fix `wordAutocomplete` and add `completionEscape` option (issue reported by Quentin Barrand)
* improve parsing commands (it now convert "foo"bar'baz' to foobarbaz like bash)
* fix normalize and substring
* remove empty formatting in normalize function

## 1.3.1
* fix cols/rows that was causing signature to not show

## 1.3.0
### Feateres
* paste of images (using `echo`) in browsers that support clipboard event
* add `args_quotes` to `parse_/split_ command` api utilities
* add `IntersectionObserver` to add resizer and call resize (not all browser support it,
  polyfill exists)
* add `MutationObserver` to detect when terminal is added/removed from DOM and
  call `IntersectionObserver` when added
* new API utiltites `normalize`, `substring`, `unclosed_strings` and helper `iterate_formatting`
* add default formatter that handle nested formatting
* when using rpc or object interpreter it will throw exception when there are unclosed strings
* element resizer (as jQuery plugin) that work inside iframe
### Bugs
* remove `onPop` event from main interpreter (with null as next)
* mousewheel work without jQuery mousewheel and fix jumps of text
* fix number of rows after adding underline animation
* fix outputLimit
* fix calculation of cols and rows
* strings object are not longer saved in variable on terminal creation so you can
  change it dynamically after terminal is created (use command to change language)

## 1.2.0
### Features
* make terminal accessible to screen readers:
  * terminal focus using tab key (we can't blur on tab keybecause it's used
    to enter tab character or for completion)
  * make command line in cmd plugin hidden from screen readers
  * add role="log" to terminal-output and hide echo command, so result of command
    are read by screen reader but not command that user typed and prompt

## 1.1.4
* fix size with css var with underline animation
* fix minified css (`cssnano` was removing unused animations)

## 1.1.3
* fix click to change position when command have newlines

## 1.1.2
* from pauseEvents option form cmd plugin - it always execute keyboard events

# 1.1.1
* don't fire `keymap` when terminal paused
* fix delete in IE11
* restore order of keymap/keydown - keydown is executed first

## 1.1.0
* fix CMD+V on MacOS chrome
* add stay option to insert same as in cmd plugin
* add option `pauseEvents` - default set to true
* fix exception when calling purge more then once
* fix `history: false` option
* `keymap` have priority over `keydown` so you can overwrite with CTRL+D `keymap` function

## 1.0.15
* fix `echo` command when press tab twice and there are more then one completion
* fix CTRL+D when paused (it now resume the interpreter)
* focus don't enable terminal when paused (it was hidden by you could enter text)

## 1.0.14
* fix moving of the content on focus/blur when command line at the bottom
* don't move cursor on click when focusing
* throw exception about key property polyfill on init of cmd plugin

## 1.0.12
* fix for Android/Chrome that have unidentified as key property for single character keys
* fix entering text in the middle on Android/Chrome
* fix backspace on Android/Chrome/SwiftKey
* fix cursor position when click on word completion on Android

## 1.0.11
* fix dead keys logic (for special keys that don't trigger keypress like delete)

## 1.0.9/10
* fix dead_keys logic (when keypress after special keys like arrows)

## 1.0.8
* fix paste in IE and Edge

## 1.0.7
* fix `exec` when `pause` called in `onInit`
* fix reverse search
* fix 3 argument in completion error
* fix login from hash for async JSON-RPC
* fix `focus(false)`/`disable` in `exec` from hash
* fix regression of pasting in MacOS
* scroll to bottom in insert method
* remove default extra property from interpreter (all properties are saved in interperter)
  and make main options extra pass to intepterer not using extra property
* fix completion when text have spaces (escaped or inside quotes)
* fix dead keys on MacOSX (testing shortcuts now require keydown and keypress events)

## 1.0.6
* fix AltGr on non US keyboard layouts

## 1.0.5
* fix CTRL+D to delete forward one character
* don't use user agent sniffing to get scroll element if terminal attached to body
* fix & on French layout

## 1.0.3/4
* fix keypress with key polyfill

## 1.0.2
* fix CTRL+V in Firefox and IE
* fix issue in jQuery >= 3.0
* fix space, backspace, resize and arrows in IE
* fix middle mouse paste on GNU/Linux

## 1.0.1
* fix signature

## 1.0.0

### FEATURES:
* copy to system clipboard when copy to kill area
* simplify changing of terminal colors using css variables
* always export history and import when importHistory option is true
* add bar and underline cursor animations and a way to enable it with single css variable
* recalcualate `cols` and `rows` on terminal resize (not only window)
* `request`/`response` and `onPush`/`onPop` callbacks
* all callbacks have terminal as `this` (terminal in parameter stay the same)
* add option softPause to control pause visible option - it don't hide the prompt when set to true
* add wordAutocomplete option (default true)
* add complete and `before_cursor` api methods and use it for autocomplete
* formatting for command line (you can't type formatting but you can use $.terminal.formatters to
* format command you're writing)
* new option formatters for echo (error method by default disable formatters)
* interpeter and terminal accept extra option that can be use in onPop or onPush
* add `keymap` option to cmd, terminal and interpreter where you can add shortcuts
* clicking on character, in cmd plugin, move cursor to that character

### BUGS:
* fix width calculation with scrollbar visible
* fix exception in Firefox throw by setSelectionRange in caret plugin
* make `echo` sync when `echo` string or function (flush didn't work on codepen)
* fix `onCommandChange` callback on backspace
* Don't echo extended commands on resize
* use `JSON.parse` to process strings when parsing command line
* fix rpc in array when there are no system.describe
* call exeptionHandler on every exception (even iternal)
* fix echo resolved content when interpreter return a promise
* fix for valid `/[/]/g` regex
* fix pushing JSON-RPC intepreter
* fix selection in IE
* clear selection when click anywhere in the terminal
* fix removing global events on terminal destroy
* don't execute javascript file when fetching line that trigger exception in browser that have
  fileName in exception (like Firfox)

### BREAKING CHANGES:
* completion function now have two arguments string and callback and terminal is in this
* removed `setInterpreter`, `parseArguments`, `splitArguments`, `parseCommand` and `splitCommand`
* if you execute keydown event manualy to trigger terminal/cmd shortcuts you need to pass key
  property with key name (see spec/terminalSpec.js file)

## 0.11.23
* add `scrollBottomOffset` option

## 0.11.22
* scroll to bottom of the terminal when option scrollOnEcho is set to false but the terminal is
  at the bottom
* add new api methods `is_bottom` and `scroll_to_bottom`

## 0.11.21
* don't scroll to terminal (using caret plugin) when it's disabled

## 0.11.20
* don't convert links to formatting when raw option is true

## 0.11.19
* fix getting data from local storage
* remove spell check and auto capitalize from textarea

## 0.11.18
* fix input method

## 0.11.17
* fix `echo` when line is short and have newlines

## 0.11.16
* add versioned files to npmignore
* add global and echo option wrap to disable long line wrapping
* don't send warning when mime for JSON-RPC is text/json

## 0.11.15
* replace `json_stringify` with `JSON.stringify`

## 0.11.14
* fix focus on desktop

## 0.11.13
* allow only memory storage with memory option set to true

## 0.11.12
* fix focus on mobile

## 0.11.11
* fix do not enable the terminal on click if it's frozen

## 0.11.10
* fix focus on click

## 0.11.9
* fix `outputLimit` option

## 0.11.8
* add `scrollOnEcho` option

## 0.11.7
* fix `History::last`

## 0.11.6
* fix `flush`
* new API method `$.terminal.last_id`

## 0.11.5
* fix focus on Android

## 0.11.4
* allow to change `completion` using option API method

## 0.11.3
* add `echoCommand` option

## 0.11.2
* allow to select text using double click

## 0.11.1
* fix `exec` login from hash
* allow to pause with visible command line
* new api method `clear_history_state`

## 0.11.0
* fix default prompt for push
* add `word-wrap: break-word` for cases when echo html that have long lines
* fix `login` function as setting when used with JSON-RPC
* add help command to JSON-RPC when there is `system.describe`
* fix `exec` array and delayed commands (when you `exec` and don't wait for promise
  to resolve)
* fix double cursor in terminals when calling resume on disabled terminal
* fix calling `login` after pop from login
* add `infiniteLogin` option to push
* fix `exec` after init when used with JSON-RPC with `system.describe`
* make `set_interpreter` return terminal object
* `logout` when `onBeforeLogin` return false
* fix backspace in Vivaldi browser by keeping focus in textarea for all browsers
* new API method `last_index`
* alow to remove the line by passing null as replacement to update function
* fix number of characters per line
* fix paste on MacOSX

## 0.10.12
* fix css animation of blinking in minified file

## 0.10.11
* fix check arity for nested object; throw error when calling `logout` in `login`

## 0.10.10
* escape brackets while echo completion strings

## 0.10.9
* fix issue with jQuery Timers when page included another jQuery after initialization

## 0.10.8
* add mangle option to uglifyjs

## 0.10.7
* fix if interpreter is an array and have function

## 0.10.6
* fix overwriting of `exit` and `clear` commands

## 0.10.5
* prevent infinite loop in `terminal::active` when no terminal

## 0.10.4
* change -min to .min in minfied versions of files

## 0.10.3
* make npm happy about version

## 0.10.2
* Add minified css file

## 0.10.1
* fix url regex for formatting

## 0.10.0
* keepWords option to echo and words parameter in `split_equal`
* fix `login` for nested intepreters
* fix `destroy` of `cmd` plugin
* fix saving commands in hash
* allow to disable completion in nested interpreter
* change position of cursor in reverse history search
* fix pasting in Firefox
* `exec` is adding command to history
* fix execHash in FireFox
* testsing terminal and `cmd` plugin + call from command line
* fix `exec` for nested login rpc command
* fix `exec` from hash if commands use pause/resume
* fix `exec` for build in commands
* fix other various `exec` from hash issues
* fix local `logout` and `login` commands
* `mousewheel` and `resize` options for interpreter
* use MIT license
* `onExport` and `onImport` events

## 0.9.3
* change `settings` to method
* fix `process_commands` and escape_regex
* fix `login` from hash
* fix raw `echo`
* don't print empty string after removing extended commands strings
* fix `history_state` method

## 0.9.2
* don't change command line history if ctrl key is pressed
* fix middle mouse copy on GNU/Linux
* fix resize issue

## 0.9.1
* freeze and frozen API methods that disable/enable terminal that can't be enabled by click

## 0.9.0
* use url hash to store terminal session
* fix `export/import`
* focus/blur on Window focus/blur
* allow to change mask char for passwords
* fix space after completed command and in ALT+D
* class .command in div created by echo command, and error class in error function
* CSS selection is now one solid color, also support h1..h6, tables and pre tags
* fix ANSI Formatting bug
* regex as History Filter
* custom Formatters
* `raw` and `globalToken` options
* fix encoding entites
* allow to echo jQuery promise
* `exec` return promise, `exec` with array of commands
* auto `resume/pause` if user code return promise
* mobile (tested on Android) - users report that it don't work - need testing
* functions splitCommand, parseCommand, splitArguments, parseArguments changed
  to kebab case, but the old functions are kept for backward compatibility
* new API method `read` (wrapper over `push`), `autologin` and `update`
* extended commands with syntax `[{   }]`

## 0.8.8
* fix 2 json rpc bugs

## 0.8.7
* fix processing command function

## 0.8.6
* one space after fully completed command

## 0.8.5
* all regex for formatting case insensitive

## 0.8.4
* fix redraw lines on `import_view`, fix calculating rows

## 0.8.3
* fix `completion` in nested interpreters
* `login` option in push
* remove pause/resume from login
* fix parsing RegExes
* fix display text with more then limit lines in one echo

## 0.8.2
* add `Terminal::exception` function

## 0.8.1
* fix `login/logout`

## 0.8.0
* CTRL+L clear terminal
* Shift+Enter insert newline
* remove `tabcompletion` option (now `completion` can be true, array or function)
* add `onRPCError` and `exceptionHandler` callbacks
* interpreter can be an array
* ignoreSystemDescribe option
* handle invalid JSON-RPC
* CSS style for standalone cmd plugin
* using CSS3 Animation for blinking if supported
* fix `[0m`
* better error handling (all messages are in `$.terminal.defaults.strings`)
* named colors for terminal formatting
* expose `settings` and `login` function
* more tools in `$.terminal`
* paste kill text with CTRL+Y
* paste text from selection using middle mouse button
* fix login, history and exec
* disable few things when in login function
* all Strings are in $.terminal.defaults.strings
* more functions in $.terminal object

## 0.7.12
* fix terminal when start as invisible, rest property to parseCommand

## 0.7.11
* fix last history command

## 0.7.10
* fix reverse search

## 0.7.9
* Don't show version when use source file

## 0.7.8
* Allow to call `$.terminal.active()` in `prompt`

## 0.7.7
* fix long line wrap on Init, don't call `termina::resize` on init

## 0.7.6
* fix small errors and typos

## 0.7.5
* fix `flush`, add option `linksNoReferer`

## 0.7.4
* fix interpreter when there is not `system.describe` in JSON-RPC
* add method `flush` and fix refresh

## 0.7.3
* add ANSI 256 (8bit) formatting from Xterm
* fix Regexes
* add ntroff formatting support (output from man)

## 0.7.2
* fix `purge`, json-rpc, history. Improve json-rpc and add check arity

## 0.7.1
* add tests
* terminal without eval
* fix issue with umpersand (unenclosed entinity) in multiline

## 0.7.0
* add `outputLimit`, add method `destroy`
* add utilities `parseArguments`, `splitArguments`, `parseCommand` and `splitCommand` to `$.terminal`
* allow to overwrite, by user, parsing commands in object as eval
* make `cmd` chainable
* fix command line (interepters) names for localStorage use
* fix Login/Token LocalStorage names
* add method `purge` (that clear localStorage)
* convert escaped hex and octals in double quoted strings as chars
* fix Tilda on Windows
* more ANSI codes
* complete common string on TAB
* fix cancel ajax on CTRL+D when paused

## 0.6.5
* `finalize` and `raw` options in `echo`

## 0.6.4
* fix regexes, CMD+`, CMD+R, CMD+L on Mac, fix Resize if terminal is
  hidden, fix wrap ANSI formatting

## 0.6.3
* fix arguments in automatic JSON-RPC

## 0.6.2
* fix arguments in object as eval, new option processArguments

## 0.6.1
* fix first `echo` (like greetings)

## 0.6
* fix formatting with links and emails and long lines
* history is a list with command as last element
* history have size
* You can type more characters in reverse search if command not found
* `export/import`
* `nResize` event

## 0.5.4
* fix scroll when attaching terminal to body in non Webkit browsers

## 0.5.3
* `level` api function
* restore mask on pop
* click out of terminal remove focus
* CTRL+H CTRL+W
* use selector as default name for the terminal

## 0.5.2
* fix entity in lines
* add data-text attribute to formatting span

## 0.5.1
* function in push
* allow to put braket in formatting (closed with escape)
* print nested object in automatic rpc
* terminal instance in login callback

## 0.5
* tab completion work with callback function
* `push` command allow for objects
* add CTRL+G to cancel Reverse Search

## 0.4.23
* fix Style

## 0.4.21/22
* Small fixes

## 0.4.20
* add `exec`, `greetings`, `onClear`, `onBlur`, `onFocus`, `onTerminalChange`

## 0.4.19
* add support for ANSI terminal formatting
* fix cancelable ajax on
* add CTRL+D
* replace emails with link mailto
* remove formatting processing from command line
* add text glow option to formatting

## 0.4.18
* fix scrollbar, better exceptions in chrome, replace urls with links
* one style for font and color in root `.terminal` class

## 0.4.17
* fix IE formatting issue by adding cross-browser split

## 0.4.16
* add reverse history search on CTRL+R
* fix cancel ajax call on CTRL+D

## 0.4.15
* only one command from multiply commands is added to history
* CTRL+D is handled even if exit is false

## 0.4.14
* terminal don't add space after prompt (prompt need to add this space)
* fix `historyFilter`
* remove `livequery`

## 0.4.12
* `history` return `history` object
* add `historyFilter`
* new event `onCommandChange` that execute `scroll_to_bottom`
* add event `onBeforeLogin`

## 0.4.11
* fix blank lines when echo longer strings

## 0.4.10
* fix long line formatting and linebreak in the middle of formatting

## 0.4.9
* fix wrap first line when prompt contain formatting

## 0.4.8
* fix alt+d and ctrl+u

## 0.4.7
* fix inserting special characters in Webkit on Windows

## 0.4.6
* remove undocumented pipe operator
* refreash prompt on resume

## 0.4.5
* fix line wrapping when text contains tabulations

## 0.4.4
* fix line wrapping with scrollbars

## 0.4.3
* fix JSON-RPC when use without login

## 0.4.2
* fix formatting when text contain empty lines

## 0.4.1
* fix formatting when text contains newline characters

## 0.4
* fix text formating when text splited into more then one line
* you can pass nested objects as first argument
* add tab completion with object passed as first argument

## 0.3.8
* fix cursor manipulation when command contain new line characters

## 0.3.7
* fix function `terminal.login_name`

## 0.3.6
* fix switch between terminals - when terminal is not visible scroll to current terminal

## 0.3.5
* fix scrolling in jQuery 1.6

## 0.3.3
* fixing PAGE UP/DOWN

## 0.3.2
* fixing cursor in long lines

## 0.3.1
* fixing small bugs, speed up resizing

## 0.3
* fix resizing on start and issue with greetings
* add formating strings to set style of text.
* add to `echo` a function which will be called when terminal is resized

## 0.3-RC2
* fix manipulation of long line commands

## 0.3-RC1
* add callbacks and new functions
* you can now overwrite keyboard shortcuts
* resizing recalculates lines length and redraw content
* if you create plugin for elements that are not in the DOM
* and then append it to DOM it's display corectly
* put all dependencies in one file
* Default greetings show terminal signature depending on width of terminal
* use Local Sorage for command line history if posible
* remove access to command line (cmd plugin) and add interface
  to allow interact with it

## 0.2.3.9
* fix append enter character (0x0D) to the command (thanks to marat
  for reporting the bug)

## 0.2.3.8
* update mousewheel plugin which fix scrolling in Opera (Thanks for
  Alexey Dubovtsev for reporting the bug)

## 0.2.3.7
* fix cursor in IE in tilda example

## 0.2.3.6
* fix json serialization in IE

## 0.2.3.5
* fix demos and clipboard textarea transparency in IE

## 0.2.3.4
* fix long lines in command line issue

## 0.2.3.3
* fix Terminal in Internet Exporer

## 0.2.3.2
* fix blank line issue (thanks to Chris Janicki for finding the bug)
* fix CTRL + Arrows scroll on CTRL+V

## 0.2.3.1
* allow CTRL+W CTRL+T

## 0.2.3
* fix for `"(#$%.{"` characters on Opera/Chrome
* add cursor move with CTRL+P, CTRL+N, CTRL+F, CTRL+B which also work in Chrome
  fix Arrow Keys on Chrome (for cursor move and command line history)
* change License to LGPL3.

## 0.2.2
* fix down-arrow/open parentises issue in Opera and Chrome

## 0.2.1
* add support for paste from clipboard with CTRL+V (Copy to
  clipboard is always enabled on websites)
