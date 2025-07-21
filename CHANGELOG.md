## 2.45.1/2.45.2
### Bugfix
* fix a broken prompt in Brave [#1018](https://github.com/jcubic/jquery.terminal/issues/1018)

## 2.45.0
### Features
* add `id` option that allow to create same terminal using hot reload [#978](https://github.com/jcubic/jquery.terminal/issues/978)
* allow using Object URLs in links [#982](https://github.com/jcubic/jquery.terminal/issues/982)
* experimental `--cols` CSS variable [#956](https://github.com/jcubic/jquery.terminal/issues/956)
* add `terminal::lines()` [#966](https://github.com/jcubic/jquery.terminal/issues/966)
* add small ASCII Art to signature [#972](https://github.com/jcubic/jquery.terminal/issues/972)
* add `termina::output_ready()` [#987](https://github.com/jcubic/jquery.terminal/issues/987) [#1000](https://github.com/jcubic/jquery.terminal/issues/1000)
* add `figlet.js` helper extension
* update terminal::geometry [#995](https://github.com/jcubic/jquery.terminal/issues/995)
### Bugfix
* fix `terminal::login()` when user already authenticated [#980](https://github.com/jcubic/jquery.terminal/issues/980)
* improve mobile support
* ignore empty command in Pipe extension [#984](https://github.com/jcubic/jquery.terminal/issues/984)
* fix processing Hex HTML entities [#992](https://github.com/jcubic/jquery.terminal/issues/992)
* fix returning Terminal instance from interpreter [#994](https://github.com/jcubic/jquery.terminal/issues/994)
* fix removing blank lines when using `import_view()` [#1007](https://github.com/jcubic/jquery.terminal/issues/1007)
* fix fallback interpreter return value [#1008](https://github.com/jcubic/jquery.terminal/issues/1008)
* fix for external terminal style [#1009](https://github.com/jcubic/jquery.terminal/issues/1009)
* fix redraw when echo async function which throws [#998](https://github.com/jcubic/jquery.terminal/issues/998)
* fix browser shorcuts when terminal is paused [#1005](https://github.com/jcubic/jquery.terminal/issues/1005)
* display exception from sync echo function [#997](https://github.com/jcubic/jquery.terminal/issues/997)
* fix text on hover links when background is transparent [#990](https://github.com/jcubic/jquery.terminal/issues/990)
* hide clipboard textarea from selection [#1015](https://github.com/jcubic/jquery.terminal/issues/1015)

## 2.44.1
### Bugfix
* fix errors with form autofill outside of the terminal [#977](https://github.com/jcubic/jquery.terminal/issues/977)

## 2.44.0
### Features
* new API `terminal::animation()` and `terminal::delay()` [#683](https://github.com/jcubic/jquery.terminal/issues/683)
* add images in less now have `terminal-less` class
* add `execHistory` main option and `history` option to `terminal::exec()` [#745](https://github.com/jcubic/jquery.terminal/issues/745)
* add helper `$.terminal.remove_formatter`
* escape xml in `$.terminal.escape_formatting` when xml formatter is used [#973](https://github.com/jcubic/jquery.terminal/issues/973)
### Bugfix
* fix number of rows when using different `--size` [#969](https://github.com/jcubic/jquery.terminal/issues/969)
* fix hidden cursor when using command that change `--size` [#968](https://github.com/jcubic/jquery.terminal/issues/968)
* fix command prop in `export_view()` when in command [#967](https://github.com/jcubic/jquery.terminal/issues/967)
* fix processing images in less [#970](https://github.com/jcubic/jquery.terminal/issues/970)
* fix passing alt and class for image in less
* fix width of images in less when image is bigger than the terminal
* fix line-height of the lines to render less image slices properly
* fix flashing of old prompt after prompt animation [#976](https://github.com/jcubic/jquery.terminal/issues/976)

## 2.43.2
### Bugfix
* fix scroll to bottom when using `terminal::import_view`

## 2.43.1
### Bugfix
* fix height when not using `--rows` [#962](https://github.com/jcubic/jquery.terminal/issues/962)

## 2.43.0
### Breaking
* echo of undefined or Promise that resolve to undefined no longer display string undefined
### Features
* add support for `--rows` CSS custom property [#956](https://github.com/jcubic/jquery.terminal/issues/956)
* add aborting signals [#940](https://github.com/jcubic/jquery.terminal/issues/940)
### Bugfix
* fix CMD update performance issue [#961](https://github.com/jcubic/jquery.terminal/issues/961)
* don't reflow the reflow the cursor on update [#932](https://github.com/jcubic/jquery.terminal/issues/932)
* fix unexpected uncaught exceptions in promises
* fix skip/skip_stop return value and add types
* fix recursive call to echo in renderHandler [#733](https://github.com/jcubic/jquery.terminal/issues/733)

## 2.42.2
### Bugfix
* actual fix for blank lines typing animation [#946](https://github.com/jcubic/jquery.terminal/issues/946)

## 2.42.1
### Bugfix
* fix line wrapping when calling multiple echo `newline:false` [#952](https://github.com/jcubic/jquery.terminal/issues/952)
* fix cursor position when echo `newline:false` fill the line
* fix running typing animation on empty terminal [#950](https://github.com/jcubic/jquery.terminal/issues/950)
* get rid of canvas warning from images in less [#955](https://github.com/jcubic/jquery.terminal/issues/955)
* fix update with newline after echo without it [#954](https://github.com/jcubic/jquery.terminal/issues/954)

## 2.42.0
### Features
* add reverse style to formatting and XML [#943](https://github.com/jcubic/jquery.terminal/issues/943)
* add XML formatting targets [#944](https://github.com/jcubic/jquery.terminal/issues/944)
### Bugfix
* fix typing animation on emtpy lines [#946](https://github.com/jcubic/jquery.terminal/issues/946)
* fix skip typing animation [#945](https://github.com/jcubic/jquery.terminal/issues/945)
* fix use of `$.terminal.apply_formatters` with prism

## 2.41.2
### Bugfix
* fix commands in pipe operator with non string arguments
* fix text selection of raw HTML [#939](https://github.com/jcubic/jquery.terminal/issues/939)
* fix resume of exec on auth with sync token

## 2.41.1
### Bugfix
* fix paused terminal when echo broken image
* fix returning String instance from interpreter

## 2.41.0
### Features
* allow to use class and other attributes in style XML tags (like `<bold/>` or `<glow/>`)
* allow usage of String instance in greetings [#936](https://github.com/jcubic/jquery.terminal/issues/936)
### Bugfix
* fix alt image attribute
* fix visible formatting in prompt after animated exec [#938](https://github.com/jcubic/jquery.terminal/issues/938)
* fix visible formatting in prompt during typing animation
* cleanup duplicated attributes from XML formatter output
* fix zoom on mobile (PR by [Riccardo Mura](https://github.com/cowuake)) [#935](https://github.com/jcubic/jquery.terminal/pull/935)

## 2.40.6
### Bugfix
* fix resize of text from long animation after finish

## 2.40.5
### Bugfix
* fix visible prompt during multiline typing animation [#934](https://github.com/jcubic/jquery.terminal/issues/934)

## 2.40.4
### Bugfix
* fix flash of old dynamic prompt on enter [#926](https://github.com/jcubic/jquery.terminal/issues/926)

## 2.40.3
### Bugfix
* fix `new_formatter` to allow usage of XML tags in formatter

## 2.40.2
### Bugfix
* fix usage with libraries that invoke fake click events [#931](https://github.com/jcubic/jquery.terminal/issues/931)

## 2.40.1
### Bugfix
* fix visible formatting in prompt when return string from command [#922](https://github.com/jcubic/jquery.terminal/issues/922)

## 2.40.0
### Features
* don't force any attributes when using xml (`span`, `img`, and `a` tags) [#913](https://github.com/jcubic/jquery.terminal/issues/913)
* alow using attributes in color xml tags [#924](https://github.com/jcubic/jquery.terminal/issues/924)
### Bugfix
* fix init and resize of long prompt [#919](https://github.com/jcubic/jquery.terminal/issues/919)
* fix occasional selecting Accessibility label (about clipboard textarea) in CMD
* fix sync commands and dynamic prompt [#923](https://github.com/jcubic/jquery.terminal/issues/923)
* fix calling `onCommandChange` when command don't change
* fix sequence of animations in echo without newline [#930](https://github.com/jcubic/jquery.terminal/issues/930)
* fix ignoring colors and style when using JSON attributes in formatting

## 2.39.3
### Bugfix
* fix broken full screen terminal height on Desktop

## 2.39.2
### Bugfix
* fix when CSS is loaded after creation of the terminal (mostly for ReactJS)

## 2.39.1
### Bugfix
* fix visible CMD textarea when page use box-shadow

## 2.39.0
### Features
* Add support for jQuery 4.0

## 2.38.0
### Breaking
* `onInit` runs before login
### Features
* add support for BigInt numbers when parsing commands
* add `--line-thickness` CSS variable to cursor animation
* improve performance with long typing animations [#820](https://github.com/jcubic/jquery.terminal/issues/820)
### Bugfix
* fix `\t` characters in ascii_table [#902](https://github.com/jcubic/jquery.terminal/issues/902)
* fix race condition in refresh and flush [#897](https://github.com/jcubic/jquery.terminal/issues/897)
* always execute function prompt after login [#898](https://github.com/jcubic/jquery.terminal/issues/898)
* fix background color in prompt [#906](https://github.com/jcubic/jquery.terminal/issues/906)
* update prism code to match function Prism.highlight [#905](https://github.com/jcubic/jquery.terminal/issues/905)
* fix keepWords during typing animation [#867](https://github.com/jcubic/jquery.terminal/issues/867)
* fix leading spaces during animation [#825](https://github.com/jcubic/jquery.terminal/issues/825)
* fix edge case of of multiple echo with `newline: false` [#878](https://github.com/jcubic/jquery.terminal/issues/878)

## 2.37.2
### Bugfix
* fix for TypeScript from [Antoine](https://github.com/antoineol) ([#896](https://github.com/jcubic/jquery.terminal/pull/896)) and [KiddoV](https://github.com/KiddoV) ([#901](https://github.com/jcubic/jquery.terminal/pull/901))

## 2.37.1
### Bugfix
* fix wrong calculation of characters with custom font [#892](https://github.com/jcubic/jquery.terminal/issues/892)

## 2.37.0
### Features
* add `rpc` interceptor [#883](https://github.com/jcubic/jquery.terminal/issues/883)
* wait for the custom fonts to load [#892](https://github.com/jcubic/jquery.terminal/issues/892)
### Bugfix
* fix CMD wrapping when prompt is empty [#882](https://github.com/jcubic/jquery.terminal/issues/882)
* fix paused terminal when using array as interpreter and RPC without system describe
* fix edge case of disappearing content after refresh [#871](https://github.com/jcubic/jquery.terminal/issues/871)
* fix rendering empty lines prompt and during typing animation [#890](https://github.com/jcubic/jquery.terminal/issues/890)
* fix rendering links in prompt and during typing animation [#891](https://github.com/jcubic/jquery.terminal/issues/891)

## 2.36.0
### Features
* split_equal accept optional object as 3rd argument with two options `trim` and `keepWords`
* add `--padding` CSS Variable [#874](https://github.com/jcubic/jquery.terminal/issues/874)
* add CSS transition to links [#870](https://github.com/jcubic/jquery.terminal/issues/870)
### Bugfix
* fix leading spaces in text wrapping
* fix glitch in typing animation when text have hyphen
* fix regression in cursor animation color [#869](https://github.com/jcubic/jquery.terminal/issues/869)
* fix `term::geometry()` [#873](https://github.com/jcubic/jquery.terminal/issues/873)
* fix types for `term::push()` [#877](https://github.com/jcubic/jquery.terminal/issues/877)

## 2.35.3
### Bugfix
* fix object returned from the interpreter [#857](https://github.com/jcubic/jquery.terminal/issues/857)
* fix greetings that use a callback [#855](https://github.com/jcubic/jquery.terminal/issues/855)
* fix behavior of `onBeforeLogin` [#856](https://github.com/jcubic/jquery.terminal/issues/856)

## 2.35.2
### Bugfix
* fix mobile Chrome and Firefox [#846](https://github.com/jcubic/jquery.terminal/issues/846)

## 2.35.1
* Unpublished because of technical issues

## 2.35.0
### Breaking
* replace `imagePause` with `externalPause`
### Features
* add bulletproof solution for generic selector (`*` or `div`) to overwrite terminal style
* use jsDelivr for emoji that is way faster [#810](https://github.com/jcubic/jquery.terminal/issues/810)
* pause terminal when loading iframes [#816](https://github.com/jcubic/jquery.terminal/issues/816)
* allow to change or remove target and rel tags on links with JSON attributes
* allow using transparent background [#698](https://github.com/jcubic/jquery.terminal/issues/698)
* register CSS properties so you can use CSS Transition on terminal colors [#808](https://github.com/jcubic/jquery.terminal/issues/808)
* add terminal::blur alias [#813](https://github.com/jcubic/jquery.terminal/issues/813)
* allow to change scrollbar color with CSS property
* add `process_formatting` static helper function
* add `FormattingCanvasRenderer` for color animation [#819](https://github.com/jcubic/jquery.terminal/issues/819)
### Bugfix
* fix up/down arrows when moving inside command that has emoji [#608](https://github.com/jcubic/jquery.terminal/issues/608)
* fix pausing when loading images [#807](https://github.com/jcubic/jquery.terminal/issues/807)
* fix scroll to bottom on echo images and iframes
* fix jump to the end of the command when clicking below cmd [#814](https://github.com/jcubic/jquery.terminal/issues/814)
* fix selection overlap previous line
* fix scroll to bottom while animating [#791](https://github.com/jcubic/jquery.terminal/issues/791)
* fix rendering of sixel images [#824](https://github.com/jcubic/jquery.terminal/issues/824)
* fix handling promises in randerHandler
* fix scroll to bottom during animation [#791](https://github.com/jcubic/jquery.terminal/issues/791)
* fix `terminal::is_bottom` when using intersection observer
* fix processing \r in Linux output of unix_formatting

## 2.34.0
### Features
* add `term::get_mask` method [#785](https://github.com/jcubic/jquery.terminal/issues/785)
* add `onReady` event to `term::read` [#779](https://github.com/jcubic/jquery.terminal/issues/779)
* improve performance of typing animation
* add `prefers-reduced-motion` into main CSS
* pause terminal when images are loading [#802](https://github.com/jcubic/jquery.terminal/issues/802)
* allow disable scroll to bottom on resume [#800](https://github.com/jcubic/jquery.terminal/issues/800)
### Bugfix
* fix line wrapping of cmd when using echo: newline [#773](https://github.com/jcubic/jquery.terminal/issues/773)
* fix text selection on echo without newline text
* fix rejected promises from echo [#790](https://github.com/jcubic/jquery.terminal/issues/790)
* improve TypeScript types for typing animation [#794](https://github.com/jcubic/jquery.terminal/issues/794)
* add missing mousewheel typing animation [#795](https://github.com/jcubic/jquery.terminal/issues/795)
* fix iterate formatting over closing bracket [#792](https://github.com/jcubic/jquery.terminal/issues/792)
* fix resolving promise from echo typing animation when previous command was async [#797](https://github.com/jcubic/jquery.terminal/issues/797)
* fix double exception in terminal::destroy
* fix double call to finalize function when echo DOM nodes
* fix `$.terminal.substring` [#792](https://github.com/jcubic/jquery.terminal/issues/792)

## 2.33.3
### Bugfix
* fix newline in minified js file [#780](https://github.com/jcubic/jquery.terminal/issues/780)

## 2.33.2
### Bugfix
* fix scroll to bottom [#777](https://github.com/jcubic/jquery.terminal/issues/777)

## 2.33.1
### Bugfix
* fix padding removed by minifier

## 2.33.0
### Features
* add a color and background attributes to the font tag in the xml formatter
* add `terminal-none` animation
* allow to easily change border-radius on terminal [#766](https://github.com/jcubic/jquery.terminal/issues/766)
* add clear_cache to cmd
### Bugfix
* fix flicker of dynamic prompt on enter [#757](https://github.com/jcubic/jquery.terminal/issues/757)
* fix re-rendering of jQuery/DOM nodes [#759](https://github.com/jcubic/jquery.terminal/issues/759)
* fix regression in less + images
* fix embedding the Terminal inside SVG [#744](https://github.com/jcubic/jquery.terminal/issues/744)
* fix when the login function is not async
* fix calling login_name in dynamic prompt
* fix masking command on typing animation [#770](https://github.com/jcubic/jquery.terminal/issues/770)
* fix selection/click on text that was echo without newline (when prompt is still in same line)
* fix exception when outputLimit is used [#776](https://github.com/jcubic/jquery.terminal/issues/776)
* fix showing links for emails like prompt [#768](https://github.com/jcubic/jquery.terminal/issues/768)
* fix line wrapping when text between formatting have brackets [#772](https://github.com/jcubic/jquery.terminal/issues/772)

## 2.32.1
### Bugfix
* leading spaces with echo + keepWords [#754](https://github.com/jcubic/jquery.terminal/issues/754)
* fix loading hidden terminal

## 2.32.0
### Features
* add insert typing animation
* add `--text-shadow` css variable
* new API method `parse_formatting`
* allow to use terminal style of external element [#731](https://github.com/jcubic/jquery.terminal/issues/731)
### Bugfix
* fix calculating number of rows (affecting less command)
* fix glow with prism and error messages [#729](https://github.com/jcubic/jquery.terminal/issues/729)
* fix prism and typing animation [#726](https://github.com/jcubic/jquery.terminal/issues/726)
* fix various TypeScript typing errors
* fix spacing between lines
* fix wrong mouse cursor on terminal cursor and character before
* fix catastrophic reflow when executing hundreds of echos in a loop
* fix empty lines in prompt (visible when using typing animation) [#734](https://github.com/jcubic/jquery.terminal/issues/734)
* fix trimming whitespace with echo keep_words [#738](https://github.com/jcubic/jquery.terminal/issues/738)
* fix JSON working on processing nested formatting with html entities [#735](https://github.com/jcubic/jquery.terminal/issues/735)
* fix echo array of numbers [#747](https://github.com/jcubic/jquery.terminal/issues/747)
* improve performance when terminal don't have height
* fix partial text (echo without newline) rendering [#751](https://github.com/jcubic/jquery.terminal/issues/751)

## 2.31.1
### Bugfix
* fixing low severity self XSS with potential more security implications [#727](https://github.com/jcubic/jquery.terminal/issues/727)

## 2.31.0
### Breaking
* remove undocumented `echo_command` (that was used by old `echo_newline` extension)
### Features
* scroll to bottom for each line in multiline typing animation
* allow to use `--glow: 1` with default animation
* new API `terminal::enter` same as echo_command but supports animation
* add global option `execAnimationDelay` default - 100
* make execAnimation work only with execHash [#723](https://github.com/jcubic/jquery.terminal/issues/723)
### Bugfix
* fix prompt that return string or promise (in animation and set_prompt) [#724](https://github.com/jcubic/jquery.terminal/issues/724)
* fix formatting in typing animation [#721](https://github.com/jcubic/jquery.terminal/issues/721)
* fix formatting colors and `--glow` [#725](https://github.com/jcubic/jquery.terminal/issues/725)
* fix record stop command being recorded [#719](https://github.com/jcubic/jquery.terminal/issues/719)

## 2.30.2
### Bugfix
* fix animated exec array with sync commands [#722](https://github.com/jcubic/jquery.terminal/issues/722)

## 2.30.1
### Bugfix
* fix record built-in commands in URL hash

## 2.30.0
### Features
* add `span` to xml formatting
* allow to use class attribute in XML formatting (`span`, `link`, and `img`)
* new API methods `clear_buffer()` and `get_output_buffer()` [#717](https://github.com/jcubic/jquery.terminal/issues/717)
### Bugfix
* fix bug on Android with GBoard keyboard [#693](https://github.com/jcubic/jquery.terminal/issues/693)
* fix refresh when scrollbar appear (using `scrollbar-gutter`)
* fix link color to pass WCAG contrast ratio
* remove tabindex attribute on links
* add label to clipboard textarea for a11y
* allow to escape angle brackets in XML formatting [#710](https://github.com/jcubic/jquery.terminal/issues/710)
* fix black line before the image [#708](https://github.com/jcubic/jquery.terminal/issues/708)
* fix scroll to bottom when echo an image [#716](https://github.com/jcubic/jquery.terminal/issues/716)
* fix multiple echo with `!flush && !newline` [#709](https://github.com/jcubic/jquery.terminal/issues/709)
* fix updating hash for long async commands [#703](https://github.com/jcubic/jquery.terminal/issues/703)

## 2.29.5
### Bugfix
* fix empty prompt when no wcwidth is included

## 2.29.4
### Bugfix
* fix empty lines when print single multi-line string

## 2.29.3
### Bugfix
* fix echo raw interfering with echo without newline [#695](https://github.com/jcubic/jquery.terminal/issues/695)
* update hash with proper array if hash is escaped
* invalidate cache and update CMD on `term::refresh()` [#699](https://github.com/jcubic/jquery.terminal/issues/699)
* allow to add horizontal scrollbar with single wrap options [#692](https://github.com/jcubic/jquery.terminal/issues/692)
* handle promise rejection in onInit [#691](https://github.com/jcubic/jquery.terminal/issues/691)

## 2.29.2
### Bugfix
* fix linkify of urls (better url detection)
* fix linkify urls in command line (enable link in cmd)
* fix two bugs with echo without newline (when prompt have 0 width and lines have different length)
* fix applying glow shadow to transparent text
* fix async responsive greetings
* fix multiple echo of async functions and promises mixed with strings
* fix `get_output()` on lines that are promises [#687](https://github.com/jcubic/jquery.terminal/issues/687)
* fix echo newline when one of the values is promise or function
* fix invalid css when partial output is no longer partial
* add padding to terminal size i `term::geometry()` [#686](https://github.com/jcubic/jquery.terminal/issues/686)
* clear extended commands from view when calling `import_view` [#690](https://github.com/jcubic/jquery.terminal/issues/7690)

## 2.29.1
### Bugfix
* remove `all: unset` CSS that was breaking resizing events and visibility of textarea

## 2.29.0
### Breaking
* remove undocumented `<large>`/`<big>`/`<wide>` and add `<font>` tag to XML formatter
### Feature
* add animation to `exec` and `execAnimation` option [#679](https://github.com/jcubic/jquery.terminal/issues/679)
* add warning when calling invoke_key on disabled terminal [#678](https://github.com/jcubic/jquery.terminal/issues/678)
* if interpreter returns a promise and it's animating the terminal will not pause (for exec array)
* allow to use brackets inside extended commands (e.g. JavaScript code to hide commands)
* expose `$.terminal.xml_formatter.tags`
* add `--glow` [conditional hack](https://www.kizu.ru/conditions-for-css-variables/)
### Bugfix
* tweak types for cmd function prompt
* fix broken order of execution in `exec` when using pause/resume
* fix mixing extended commands and terminal formatting
* fix invoking `get_command()` in interpreter (clear command after user action)
* fix parse_command when command have leading spaces [#681](https://github.com/jcubic/jquery.terminal/issues/681)

## 2.28.1
### Bugfix
* fix applying style of text-decoration (e.g. underline)
* fix using custom font in Canvas animations

## 2.28.0
### Breaking
* `nested_formatting` inherit styles by default
### Feature
* add forms extension [#610](https://github.com/jcubic/jquery.terminal/issues/610)
* rewrite xml_formatter and add new tags
* add animation interface [#611](https://github.com/jcubic/jquery.terminal/issues/611)
* use dash `-` as input file to read from STDIN in `from-ansi` executable
* improve auth error message
* add "enter" typing animation with prefix prompt
* allow to render ansi in less correctly (using `ansi` option)
### Bugfix
* fix rest of the extension files in NodeJS (regression since 2.22.0)
* fix inheritance of attributes (including styles) and classes in nested formatting
* fix echo and prompt with animation (using typing options)
* fix empty prompt
* disable keyboard on typing animation
* fix resizing when using default cache [#677](https://github.com/jcubic/jquery.terminal/issues/677)

## 2.27.1
### Bugfix
* fix `from_ansi` and add option `--ansi -a`

## 2.27.0
### Feature
* add CSS and option `ansi` to echo to properly render ANSI art
* add typing animation to set_prompt [#673](https://github.com/jcubic/jquery.terminal/issues/673)
* return promise from `set_prompt` and `echo` when using typing animation
* add `from_ansi` executable [#670](https://github.com/jcubic/jquery.terminal/issues/670)
* new emoji
### Bugfix
* fix bug in cache (when echo same string two times in a row) [#672](https://github.com/jcubic/jquery.terminal/issues/672)
* fix exception when calling term::echo with typing animation
* fix regression in width ([chess demo](https://codepen.io/jcubic/pen/NWxOZQE))
* fix usage in NodeJS (regression since 2.22.0)

## 2.26.0
### Feature
* Better API for prompt typing animation with term::read and term::echo
### Bugfix
* fix return value from JSON-RPC (ignore only null)
* fix missing TypeScript definitions for `typing` API method
* fix multi-line prompt regression
* remove extra space after prompt animation
* fix echo string with newline at the end and with newline == false and refresh
* fix `$.rpc` helper on Ajax error
* add default `useCache` option & TypeScript definition
* fix regression in text selection over prompt with fontawesome (Chrome bug [#1087787](https://bugs.chromium.org/p/chromium/issues/detail?id=1087787#c20))
* fix cutting off underscore in certain sizes of the terminal

## 2.25.1
### Bugfix
* fix wrong auth tokens when using exec to login
* fix exec array for async login
* fix Auth to nested RPC interpreter without system.describe
* don't echo falsy values from RPC

## 2.25.0
### Features
* add new API `$.rpc` for JSON-RPC requests
### Bugfix
* properly handle promise rejection in login
* fix re executing extended commands on resize [#666](https://github.com/jcubic/jquery.terminal/issues/666)
* fix rendering jQuery object with Canvas [#664](https://github.com/jcubic/jquery.terminal/issues/664)
* fix right mouse click on link to not scroll to cursor [#644](https://github.com/jcubic/jquery.terminal/issues/644)

## 2.24.0
### Features
* add `terminal::typing` API method
* add `--font` custom property [#662](https://github.com/jcubic/jquery.terminal/issues/662)
* add alt tag to images from formatting [#661](https://github.com/jcubic/jquery.terminal/issues/661)
* improve command parser [#657](https://github.com/jcubic/jquery.terminal/issues/657)
### Bugfix
* fix TypeScript types for echo with promises [#658](https://github.com/jcubic/jquery.terminal/issues/658)

## 2.23.2
### Bugfix
* fix regression in scroll to view mechanism (that cause scroll up randomly)

## 2.23.1
### Bugfix
* fix reversed class in cmd (e.g. in less command)
* fix hack to reflow the cursor in Firefox from [#654](https://github.com/jcubic/jquery.terminal/issues/654)

## 2.23.0
### Features
* include echo without newline into the core of the library
### Bugfix
* remove unsafe eval (function constructor) that breaks CSP [#647](https://github.com/jcubic/jquery.terminal/issues/647)
* fix up/down arrow when prompt is empty string [651](https://github.com/jcubic/jquery.terminal/issues/651)
* fix prompt containing brackets [#648](https://github.com/jcubic/jquery.terminal/issues/648)
* fix ANSI Art (add saving and restoring cursor using ANSI escape code)
* fix mouse wheel and touch scroll in less when content is smaller than height of the terminal
* fix regression in copy/paste with right click

## 2.22.0
### Features
* make unix formatting and basic tools work in web worker
### Bugfix
* fix scrolling whole page when using mouse wheel in less
* fix some missing cp_437 characters for ANSI Art
* fix usage as bookmarklet on StackOverflow (force css of textarea)

## 2.21.0
### Features
* add `wrap` and `keepWords` option to less [#641](https://github.com/jcubic/jquery.terminal/issues/641)
* add new method `term::geometry` to the API [#637](https://github.com/jcubic/jquery.terminal/issues/637)
### Bugfix
* fix parsing JSON code inside strings [#642](https://github.com/jcubic/jquery.terminal/issues/642)

## 2.20.2
### Bugfix
* fix bold background and default color in Unix formatting (another ANSI artwork issue)
* fix rendering 0x1E in ANSI art
* fix when browser don't have ES6 Map object [#630](https://github.com/jcubic/jquery.terminal/issues/630)
* fix echo_newline extension
* fix handling of blink in ANSI Art
* fix error in prism when calling without options and render flags (e.g.: echo or prompt)
* fix background color for links that have set background using formatting
* fix empty cursor on Windows when copy/paste [#634](https://github.com/jcubic/jquery.terminal/issues/634)

## 2.20.1
### Bugfix
* fix async synchronization of async functions and normal echo
* fix exception when executing empty command with pipe
* fix serialization of commands when using pipe operator and function interpreter
* fix exception in `terminal::destroy`

## 2.20.0
### Breaking
* `set_interpreter` return a promise instead of terminal instance
### Features
* add support for echo async functions [#629](https://github.com/jcubic/jquery.terminal/issues/629)
* allow to run exec using onInit that will use pipe [#603](https://github.com/jcubic/jquery.terminal/issues/603)
### Bugfix
* fix silent error when executing empty command from hash
* with issues with browser that don't support css variables [#630](https://github.com/jcubic/jquery.terminal/issues/630)
* fix exception in IE from formatters [#631](https://github.com/jcubic/jquery.terminal/issues/631)

## 2.19.1/2.19.2
### Bugfix
* fix prism highlighting

## 2.19.0
### Features
* add support blink ANSI escape (unix_formatting)
* new unix formatting API options, `ansiArt` option change behavior of blinking
### Bugfix
* fix prism when page have color set on span
* fix visible textarea when global css set background image
* fix exception `delete_word_forward` (ALT+D) `delete_word_backward` (CTRL+W)
* fix page scrolling on enter when terminal don't have scrollbar
* fix ANSI Art [#622](https://github.com/jcubic/jquery.terminal/issues/622) (unix formatting)
* fix empty echo in CTRL+D [#626](https://github.com/jcubic/jquery.terminal/issues/626)

## 2.18.3
### Bugfix
* fix jumping to cursor position on mobile (with code)

## 2.18.2
### Bugfix
* fix when page use line-height on body

## 2.18.1
### Bugfix
* fix glitches in history navigation (visible when using multiline commands in history)

## 2.18.0
### Features
* new API to use `renderHandler` with update
* new API (`apply_formatters` function option) to pick where processing of formatting should work [#588](https://github.com/jcubic/jquery.terminal/issues/588)
* allow to toggle formatters in prism (enabled by default only for echo and command)
* escape slash in `escape_formatting`/`escape_brackets` [#605](https://github.com/jcubic/jquery.terminal/issues/605)
* add support for rgb(a) and hsl(a) colors [#590](https://github.com/jcubic/jquery.terminal/issues/590)
* unify Firefox and Webkit (chrome) custom scrollbars [#607](https://github.com/jcubic/jquery.terminal/issues/607)
### Bugfix
* fix same cases of wrong calculated size of the character when --size is used [#602](https://github.com/jcubic/jquery.terminal/issues/602)
* add custom scrollbar on Firefox
* fix colors of Webkit scrollbar
* fix `renderHandler` in update
* fix formatting in update - reusing options from echo
* fix normal return string from prompt
* fix pipe symbol inside strings [#606](https://github.com/jcubic/jquery.terminal/issues/606)
* fix spaces in images in less & text selection
* fix regresion in fontawesome icons
* fix inconsistency with emoji and wide characters in terminal and cmd
* fix rounding issue that cause exception in less when rendering images

## 2.17.6
### Bugfix
* fix adding duplicated prism formatters [#573](https://github.com/jcubic/jquery.terminal/issues/573)
* fix inserting emoji using Windows 10 emoji picker
* fix position of textarea in multi line command (probably will affect IME or Emoji picker)
* make jump to bottom on click only when terminal is not enabled [#596](https://github.com/jcubic/jquery.terminal/issues/596)
* fix init cmd plugin without terminal
* fix underscore cut off in Firefox (visible in signature)
* fix combined emoji characters and skin tone variations [#598](https://github.com/jcubic/jquery.terminal/issues/598)
* fix down arrow at when cursor at the end of broken line [#601](https://github.com/jcubic/jquery.terminal/issues/601)
* fix broken keymap inheritance in nested interpreters [#615](https://github.com/jcubic/jquery.terminal/issues/615)

## 2.17.5
### Bugfix
* fix eating last bracket from split_equal [#597](https://github.com/jcubic/jquery.terminal/issues/597)
* fix false positive recursive echo error [#593](https://github.com/jcubic/jquery.terminal/issues/593)

## 2.17.4
### Bugfix
* fix jumping on right click near bottom and/or right edge when terminal is not full screen
* fix double event fire on right mouse click
* fix scrollbar size in Chrome

## 2.17.3
### Bugfix
* fix for font-family wildcard css rule
* fix cursor on scrollbar
* fix broken html with wide characters without formatting
* fix jumping to address bar on CTRL+L [#587](https://github.com/jcubic/jquery.terminal/issues/587)
* fix issue in less when only one image get rendered [#583](https://github.com/jcubic/jquery.terminal/issues/583)
* fix jumping on focus on mobile when terminal content scrolled down [#572](https://github.com/jcubic/jquery.terminal/issues/572)
* fix detecting iPad iOS 13as mobile [#589](https://github.com/jcubic/jquery.terminal/issues/589)
* fix return false from onPaste to disable insert from clipboard
* fix paste in command mode of less plugin [#581](https://github.com/jcubic/jquery.terminal/issues/581)
* fix jumping when click near bottom and/or right edge [#592](https://github.com/jcubic/jquery.terminal/issues/592)

## 2.17.2
### Bugfix
* fix cursor on strings in prism

## 2.17.1
### Bugfix
* fix regressions in text selection, cursor and CSS variables [#584](https://github.com/jcubic/jquery.terminal/issues/584)
* unify selection on font icons (fontawesome) and emoji

## 2.17.0
### Features
* new CTRL+ARROW DOWN/UP shortcuts and ignore the multi line commands (change history)
### Bugfix
* fix ch unit bug for Firefox and IE [#579](https://github.com/jcubic/jquery.terminal/issues/579)
* fix broken emoji [#578](https://github.com/jcubic/jquery.terminal/issues/578)
* fix broken cursor navigation in Firefox [#577](https://github.com/jcubic/jquery.terminal/issues/577)
* fix default cursor color animation on color cmd from formatting (e.g. prism)
* fix font-awesome selection (partial - works only in Firefox)
* fix consistency of data-text attribute and span
* fix issue with split_equal when it swallow the line if the line had bracket at the end
* allow to use .emoji CSS in .raw output
* fix up/down on multi line command navigation when command have brackets and/or wrappings
* fix empty lines after wrapping in CMD when splitted line length == cols
* fix navigating of formatting when stacked formatters are used and one change length [#580](https://github.com/jcubic/jquery.terminal/issues/580)

## 2.16.1
### Bugfix
* fix disappearing cursor when use up down arrow in multi line CMD [#576](https://github.com/jcubic/jquery.terminal/issues/576)
* fix broken color CSS variables [#575](https://github.com/jcubic/jquery.terminal/issues/575)
* fix swallowed escape bracket as input in CMD [#574](https://github.com/jcubic/jquery.terminal/issues/574)

## 2.16.0
### Features
* style of scrollbars in WebKit
* integration with fontawesome icons added using formatting
### Bugfix
* fix version of widget.js

## 2.15.4
### Bugfix
* fix jumping when you scrolled down the div terminal [#565](https://github.com/jcubic/jquery.terminal/issues/565)

## 2.15.3
### Bugfix
* fix broken formatting in prism.js when processing brackets

## 2.15.2
### Bugfix
* fix toggle keyboard on multiple terminals on same page
* fix jumping to prompt on press CTRL+C when terminal scrolled to top
* don't scroll to bottom when click on terminal that already in focus

## 2.15.1
### Bugfix
* fix combination of mobile: focus, selection and touchscroll

## 2.15.0
### Features
* add new API event touchscroll for mobile (use it in less) [#556](https://github.com/jcubic/jquery.terminal/issues/556)
* mobile paste [#458](https://github.com/jcubic/jquery.terminal/issues/458)
* cmd::clip API method used internally, mostly for mobile
### Bugfix
* fix vertical bar cursor animation on empty command line
* fix edge case while splitting the command line with formatting (better fix for [#379](https://github.com/jcubic/jquery.terminal/379))
* fix option parser when using minus or double minus as argument
* fix issue when wcwidth is added and there are no wide characters
* fix prism + wide characters (e.g. Chinese and Japanese inside strings)

## 2.14.1
### Bugfix
* fix empty rows size

## 2.14.0
### Features
* allow to return promise from renderHandler
* allow to extend the ansiParser in unix_formatting
* add a way to to handle Sixel terminal image format [#553](https://github.com/jcubic/jquery.terminal/issues/553)
* improve performance of cmd render when moving cursor
* implement H cursor movement [#553](https://github.com/jcubic/jquery.terminal/issues/553)
* unix formatting ANSI character replacements modes
### Bugfix
* fix click on last line in multiline cmd [#554](https://github.com/jcubic/jquery.terminal/issues/554)
* fix selecting textarea content when selecting cmd
* fix possible loops in renderHandler
* fix parsing image REGEXes in less
* fix cmd cursor up/down with wrapping [#557](https://github.com/jcubic/jquery.terminal/issues/557)
* fix issue with prism (html language) and less
* fix left/right pagination in less, when not all lines are longer then cols
* fix CTRL+ARROWRIGHT [#560](https://github.com/jcubic/jquery.terminal/issues/560)
* fix urls inside formatting

## 2.12.0
### Features
* improve performance
* add cache for formatting and processing lines
* big improvements to less plugin re-rendering (e.g. when scrolling text with keyboard)
* cursor movement in unix formatting (virtual cursor not supported in cmd, because it make no sense) [#553](https://github.com/jcubic/jquery.terminal/issues/553)
### Bugfix
* fix empty lines in less
* fix split_equal with keep works and formatting at the end.
* fix searching inside links in less

## 2.10.1 (released on npm as 2.11.1)
### Bugfix
* fix glow effect of prompt when it don't have formatting
* fix exec commands from echo
* fix echo formatting with newline and bracket at the end
* fix single wide character exception
* fix substring after string when string have bracket at the end [#550](https://github.com/jcubic/jquery.terminal/issues/550)
* fix images & style from formatters inside cmd [#519](https://github.com/jcubic/jquery.terminal/issues/519)

## 2.10.0
### Feature
* improve performance by adding function `$.terminal.partition`
* allow to use force resize `cmd::resize(true)` (to update init command line with emoji)
* add glow style [#549](https://github.com/jcubic/jquery.terminal/issues/549)
### Bugfix
* fix throw/reject in async function/promise [#546](https://github.com/jcubic/jquery.terminal/issues/546)
* allow to return string from greetings function
* fix low level iterate_formatting function to handle html entities properly
* fix spacing of wider characters (Chinese/Japanese) in echo (to match cmd)
* fix jumping on right click [#545](https://github.com/jcubic/jquery.terminal/issues/545)
* fix selection on double click on cmd
* fix parse_options [#547](https://github.com/jcubic/jquery.terminal/issues/547)
* fix style of links with wcwidth [#544](https://github.com/jcubic/jquery.terminal/issues/544)
* fix copy of empty lines in output [#548](https://github.com/jcubic/jquery.terminal/issues/548)


## 2.9.0
### Features
* allow to return a promise from greetings function [#531](https://github.com/jcubic/jquery.terminal/issues/531)
* call onClear before clear and allow to cancel [#527](https://github.com/jcubic/jquery.terminal/issues/527)
* new renderHandler option [#526](https://github.com/jcubic/jquery.terminal/issues/526)
* allow to echo DOM nodes and jQuery objects [#526](https://github.com/jcubic/jquery.terminal/issues/526)
* handle broken images in terminal and less (svg and error message respectively)
* terminal have `terminal-less` class when `less` runs
* pipe extension monkey patch terminal like echo newline, and it allow to use standard interpreter (old API work the same).
### Bugfix
* fix links from formatters in cmd
* fix images from formatters in cmd [#519](https://github.com/jcubic/jquery.terminal/issues/519)
* fix less [#522](https://github.com/jcubic/jquery.terminal/issues/522)
* fix recursive error when echo finalize throwed exception [#524](https://github.com/jcubic/jquery.terminal/issues/524)
* fix prism - xml nested formatting and weird wrapping [#523](https://github.com/jcubic/jquery.terminal/issues/523), [#410](https://github.com/jcubic/jquery.terminal/issues/410)
* limit number of characters in click on exception line [#525](https://github.com/jcubic/jquery.terminal/issues/525)
* fix less search clear on resize [#528](https://github.com/jcubic/jquery.terminal/issues/528)
* fix less search second instance (move one line to bottom)
* don't delay backspace by default on Desktop + fix delay key check [#532](https://github.com/jcubic/jquery.terminal/issues/532)
* fix pipe when argument is pipe in quote `echo "|"`
* fix display_position (click on cmd) when using prism + unix formatting [#533](https://github.com/jcubic/jquery.terminal/issues/533)
* allow path in URL for links and images
* fix multiple issues with less plugin
* few fixes to pipe
* fix echo array after refresh [#540](https://github.com/jcubic/jquery.terminal/issues/540)
* fix apply formatters in update [#543](https://github.com/jcubic/jquery.terminal/issues/543)
* fix pause on login when using callback [#538](https://github.com/jcubic/jquery.terminal/issues/538)

## 2.8.0
### Feature
* new events `onBeforeLogin`, `onAfterLogin`, `onBeforeEcho` and `onAfterEcho`
* inherit of style in nesting formatter (with flag `__inherit__ = true` on `nested_formatting`) [#513](https://github.com/jcubic/jquery.terminal/issues/513)
* image formatting (less with images [#515](https://github.com/jcubic/jquery.terminal/issues/515))
* new `echo_command` API method (for echo_newline default action)
* mobile delete disabled by default + option toggle [#506](https://github.com/jcubic/jquery.terminal/issues/506)
### Bugfix
* add missing `onAfterCommand` and `onBeforeCommand` to d.ts file
* fix Emoji [#514](https://github.com/jcubic/jquery.terminal/issues/514)
* fix nesting with prism formatter

## 2.7.1
### Bugfix
* fix invoking methods by typing it into terminal [#512](https://github.com/jcubic/jquery.terminal/issues/512)
* don't remove extended command when using echo with `exec: false`

## 2.7.0
### Breaking/Feature
* all classes are prefixed with `cmd` or `terminal` except `.token` (PrimsJS internals) and `.emoji` (this may be feature that fix some bugs, that also may break user code - but it's internal html structure and it's not documented as API) [#510](https://github.com/jcubic/jquery.terminal/issues/510)
### Bugfix
* fix issue with space in IE and Edge [#507](https://github.com/jcubic/jquery.terminal/issues/507)
* multiple bracket escaping issues [#505](https://github.com/jcubic/jquery.terminal/issues/505)
* fix paste of images [#505](https://github.com/jcubic/jquery.terminal/issues/503)
* fix xml formatter in Prism (regression) [#410](https://github.com/jcubic/jquery.terminal/issues/410)

## 2.6.3
### Bugfix
* fix mobile keypress invocation when no keypress (Android)
* fix sizing issue with underscores [#501](https://github.com/jcubic/jquery.terminal/issues/501)

## 2.6.2
### Bugfix
* fix CTRL+C when terminal is not in focus (it should bypass enabled flag only when select text is inside terminal) [#499](https://github.com/jcubic/jquery.terminal/issues/499)
* fix keepWord option in echo of last line [#497](https://github.com/jcubic/jquery.terminal/issues/497)
* fix broken formatting in Prism [#496](https://github.com/jcubic/jquery.terminal/issues/496)

## 2.6.1
### Bugfix
* fix sourcemaps
* fix prism + `--size`
* fix echo double slashes
* escape options to `$.terminal.format` (default to `true` - same behavior) to fix previous error

## 2.6.0
### Features
* new option `mobileIngoreAutoSpace` to fix issue on Android when typing keys: `, ) .` (default empty array)
### Bugfix
* fix hold+backspace on command line with whitespace
* fix context menu on Firefox [#494](https://github.com/jcubic/jquery.terminal/issues/494)

## 2.5.2
### Bugfix
* fix CTR+C when inside of single echo output is selected
* fix paste + key on Mac/Chrome [#493](https://github.com/jcubic/jquery.terminal/issues/493)

## 2.5.1
### Bugfix
* fix 1px black space in style of selection after prism token
* additional validate instead of just throw and capture JSON errors in format function (devtools improvement)
* fix typescript types for version 3.3.29 and freeze the version

## 2.5.0
### Features
* Better API option `doubleTabEchoCommand` so you don't need to call `echo_command()` function in `doubleTab`.
* new API `Cmd::column(boolean): number`
* moving cursor up down in multiline command (like in Chrome Dev tools)
### Bugfix
* fix wrong array detection in completion when array passed across iframes
* fix prism.js and emoji.js dependencies when run with webpack
* fix `keepWord` option for echo (`iterate_formatting` function that is called by `split_equal`) [#491](https://github.com/jcubic/jquery.terminal/issues/491)
* fix press key after hold different key [#488](https://github.com/jcubic/jquery.terminal/issues/488)
* fix echo empty line on longer lines (issue only happen in examples page in scheme inside dialog)
* fix for jQuery UI dialog visibility change detection
* fix hidden cursor in FireFox

## 2.4.1
### Bugfix
* show terminal content after it's resized when initially not visible (fix jumping of text)
* fix pipe when using read + echo in first command and read in next
* fix issue with jumping of terminal on keypress [#486](https://github.com/jcubic/jquery.terminal/issues/486)
* fix hold key when key change fast (manifested by jumping to address bar on ALT+D) [#485](https://github.com/jcubic/jquery.terminal/issues/485)
* fix scroll page when terminal don't have scrollbar [#484](https://github.com/jcubic/jquery.terminal/issues/484)
* fix issue with call `.complete(['cd']);` because of default "clear" (moved code outside of `complete`)
* fix Prism formatter when highlighted code have brackets
* fix few async prompt issues including [#474](https://github.com/jcubic/jquery.terminal/issues/474)

## 2.4.0
### Features
* improvements to performance of rendering and navigating longer command lines
* CTRL+C now retain newlines inside cmd and terminal output (modern browsers only)
* more control over server side calls by using invokeMethods option in echo
* warn users when they try to complete commands with newlines and word complete is set
### Bugfix
* fix scrollbar flicker on right click on right/bottom edge of terminal when no scrollbar
* fix text selections on multi line text without line breaks
* fix small bugs in animations (replace all of them with box-shadow)
* debounce HOLD+ARROWS (left/right) so they are usable again
* fix exception when completion characters not safe for regular exception

## 2.3.0
### Features
* add experimental `$.terminal.pipe` function
* allow to return string from onPaste (not only a promise)
* add CTRL+Home and CTRL+End keys + HOME and END move cursor to the end and beginning of the line [#479](https://github.com/jcubic/jquery.terminal/issues/479)
* zoom page when using mousewheel + CTRL key (browser default) [#468](https://github.com/jcubic/jquery.terminal/issues/468)
* allow to set attributes from formatting with filtering options (to prevent unwanted onclick or other attrs by echo untrusted text) [#472](https://github.com/jcubic/jquery.terminal/issues/472)
### Bugfix
* fix selecting whole text of single .cmd line
* fix double call of async prompt with async interpreter [#474](https://github.com/jcubic/jquery.terminal/issues/474)
* fix async + RPC + exec + no system.describe [#475](https://github.com/jcubic/jquery.terminal/issues/475)
* fix describe === false (exception in js and typscript definition)
* don't pause terminal when user code return result of calling terminal::read()
* fix jumping while using up/down arrows [#477](https://github.com/jcubic/jquery.terminal/issues/477) [#478](https://github.com/jcubic/jquery.terminal/issues/478)
* fix issue with echo brackets inside formatting when using unix formatting [#470](https://github.com/jcubic/jquery.terminal/issues/470)
* fix wrong `&quote;` entity in formatting tag data-text attribute (it should be `&quot;`)

## 2.2.0
### Features
* Handle unclosed entities [#462](https://github.com/jcubic/jquery.terminal/issues/462)
### Bugfix
* don't complete default commands as argument [#465](https://github.com/jcubic/jquery.terminal/issues/465)
* don't show links in echo command + format links inside formatting [#464](https://github.com/jcubic/jquery.terminal/issues/464)
* fix calling set_mask in onPop
* fix visibility change when terminal have `position:fixed` [#466](https://github.com/jcubic/jquery.terminal/issues/466)
* echo without argument or with empty string - to create blank line [#467](https://github.com/jcubic/jquery.terminal/issues/467)

## 2.1.2
### Bugfix
* remove bugfix for [#402](https://github.com/jcubic/jquery.terminal/issues/402) that should never land in the code
* fix removing temp terminal (used to calculate char size)

## 2.1.1
### Bugfix
* don't apply emoji css inside .raw class (added by `echo('string', {raw: true})`) [#461](https://github.com/jcubic/jquery.terminal/issues/461)
* fix wrapping when using font-family wildcard css rule

## 2.1.0
### Features
* cursor glow animation
* add invoke_key to cmd
* onPaste event
* integrate emoji into terminal
### Bugfix
* fix wrapping when command have `&` and `;` but it's not entity [#454](https://github.com/jcubic/jquery.terminal/issues/454)
* fix wrapping when css style created using id [#454](https://github.com/jcubic/jquery.terminal/issues/454)
* fix calculating number of characters on init in bare cmd
* fix .inverted class [#457](https://github.com/jcubic/jquery.terminal/issues/457)
* fix background color on selection (when using --color)
* fix hidden bar cursor when command is empty
* fix copy terminal output to clipboard (newlines issue) [#456](https://github.com/jcubic/jquery.terminal/issues/456)
* remove weird space between lines of selection
* fix jumping of cursor with underline animation
* fix selection of command line
* fix error color when --color is used
* fix ANSI art issue [#460](https://github.com/jcubic/jquery.terminal/issues/460)

## 2.0.2
### Bugfix
* fix ansi escapes in unix formatting for sequence `5;1;47m` that fixes rendering ANSI art
* fix cutting of underline from ASCII art
* fix cutting ASCII art underscores in Codepen/Linux/Chromium on GNU/LINUX
* fix ascii_table when text have \r
* fix prism highlighting in echo (terminal rules were stronger than Prism)

## 2.0.1
### Bugfix
* fix focus to textarea or input that was printed using terminal echo function ([reported as question on SO](https://stackoverflow.com/q/52943390/387194))
* fix cutting of bottom part of greetings lines in Firefox
* fix keep focus into cursor feature added in 2.0 (up arrow was causing scroll to top) report in firebase chat
* don't add empty string to history
* fix bottom padding in FireFox
* don't overwrite wildcard selector that change font with wildcard selector (reported by @ovk on gitter)
* fix `return true` in mousewheel it now disable JavaScript scrolling (reported by @ovk on gitter)
* fix size down to `--size: 0.6`

## 2.0.0
### Breaking
* from now on if terminal is added to body it's in fact added to div inside body (the API didn't changed)
  `$('body').terminal().is('body');` will be false
### Features
* new option repeatTimeoutKeys with default of HOLD+BACKSPACE that should have delay when deleting words
* use setTimeout instead of alert to show exception that can be shown in terminal
* allow to move cursor when regex formatter don't change length of the string
* don't style links if they don't have href
* new plugin isFullyInViewport (link to source in comment)
* scroll terminal to always view cursor in multiline command
* add onPositionChange to option to terminal
* add tabindex option to cmd and terminal
### Bugfix
* fix delay when using arrow keys by filtering keys that have delay when hold
* fix skipping lines that have emoji as last character inside formatting
* fix cursor over tab
* fix tracking replace for emoji and extra chars when adding formatting multiple times
* fix inconsistency of cursor on background formatting between Windows and Linux
* fix echo newline as first character of formatting
* fix slash as last character in formatting when generation command line with slash and cursor just after
* fix escape bracket in command line
* fix relative and absolute urls with default `anyLinks: false`
* fix android and iPhone issues [#443](https://github.com/jcubic/jquery.terminal/issues/443) [#414](https://github.com/jcubic/jquery.terminal/issues/414)
* fix ANSI escapes in unix_formatting [#444](https://github.com/jcubic/jquery.terminal/issues/444)
* fix jumping cursor when there are no text before cursor line in Chrome
* fix selection menu in latest Android
* fix wrong number of chars per line when insert called after init and scrollbar appear
* fix missing cursor when init cmd plugin (without calling refresh)
* fix issue with function prompt not updating after resume

## 1.23.2
### Bugfix
* fix too tall cursor (blink included underline)

## 1.23.1
### Bugfix
* fix cursor when terminal is empty

## 1.23.0
### Features
* ES6 iterator helper that iterate over string that handle formatting, emoji and extra chars
### Bugfix
* fix tracking replace in Edge (missing RegExp::flags)
* hide textarea cursor in Edge and IE11
* fix cursor in Edge and almost IE11
* fix calculating prompt length (wrong wrapping because of first line count)
* use `setInterval` as replacement for Intersection Observer when not supported (IE)

## 1.22.6/7
### Bugfix
* fix selection of command line

## 1.22.5
### Bugfix
* fix issue with \r in command line and cursor position [#436](https://github.com/jcubic/jquery.terminal/issues/436)
* fix underline and bar animation after fix for prism
* disable selecting artificial last character in line for cmd
* fix cursor animation on background for toggle animation dynamically

## 1.22.4
### Bugfix
* fix cursor in prism when on token in next line

## 1.22.3
### Bugfix
* reverse css animations so the prompt is visible when you hold key

## 1.22.2
### Bugfix
* persistent function prompt don't render on enable and on init
* fix duplicated line when prompt have more then one line
* `iterate_formatting` to handle emoji like `substring` and `split_equal`

## 1.22.1
### Bugfix
* fix broken jquery.terminal.js because after last change there was no build
* fix invocation in xml_formatting and dterm
* add onCommandChange to defaults file so it's picked up by dterm (update d.ts)

## 1.22.0
### Features
* add sourcemaps to min js and css files [#430](https://github.com/jcubic/jquery.terminal/issues/430)
* new option holdRepeatTimeout - which is number of the delay between keypress repeat when holding key
* selection to change background color based on formatting like in Bash
* embed emoji regex by Mathias Bynens for better emoji detection
* allow to execute extended commands including terminal and cmd methods from formatters
* support for true colors (24bit) in unix formatting [#433](https://github.com/jcubic/jquery.terminal/issues/433)
* expose split_characters in `$.terminal` namespace
* cmd commands option functions to have cmd as this context

### Bugfix
* update typescript definition to new options + minor tweaks to the api
* fix cursor for PrismJS punctuation class
* fix emoji that contain U+FE0F character at the end [#424](https://github.com/jcubic/jquery.terminal/issues/424)
* fix for combine characters
* fix typescript definition for prompt and greetings [#425](https://github.com/jcubic/jquery.terminal/issues/425)
* fix typo in holdTimeout option name
* fix wrapping when command have emoji and combine characters
* fix align tabs when inside cursor line and align with prompt
* fix multiple 8-bit color codes in single ANSI escape
* fix cursor position when on formatting that change color and background
* allow to use login function in set_interpreter

## 1.21.0
### Security
* add option invokeMethods that disable by default executing terminal and cmd methods from echo

### Features
* HOLD keymap modifier + HOLD+[SHIFT]+BACKSPACE/DELETE to delete word before and after the cursor [#420](https://github.com/jcubic/jquery.terminal/issues/420)
* align tabs like in unix terminal [#423](https://github.com/jcubic/jquery.terminal/issues/423)
* `tabs` terminal options change tab length, not only columns/arrays
* add `tabs` option for cmd
* improve performance of display_position (when you click on character in long command that change length)

### Bugfix
* fix &) in scheme prism formatting [#421](https://github.com/jcubic/jquery.terminal/issues/421)
* don't process keys other then enter in reverse search
* fix issue with background in Prismjs css
* insert prism syntax formatter before nested formatting so it work for html if included with unix_formatting
* fix emoji and Unicode surrogate pairs [#422](https://github.com/jcubic/jquery.terminal/issues/422)

## 1.20.5
### Bugfix
* one more fix to position in normal function formatter (prism)

## 1.20.4
### Bugfix
* fix position in normal function formatter (prism)
* fix syntax (prism) function name in developer tools

## 1.20.3
### Bugfix
* fix regression in overtyping [#409](https://github.com/jcubic/jquery.terminal/issues/409)

## 1.20.2
### Bugfix
* escape formatting when using unix formatting in cmd
* fix cursor style while hover over links
* one more fix cursor position

## 1.20.1
### Bugfix
* fix click after line for last line

## 1.20.0
### Security
* anyLinks option to disable anything exception http and ftp (when false - default) - it make possible to insert javascript links, which is potential XSS vulnerability

### Features
* linksNoFollow option (default false)
* add UMD for utility files [#418](https://github.com/jcubic/jquery.terminal/issues/418)

### Bug Fixes
* handling backspaces in unix formatting [#409](https://github.com/jcubic/jquery.terminal/issues/409)
  * handle \r \n \r\n \n\r the same when adding leftovers before backspace in unix formatting
  * fix cursor position when text have tabs found when fixing #409
  * other fixes to backspaces
* fix font change in universal selector [#415](https://github.com/jcubic/jquery.terminal/issues/415)
* fix regression bug in formatters (emoji demo) [#416](https://github.com/jcubic/jquery.terminal/issues/416)
* fix cmd::resize() without args that make number of characters equal to 1 [#413](https://github.com/jcubic/jquery.terminal/issues/413)
* fix click  after line [#419](https://github.com/jcubic/jquery.terminal/issues/419)

## 1.19.1
### Bug Fixes
* fix type definition to match types from @types/jquery [#412](https://github.com/jcubic/jquery.terminal/issues/412)
* fix infinite loop in regex formatter with loop option [#409](https://github.com/jcubic/jquery.terminal/issues/409#issuecomment-407025872)

## 1.19.0
### Features
* add TypeScript definition file
* update formatters API to have a way to return position after replace from function formatter
* regex formatters and `$.tracking_replace` now accept function as replacement
* update unix formatters to use new API so they work with command line
* set exit to false if no login provided

### Bugs
* fix overtyping function [#409](https://github.com/jcubic/jquery.terminal/issues/409)
* remove CR characters only for display
* don't invoke onPosition change when calling position and don't change the value
* fix clearing CR characters that was causing removal of empty lines [#411](https://github.com/jcubic/jquery.terminal/issues/411)


## 1.18.0
### Feature
* looping regex formatters that replace until they don't match the regex
* add tracking_replace to `$.terminal` namespace
* `$.terminal.syntax` helper
* new language for prism: "website" that handle html, javascript and css syntax

### Bugs
* handle formatters that replace backspaces and characters before [#409](https://github.com/jcubic/jquery.terminal/issues/409)
* fix broken < > & with cmd + prism [#410](https://github.com/jcubic/jquery.terminal/issues/410)
* fix background in prism with black background terminal
* remove warning from nested_formatting when if find nested formatting

## 1.17.0
### Features
* add ascii_table utility in separated file
* per user command line history
* add `$.terminal.parse_options` which return same object as yargs parser
* `$.jrpc` helper now return its own created promise instead of `$.ajax`
* add wcwidth as dependency so it will always show wider characters correctly (in browsers will work the same as optional)
* expose terminal exception in `$.terminal` namespace
* new API option doubleTab [#405](https://github.com/jcubic/jquery.terminal/issues/405)

### Bugfix
* disable history in read & login (regression from 1.16.0 history interpreter option)
* fix recursive error on extended commands (but it will only work on exact same commands without trailing white space)
* create copy of Prism for formatter so it can be used with normal html based prism snippets
* double fix: command line when formatter return empty formatting and prism that return empty formatting after `(` and space
* third fix fox jumping on right click
* fix columns method
* fix infinite loop when regex in formatters don't have g flag
* fix parsing escape quotes
* fix split equal to handle brackets when using without formatting
* fix command line wrapping if prompt contain brackets as text [#407](https://github.com/jcubic/jquery.terminal/issues/407)
* insert ^C where cursor was located [#404](https://github.com/jcubic/jquery.terminal/issues/404)
* fix echo crlf (windows line ending) [#408](https://github.com/jcubic/jquery.terminal/issues/408)
* allow to call cmd without arguments
* rename undocumented remove API method to remove_line so you can call jQuery remove
* fix throwing exception when there is error in formatter (it now only show alert)
* fix double exception when exec command throw exception

## 1.16.1
### Bugs
* fix paste/select all when click below .cmd
* second fix to jumping on right click (context menu) [#399](https://github.com/jcubic/jquery.terminal/issues/399)
* change `$.terminal.prism_formatting` to `$.terminal.prism`

## 1.16.0

### Features
* allow to have limited import when export is save and restored from JSON [#393](https://github.com/jcubic/jquery.terminal/issues/393)
* add support for new u and s regex flags when parsing commands
* add less plugin based on the one from leash
* supports for promises returned from completion function
* add prism.js file that include monkey patch for PrismJS library (for syntax highlight) to output terminal formatting
* better read method [#397](https://github.com/jcubic/jquery.terminal/issues/397)
* handle promises returned from login and async login function [#401](https://github.com/jcubic/jquery.terminal/issues/401)
* add history option for push for easy disabling history for new interpreter
* add scrollObject option, so you can use body when terminal is on full screen div without height

### Bugs
* fix resizer in Firefox [#395](https://github.com/jcubic/jquery.terminal/issues/395)
* fix `$.terminal.columns` and echo array [#394](https://github.com/jcubic/jquery.terminal/issues/394)
* fix `$.terminal.columns` for wider characters and terminal formatting
* fix rows() when using --size [#398](https://github.com/jcubic/jquery.terminal/issues/398)
* fix null in JSON hash
* fix jumping on right click (context menu) [#399](https://github.com/jcubic/jquery.terminal/issues/399)
* fix formatting inside brackets [#396](https://github.com/jcubic/jquery.terminal/issues/396)
* fix async interpreter [#400](https://github.com/jcubic/jquery.terminal/issues/400)
* use window resize when terminal added to body


## 1.15.0

### Features
* allow to invoke terminal and cmd methods from extended commands (`[[ terminal::set_prompt(">>> ") ]]`)
* new API method invoke_key that allow to invoke shortcut `terminal.invoke_key('CTRL+L')` will clear the terminal
* shift+backspace now do the same thing as backspace

### Bugs
* fix wider characters in IE [#380](https://github.com/jcubic/jquery.terminal/issues/380)
* fix issue with number of characters when terminal is added to DOM after creation in IE
* fix scrolling on body in Safari
* fix exception when entering JSON with literal strings [#389](https://github.com/jcubic/jquery.terminal/issues/389)
* fix orphaned closing bracket on multiline echo [#390](https://github.com/jcubic/jquery.terminal/issues/390)
* fix whitespace insert after first character after first focus [#391](https://github.com/jcubic/jquery.terminal/issues/391)
* fix open link when click on url from exception

## 1.14.0

### Features
* pass options to formatters and accept option `unixFormattingEscapeBrackets` in `unix_formatting`
  (PR by [Marcel Link](https://github.com/ml1nk))
* improve performance of repaint and layout whole page when changing content of the terminal
* use ch unit for wide characters if browser support it (it have wide support then css variables)
* keymap terminal method and allow to set shortcuts on runtime

### Bugs
* fix newline as first character in formatting [#375](https://github.com/jcubic/jquery.terminal/pull/375).
* fix error when echo undefined (it will echo string undefined since it's converted to string)
* fix first argument to keymap function, it's now keypress event
* fix resizing issue when scrollbar appear/disappear while you type
  [#378](https://github.com/jcubic/jquery.terminal/issues/378)
* fix cut of cursor when command line had full length lines and it was at the end
  [#379](https://github.com/jcubic/jquery.terminal/issues/379)

## 1.12.1
* fix minified css file + fix scrollbar

## 1.12.0

### Features
* default options for cmd plugin
* caseSensitiveSearch option for both terminal and cmd plugins

### Bugfixes
* fix urls ending with slash [#365](https://github.com/jcubic/jquery.terminal/issues/365)
* stringify non string commands in set_command
* fix scrolling of the page, when press space, after you click on the link
* fix scrolling flicker when terminal added to body
* small css fixes for element containers when terminal added to body
* fix for wide characters inside bigger text [#369](https://github.com/jcubic/jquery.terminal/issues/369)
* when clicking on terminal and it already had focus the textarea was blured
  [#370](https://github.com/jcubic/jquery.terminal/issues/370)
* fix parsing empty strings "" or ''
* fix warning from webpack about --char-width without default
  [#371](https://github.com/jcubic/jquery.terminal/issues/371)

## 1.11.4
* handle non string and functions in error the same as in echo
* fix selection for raw output (reported by @ovk)
* hide font resizer so you actually can select text starting from top left

## 1.11.3
* create empty div for function line that return empty string, that was causing issues with update
  [#363](https://github.com/jcubic/jquery.terminal/issues/363)
* set classes from terminal to fake terminal that is used to calculate character size
* don't use length css variable on formatting when length is the same as wcwidth
* css fixes for terminal in jQuery UI dialog (dterm)

## 1.11.2
* fix issue with --char-width == 0 if terminal have display:none
* fix DELETE numpad key on IE
* ignore invalid procedures description in system.describe
* fix font resizer and init resizers when terminal hidden initialy
* fix broken wrapping in new feature of updating divs on resize


## 1.11.1
* fix IE inconsistency in key property for numpad calc keys (reported by @ovk [#362](https://github.com/jcubic/jquery.terminal/issues/362)
* fix completion skipping letters (reported by @ovk [#361](https://github.com/jcubic/jquery.terminal/issues/361))
* fix issue with last character in line beeing closing braket (reported by @arucil [#358](https://github.com/jcubic/jquery.terminal/issues/358))

## 1.11.0
### Features
* update API method accept options 3rd argument
* speed up refresh on resize by checking character size in font resizer (reported by @artursOs)
* change command line num chars on resize + settings.numChars (reported by @artursOs [#353](https://github.com/jcubic/jquery.terminal/issues/353))
* add remove api method that call update(line, null);
* don't call scroll to bottom on resize/refresh/update/remove
* improve scroll_element plugin by using document.scrollingElement if present and cache the value
* resizer plugin use ResizeObserver if defined
* remove fake call to finalize in echo to catch potential error
* silent boolean 3rd argument to cmd::set and 2nd to terminal::set_command
* handy classed to change cursor animation in IE
### Bugs
* don't prevent default scroll when terminal have no scrollbar
* restart cursor animation on keydown (requested by @theMeow on chat)
* don't redraw whole terminal in update api method
* show exception from onAfterRedraw on terminal
* don't show first argument to method in help command when login is used
* allow to call disable/focus(false) from command + fix focus(false) with single terminal
  (reported by Eric Lindgren [#359](https://github.com/jcubic/jquery.terminal/issues/359))
* fix autofocus on init

## 1.10.1
* fix scroll to bottom on scrolling when terminal is disabled (reported by @RomanPerin [#355](https://github.com/jcubic/jquery.terminal/issues/355))

## 1.10.0
### Features
* new api for formatters Array with 2 elements regex and replacement string (it fix issue when formatters change
  length of string - emoji demo)
* normalize IE key property for keymap + always use +SPACEBAR if there is any control key
* cursor text for terminal and cmd
* onEchoCommand callback gets second argument `command`
* cmd keymap api function, along with object and no arguments, accept string as first argument and function as second
* only one exception per callback event
* select all context menu (based on idea from CodeMirror)
### Bugs
* fix cursor in IE and iOS/Safari reported by @RinaVladimyrovna [#350](https://github.com/jcubic/jquery.terminal/issues/350)
* don't apply formatters in echo commands for completion (found by applying completion to emoji demo)
* fix substring and html entity (entering < & > in command line was showing entity not character)
* paste context menu not for img tag to allow to save as
* fix nested formatting (by introducing __meta__ on formatter function that apply the function to whole string)
* fix format_split when text have \\ character before ]
* fix line ending on windows in command line (CRLF)
* fix copy from command line
* fix cursor position when command line have formatting (using formatters)
* fix cursor position when command line have 3 lines
* don't apply formatters for greetings not only for signture (user can use formatting because he control the string)
* fix max call stack exception when error happen in onEchoCommand
* Chinese character occupy 2 characters same as in linux terminal (requirement wcwidth and css variables)
* fix substring and string like '<a' that was breaking command line
* fix newlines in string when do parse/split _command (used by command line)
* fix split equal and command line splitting
* fix exception in keymap when calling original in the one that was overwriten by terminal like CTRL+V (reported by Ravi Teja Mamidipaka [#351](https://github.com/jcubic/jquery.terminal/issues/351))
* not all keymaps had terminal as this context

## 1.9.0
### Features
* new api utils `$.terminal.length` and `$.terminal.columns`
* echo array (resizable in columns that fit the width, using settings.tabs as pad right)
* callback function parseObject that's called on object different then string (on render)
* calling option method with numRows or numChars redraw terminal output (for testing)
* onFlush callback (called when text is rendered on screen in flush method)
* regex helper `$.terminal.formatter` created using Symbols can be use instead of regex
* new option pasteImage (default true) - requested by @ssv1000 [#342](https://github.com/jcubic/jquery.terminal/issues/342)
* CTRL+C cancel command like in bash if no selection - requested by @abhiks19 [#343](https://github.com/jcubic/jquery.terminal/issues/343)
* refresh API method
* new api method display_position in cmd plugin that return corrected position of the cursor if cursor in the middle
  of the word that got replaced by longer or shorter string in formatting function (fix for emoji demo)
### Bugs
* add missing --size default for underline animation
* fix trim of spaces in front of lines when keep words is true
* fix newline in prompt found while [answering question on SO](https://stackoverflow.com/a/46399564/387194)
* fix insert of newline in the middle of the command line if there is "word space word" and you
  press space after space
* fix  infinite loop in `split_equal` with keep words when word is longer than the limit and
  there is space before long word
* fix paste on MacOS - regresion after adding context menu paste (reported by Ravi Teja Mamidipaka [#340](https://github.com/jcubic/jquery.terminal/issues/340))
* fix cursor in textarea in Edge and IE (reported by Tejaswi Rohit Anupindi [#344](https://github.com/jcubic/jquery.terminal/issues/344))
* fix input for Android 4.4 in emulator (tested on saucelabs.com)
* fix selection + css variables (know bug in MS Edge)
* fix apply/call issue that was causing Android 2.3 to crash
* fix context menu on selected text (the selected text was cleared)
* allow to call original terminal keymap for overwrites defined in terminal (not only the ones defined in cmd)
* escape `<` and `>` issue reported by @itsZN [#345](https://github.com/jcubic/jquery.terminal/issues/345)
* fix moving cursor when formatting change size of text (found when creating emoji demo)
  the click was rewritten using span for each character
* fix command line when for wide characters
* don't move the cursor on click when cmd disabled
* fix substring

## 1.8.0
* allow to return promise from prompt + fix promise in echo
* add back context menu paste that was removed by mistake
* make terminal work in Data URI (access to cookies was throwing exception in Chrome)
* fix case insensitive autocomplete when there is single completion
* fix completion error when more then one completion (PR by Anton Vasilev [#337](https://github.com/jcubic/jquery.terminal/pull/337))
* fix artificialy triggered click (reported by Paul Smirnov [#338](https://github.com/jcubic/jquery.terminal/issues/338))
* fix focus issue when you have multiple terminals
* fix css animations
* fix move cursor on click
* fix quick click to focus + CTRL+V (reported by @artursOs [#336](https://github.com/jcubic/jquery.terminal/issues/336))
* fix outputLimit
* fix exception that sometimes happen on mouseup

## 1.7.2
* fix blur when click ouside terminal when element you click is on top of terminal
* this is terminal instance inside echo function
* fix localStorage exception and empty line height while creating terminal from data URI
* refocus when click on terminal (fix for `:focus-within`)

## 1.7.1
* fix blur terminals when open context menu and then click right mouse button (sometimes last terminal didn't
  get disabled)
* fix backspase

## 1.7.0
### Features
* add option caseSensitiveAutocomplete default to true [#332](https://github.com/jcubic/jquery.terminal/issues/332)
* expose Stack/Cycle/History in `$.terminal` so they can be tested
* make `:focus-within .prompt` selector work with terminal (work also on codepen)
### Bugs
* fix jumping of terminal when created one after another and changing the one that have focus in Edge
* fix issue that all terminals was enabled not the last one created
* fix issue that on click next terminal get focused on browsers with touch screen (reported by @itsZN [#330](https://github.com/jcubic/jquery.terminal/issues/330))
* fix missing default keymap in cmd plugin (found on SO by Arnaldo Montoya)
* update dterm to enable terminal when is visible (when open) using IntersectionObserver
* fix issue with focus on click on MacOS (reported by @RomanPerin [#255](https://github.com/jcubic/jquery.terminal/issues/255))
* fix pasting (reported by @artursOs [#331](https://github.com/jcubic/jquery.terminal/issues/331))
* fix unescaped entity error (reported by Nikolai Orekhov [#333](https://github.com/jcubic/jquery.terminal/issues/333))
* fix onFocus and onBlur events
* fix blur textarea on disable

## 1.6.4
* just missed build

## 1.6.3
* fix issue with auto-enable and insert to DOM after terminal was created
* fix issue with space and dead keys (reported by David Peter)

## 1.6.2
* fix altGr+key issue reported by Erik Lilja

## 1.6.1
* don't call encode in escape_formatting (requested by @ovk)

## 1.6.0
### Features
* new API method apply_formatters
* add UMD (requested by @fazelfarajzade)
* add new events: onEchoCommand and onAfterRedraw (requested by @ovk)
### Bugs
* fix issue that formatters where applied to formatting (discovered by issue from @ovk)

## 1.5.3
* fix cursor over entity (mainly &nbsp;) issue reported by @ovk
* fix space scroll page

## 1.5.2
* keep formatting when cursor is over one, issue reported by @Oleg on StackOverflow
* fix jumping prompt when it have newlines

## 1.5.1
* fix autofocus with position: fixes (reported by @ovk)
* fix input method using sogou keyboard on windows (reported by @hnujxm)
* fix long line wrapping and click to move cursor with wider characters like Chinese

## 1.5.0
### Features
* run fake keypress and keydown created in input when not fired by the browser (android)
* improve perfomance by calculating char size only on resize and init (issue reported
  by @artursOs)
* new cmd delegate method `get_position`/`set_position` added to terminal
* resolve promises returned from intrpreter in jQuery 2.x
* allow to use newlines in prompt
* don't rethrow user exception when exceptionHandler is set (mainly for testing that option)
* add option describe that is a string mapping procs from system.describe procs (default "procs")
  it can be "result" or "result.procs" if system.describe is normal JSON-RPC method
### Bugs
* add option to cmd::disable to not blur so it don't hide android keyboard on pause
* don't enable terminal on init on Android
* fix next key after CTRL+V that was triggering input event (reported by @artursOs)
* fix parsing strings
* don't hide virtual keyboard on Android when called pause()
* fix input on Firefox with google keyboard (reported by Filip Wieland)
* disable terminal on resume event in cordova (is the terminal is disabled when
  no virutal keyboard)
* fix moving cursor on click (after multiline command) and the height of the cmd plugin
* fix escape completion (that enabled by default)
* remove hardcoded DemoService from json-rpc system.describe

## 1.4.3
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
* formatting for command line (you can't type formatting but you can use `$.terminal.formatters` to
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
* all Strings are in `$.terminal.defaults.strings`
* more functions in `$.terminal` object

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
