/*
 * helper types
 */
type anyFunction = (...args: unknown[]) => unknown;
type StringOrNumber = string | number | null;

type JSONObject = {
  [key: string]: TypeOrArray<StringOrNumber | boolean | JSONObject>
}

type renderHandlerOptions = {
  update?: boolean;
  line?: number;
}

type mapFunction = (key: string, value: anyFunction) => any;
type voidFunction = () => void;

type TypeOrArray<T> = T | T[];
type TypeOrString<T> = T | string;
type TypeOrPromise<T> = T | PromiseLike<T>;

declare module 'jquery.terminal' {
  export namespace JQueryTerminal {
    type interpreterFunction = (this: JQueryTerminal, command: string, term: JQueryTerminal) => any;
    type terminalObjectFunction = (this: JQueryTerminal, ...args: (string | number | RegExp)[]) => TypeOrPromise<simpleEchoValue | void>;
    type Interpreter = string | interpreterFunction | ObjectInterpreter;
    type ObjectInterpreter = {
      [key: string]: ObjectInterpreter | terminalObjectFunction;
    }

    type RegExpReplacementFunction = (...args: string[]) => string;
    type IterateFormattingArgument = {
      count: number,
      index: number,
      formatting: string,
      length: number,
      text: boolean,
      space: number
    };
    type IterateFormattingFunction = (data: IterateFormattingArgument) => void;

    type strings = {
      comletionParameters: string;
      wrongPasswordTryAgain: string;
      wrongPassword: string;
      ajaxAbortError: string;
      wrongArity: string;
      commandNotFound: string;
      oneRPCWithIgnore: string;
      oneInterpreterFunction: string;
      loginFunctionMissing: string;
      noTokenError: string;
      serverResponse: string;
      wrongGreetings: string;
      notWhileLogin: string;
      loginIsNotAFunction: string;
      canExitError: string;
      invalidCompletion: string;
      invalidSelector: string;
      invalidTerminalId: string;
      login: string;
      password: string;
      recursiveCall: string;
      notAString: string;
      redrawError: string;
      invalidStrings: string;
      defunctTerminal: string;
    };

    type ParsedCommand<T> = {
      command: string;
      name: string;
      args: T[];
      args_quotes: string[];
      rest: string;
    };

    type size = {
      width: number,
      height: number
    };
    interface geometry {
      padding: {
        left: number,
        right: number,
        top: number,
        bottom: number
      };
      terminal: size;
      char: size;
      cols: number;
      rows: number;
    }

    type insertOptions = {
      stay?: boolean;
    }

    type readOptions = {
      typing?: boolean;
      delay?: number;
      success?: (result: string) => void;
      cancel?: voidFunction;
    }

    type AnsiColorType = {
      black: string;
      red: string;
      green: string;
      yellow: string;
      blue: string;
      magenta: string;
      cyan: string;
      white: string;
    }

    type TypingAnimations = 'echo' | 'prompt' | 'enter' | 'command';

    type LessArgument = string | ((cols: number, cb: (text: string) => void) => void) | string[];

    type ParsedOptions = {
      _: string[];
      [key: string]: boolean | string | string[];
    };

    type FormatterFunctionOptions = {
      echo: boolean;
      animation: boolean;
      prompt: boolean;
      command: boolean;
      position: number;
    }

    type FormatterRegExpFunction = (...args: string[]) => string;
    type FormaterRegExpReplacement = string | FormatterRegExpFunction;
    type FormatterFunctionPropsInterface = {
      __inherit__?: boolean;
      __warn__?: boolean;
      __meta__?: boolean;
    };
    type FormatterFunction = ((str: string, options?: FormatterFunctionOptions) => (string | [string, number])) & FormatterFunctionPropsInterface;
    type FormatterArrayOptions = {
      loop?: boolean;
      echo?: boolean;
      animation?: boolean;
      command?: boolean;
      prompt?: boolean;
    };

    type Formatter = [RegExp, FormaterRegExpReplacement] | [RegExp, FormaterRegExpReplacement, FormatterArrayOptions] | FormatterFunction;
    type keymapFunctionOptionalArg = (event: JQueryKeyEventObject, original?: keymapFunction) => any;

    type keymapFunction<T = JQueryTerminal> = (this: T, event: JQueryKeyEventObject, original: keymapFunctionOptionalArg) => any;
    type keymapObject<T = JQueryTerminal> = { [key: string]: keymapFunction<T> };
    type keymapObjectOptionalArg = { [key: string]: keymapFunctionOptionalArg };

    type commandsCmdFunction<T = Cmd> = (this: T, command: string) => any;
    type simpleEchoValue = TypeOrArray<string | number> | Element | JQuery<Element>;
    type echoValue = simpleEchoValue | (() => TypeOrPromise<string | string[]>);
    type echoValueOrPromise = TypeOrPromise<simpleEchoValue> | (() => TypeOrPromise<string | string[]>);
    type errorArgument = string | (() => string) | PromiseLike<string>;
    type setStringFunction = (value: string) => void;
    type setEchoValueFunction = (value: echoValueOrPromise) => void;
    type greetingsArg = ((this: JQueryTerminal, setGreeting: setEchoValueFunction) => (void | JQueryTerminal.echoValueOrPromise)) | string | null;
    type cmdPrompt<T = Cmd> = ((this: T, setPrompt: setStringFunction) => void) | string;

    type ExtendedPrompt = ((this: JQueryTerminal, setPrompt: setStringFunction) => (void | PromiseLike<string>)) | string;

    type MouseWheelCallback = (event: MouseEvent, delta: number, self: JQueryTerminal) => boolean | void;
    type TouchScrollCallback = MouseWheelCallback;

    type execOptions = JQueryTerminal.animationOptions & {
      silent?: boolean;
      deferred?: JQuery.Deferred<void>
    };

    type CommonOptions = {
      completion?: Completion;
      keypress?: KeyEventHandler;
      keydown?: KeyEventHandler;
      mousewheel?: MouseWheelCallback;
      touchscroll?: TouchScrollCallback;
      keymap?: keymapObject;
      history?: boolean;
      name?: string;
      prompt?: ExtendedPrompt;
      login?: LoginArgument;

      onFocus?: EventCallback;
      onClear?: EventCallback;
      onBlur?: EventCallback;
      onExit?: EventCallback;
      onPop?: PushPopCallback;
      onTerminalChange?: EventCallback;
      onPush?: PushPopCallback;
      onAfterRedraw?: EventCallback;
      onEchoCommand?: (this: JQueryTerminal, div: JQuery, command: string, term: JQueryTerminal) => void;
      onFlush?: EventCallback;
      onPaste?: (this: JQueryTerminal, value: string) => TypeOrPromise<string | Blob> | void;
      onCommandChange?: (this: JQueryTerminal, command: string, term: JQueryTerminal) => void;
      onPositionChange?: (this: JQueryTerminal, position: number, display_position: number, term: JQueryTerminal) => void;
      onBeforeCommand?: (this: JQueryTerminal, command: string) => (boolean | void);
      onAfterCommand?: (this: JQueryTerminal, command: string) => void;
      onBeforeEcho?: (this: JQueryTerminal, value: echoValue) => (boolean | void);
      onAfterEcho?: (this: JQueryTerminal, value: echoValue) => void;
    };

    type TerminalOptions = CommonOptions & {
      // login events need fixing to work with push
      onBeforeLogout?: (this: JQueryTerminal) => (boolean | void);
      onAfterLogout?: (this: JQueryTerminal) => void;
      onBeforeLogin?: (this: JQueryTerminal, user: string, tokenOrPass: string) => (boolean | void);
      onAfterLogin?: (this: JQueryTerminal, user: string, token: string) => void;

      exit?: boolean;
      clear?: boolean;
      enabled?: boolean;
      maskCHar?: string;
      pipe?: boolean;
      redirects?: {[key:string]: terminalObjectFunction};
      wrap?: boolean;
      checkArity?: boolean;
      invokeMethods?: boolean;
      useCache?: boolean;
      anyLinks?: boolean;
      raw?: boolean;
      allowedAttributes?: Array<RegExp | string>;
      tabindex?: number;
      exceptionHandler?: null | ExceptionHandler;
      pauseEvents?: boolean;
      softPause?: boolean;
      memory?: boolean;
      cancelableAjax?: boolean;
      processArguments?: boolean;
      execAnimation?: boolean;
      linksNoReferrer?: boolean;
      javascriptLinks?: boolean;
      processRPCResponse?: null | processRPCResponseFunction;
      completionEscape?: boolean;
      convertLinks?: boolean;
      errorOnAbort?: boolean;
      unixFormattingEscapeBrackets?: boolean; // provided by unix_formatting
      extra?: any;
      tabs?: number;
      historySize?: number;
      greetings?: greetingsArg;
      scrollObject?: null | JQuery.Selector | HTMLElement | JQuery;
      historyState?: boolean;
      importHistory?: boolean;
      historyFilter?: historyFilter;
      echoCommand?: boolean;
      scrollOnEcho?: boolean;
      outputLimit?: number;
      pasteImage?: boolean;
      scrollBottomOffset?: boolean;
      wordAutocomplete?: boolean;
      caseSensitiveAutocomplete?: boolean;
      caseSensitiveSearch?: boolean;
      clickTimeout?: number;
      holdTimeout?: number;
      holdRepeatTimeout?: number;
      repeatTimeoutKeys?: string[];
      mobileIngoreAutoSpace?: string[];
      request?: RequestResponseCallback;
      response?: RequestResponseCallback;
      describe?: string | false;
      onRPCError?: RPCErrorCallback;
      doubleTab?: DoubleTabFunction;
      doubleTabEchoCommand?: boolean;
      renderHandler?: (this: JQueryTerminal, obj: any, opts: renderHandlerOptions, term: JQueryTerminal) => (void | string | Element | JQuery<Element> | false);
      onAjaxError?: (this: JQueryTerminal, xhr: JQuery.jqXHR, status: string, error: string) => void;
      onInit?: EventCallback;
      autocompleteMenu?: boolean;
      mobileDelete?: boolean;
      strings?: strings;
      height?: number;
    };

    type pushOptions = CommonOptions & {
      infiniteLogin?: boolean;
      onStart?: () => void;
    };

    type historyFilterFunction = (command: string) => boolean;
    type historyFilter = null | RegExp | historyFilterFunction;

    type KeyEventHandler<T = JQueryTerminal> = (this: T, event: JQueryKeyEventObject) => (boolean | void);

    type ExceptionHandler = (this: JQueryTerminal, e: Error | TerminalException, label: string) => void;
    type processRPCResponseFunction = (this: JQueryTerminal, result: JSONObject, term: JQueryTerminal) => void;
    type ObjectWithThenMethod = {
      then: () => any;
    }
    type SetLoginCallback = (token: string) => (void | ObjectWithThenMethod);
    type LoginFunction = (username: string, password: string, cb: SetLoginCallback) => (void | ObjectWithThenMethod);

    type LoginArgument = string | boolean | JQueryTerminal.LoginFunction;

    type Completion = string[] | CompletionFunction | boolean;

    type SetComplationCallback = (complation: string[]) => void;

    type CompletionFunction = (this: JQueryTerminal, str: string, callback: SetComplationCallback) => void;

    type EchoCommandCallback = (command: string) => void;

    // all arguments are optional so you can use $.noop
    type DoubleTabFunction = (this: JQueryTerminal, str: string, matched: string[], echoCmd: () => void) => (void | boolean);

    type RPCErrorCallback = (this: JQueryTerminal, error: any) => void;

    type RequestResponseCallback = (this: JQueryTerminal, xhr: JQuery.jqXHR, json: any, term: JQueryTerminal) => void;

    type EchoEventFunction = (this: JQueryTerminal, div: JQuery<Element>) => void;
    type EventCallback = (this: JQueryTerminal, term: JQueryTerminal) => (void | boolean);

    type formatOptions = {
      linksNoReferrer?: boolean;
      anyLinks?: boolean;
      charWidth?: number;
      linksNoFollow?: boolean;
      allowedAttributes: string[];
      escape: boolean;
    };

    type animationOptions = {
      delay?: number;
      typing: boolean;
    };

    type InterpreterItem = {
      completion: "settings" | JQueryTerminal.Completion;
      history?: boolean;
      // all other interpreters are converted to function
      interpreter: JQueryTerminal.interpreterFunction;
      keydown?: KeyEventHandler<JQueryTerminal>;
      keypress?: KeyEventHandler<JQueryTerminal>;
      mask?: boolean | string;
      infiniteLogin?: boolean;
      prompt: ExtendedPrompt;
    }

    type PushPopCallback = (this: JQueryTerminal, before: JQueryTerminal.InterpreterItem, after: JQueryTerminal.InterpreterItem, term: JQueryTerminal) => void;

    type Lines = Array<{ string: any, options: LineEchoOptions, index: number }>;

    type View = {
      focus: boolean;
      mask: string | boolean;
      prompt?: ExtendedPrompt;
      command: string;
      position: number;
      lines: Lines;
      interpreters?: Stack<InterpreterItem>;
      history: string[];
    }

    type CompleteOptions = {
      word?: boolean;
      echo?: boolean;
      escape?: boolean;
      caseSensitive?: boolean;
      echoCommand?: boolean;
      doubleTab?: DoubleTabFunction;
    }

    type LineEchoOptions = {
      exec: boolean;
      unmount: JQueryTerminal.EchoEventFunction;
      onClear: JQueryTerminal.EchoEventFunction;
      finalize: JQueryTerminal.EchoEventFunction;
      invokeMethods: boolean;
      allowedAttributes: Array<RegExp | string>;
      delay: number;
      ansi: boolean;
      typing: boolean;
      flush: boolean;
      formatters: boolean;
      keepWords: boolean;
      raw: boolean;
      newline: boolean;
    }

    type EchoOptions = {
      flush?: boolean;
      raw?: boolean;
      exec?: boolean;
      invokeMethods?: boolean;
      ansi?: boolean;
      allowedAttributes?: Array<RegExp | string>;
      unmount?: JQueryTerminal.EchoEventFunction;
      onClear?: JQueryTerminal.EchoEventFunction;
      finalize?: JQueryTerminal.EchoEventFunction;
      keepWords?: boolean;
      formatters?: boolean;
      newline?: boolean;
    }


    interface History<T = string> {
      new(name?: string, size?: number, memory?: boolean): History<T>;
      append(item: T): void;
      set(items: T[]): void;
      data(): T[];
      reset(): void;
      last(): any;
      end(): boolean;
      position(): number;
      current(): T;
      next(): T | void;
      previous(): T | void;
      clear(): void;
      enabled(): boolean;
      enable(): void;
      purge(): void;
      disable(): void;
      toggle(value?: boolean): void;
    }

    interface Stack<T> {
      new(init?: T[]): Stack<T>;
      data(): T[];
      map(fn: (item: T, index?: number) => any): any[];
      size(): number;
      pop(): null | T;
      push(): T;
      top(): T;
      clone(): Stack<T>;
    }

    interface Cycle<T> {
      new(...args: T[]): Cycle<T>;
      get(): T[];
      index(): number;
      rotate(): T | void;
      length(): number;
      remove(i: number): void;
      set(item: T): void;
      front(): void | T;
      map(fn: (item: T, index: number) => any): any[];
      forEach(fn: (item: T, index: number) => any): void;
      append(item: T): void;
    }

    type rendererOptions = {
      color?: string;
      background?: string;
      char?: { width: number, height: number };
    }

    type option = string | { width: number, height: number };

    type rendererFunction = () => string[];

    type clearArgs = {
      width?: number;
      height?: number;
      size?: number;
    }

    interface Renderer {
      new(fn: rendererFunction, options: rendererOptions): Renderer;
      option(arg: string | rendererOptions, value?: option): option;
      render(): void;
      line(text: string, x: number, y: number): void;
      clear(options: clearArgs): void;
    }

    interface Animation {
      new(fps?: null | number, renderer?: Renderer): Animation;
      start(term: JQueryTerminal): void;
      stop(): void;
      render(term: JQueryTerminal): string[];
      mount(): void;
      unmount(): void;
    }

    interface FramesAnimation extends Animation {
      new(frames: string[][], fps?: null | number, renderer?: Renderer): FramesAnimation;
    }

    type formStaticTypes = {
      input: 'input',
      password: 'password';
      boolean: 'boolean';
      checkboxes: 'checkboxes';
      radio: 'radio';
    }
    type formTypes = 'input' | 'password' | 'boolean' | 'checkboxes' | 'radio';

    type simpleInput = {
      type?: 'input';
      message?: string;
      prompt?: string;
      name?: string;
    }

    type passwordInput = {
      type?: 'password';
      message?: string;
      prompt?: string;
      name?: string;
    }

    type booleanInput = {
      type?: 'boolean';
      message?: string;
      prompt?: string;
      items?: [RegExp, RegExp];
      name?: string;
    }

    type checkboxesInput = {
      type?: 'checkboxes';
      message?: string;
      items: {[key: string]: any};
      name?: string;
    }

    type radioInput = {
      type?: 'radio';
      message?: string;
      items: {[key: string]: any};
      name?: string;
    }

    type formData = Array<simpleInput | passwordInput | checkboxesInput | radioInput>;
  }

  export interface JQuery<TElement = HTMLElement> {
    terminal(interpreter?: TypeOrArray<JQueryTerminal.Interpreter>, options?: JQueryTerminal.TerminalOptions): JQueryTerminal;
    resizer(arg: TypeOrString<anyFunction>): JQuery;
    cmd(options?: CmdOptions): Cmd;
    text_length(): number;
    caret(pos?: number): number;
    visible(): JQuery;
    hidden(): JQuery;
    // plugins
    less(text: JQueryTerminal.LessArgument, options?: {
      formatters?: boolean,
      wrap?: boolean,
      keepWords?: boolean
    }): JQueryTerminal;
  }

  export interface JQueryStatic {
    omap(object: { [key: string]: anyFunction }, fn: mapFunction): { [key: string]: anyFunction };
    jrpc(url: string, method: string, params: any[], success?: (json: JSONObject, status: string, jqxhr: JQuery.jqXHR) => void, error?: (jqxhr: JQuery.jqXHR, status: string) => void): void;
    terminal: JQueryTerminalStatic;
  }

  export interface JQueryTerminalStatic {
    version: string,
    data: string;
    color_names: string[];
    defaults: {
      formatters: JQueryTerminal.Formatter[],
      strings: JQueryTerminal.strings;
      [key: string]: any;
    };
    History(name?: string, size?: number, memory?: boolean): JQueryTerminal.History<any>;
    Stack(init?: any[]): JQueryTerminal.Stack<any>;
    Cycle(...args: any[]): JQueryTerminal.Cycle<any>;
    valid_color(color: string): boolean;
    unclosed_strings(str: string): boolean;
    escape_regex(str: string): string;
    have_formatting(str: string): boolean;
    is_formatting(str: string): boolean;
    format_split(str: string): string[];
    tracking_replace(str: string, rex: RegExp, replacement: string | JQueryTerminal.RegExpReplacementFunction, position: number): [string, number];
    iterate_formatting(str: string, callback: (data: JSONObject) => void): void;
    substring(str: string, start_index: number, end_index: number): string;
    normalize(str: string): string;
    split_equal(str: string, len: number, keep_words?: boolean): string[];
    amp(str: string): string;
    encode(str: string): string;
    nested_formatting: JQueryTerminal.FormatterFunction;
    escape_formatting(str: string): string;
    /**
     * if options have position it will return [string, display_position]
     */
    apply_formatters(str: string, options: JSONObject): string | [string, number];
    format(str: string, options?: JQueryTerminal.formatOptions): string;
    escape_brackets(str: string): string;
    unescape_brackets(str: string): string;
    length(str: string): number;
    columns(arr: string[], cols: number, space: number): string;
    strip(str: string): string;
    active(): JQueryTerminal | void;
    last_id(): number;
    parse_argument(arg: string, strict?: boolean): number | RegExp | string;
    parse_arguments(str: string): Array<number | RegExp | string>;
    split_arguments(str: string): string[];
    parse_command(str: string): JQueryTerminal.ParsedCommand<number | RegExp | string>;
    split_command(str: string): JQueryTerminal.ParsedCommand<string>;
    parse_options(arg: string | string[], options?: { booleans: string[] }): JQueryTerminal.ParsedOptions;
    parse_formatting(arg: string): string[];
    extended_command(term: JQueryTerminal, str: string): void;
    /**
     * formatter is an object that can be used in RegExp functions
     */
    formatter: any;
    Exception: TerminalException;
    /**
     * plugins
     */
    prism(lang: string, text: string): string;
    prism_formatters: {
      command: boolean,
      animation: boolean,
      echo: boolean,
      prompt: boolean
    },
    syntax(lang: string): void;
    pipe(obj: JQueryTerminal.ObjectInterpreter): JQueryTerminal.interpreterFunction;
    // formatters
    // unix formatting
    overtyping: JQueryTerminal.FormatterFunction;
    from_ansi: JQueryTerminal.FormatterFunction;
    ansi_colors: {
      normal: JQueryTerminal.AnsiColorType;
      faited: JQueryTerminal.AnsiColorType;
      bold: JQueryTerminal.AnsiColorType;
      palette: string[];
    };
    // xml
    xml_formatter: JQueryTerminal.FormatterFunction;
    Renderer: JQueryTerminal.Renderer;
    CanvasRenderer: JQueryTerminal.Renderer;
    Animation: JQueryTerminal.Animation;
    FramesAnimation: JQueryTerminal.FramesAnimation;

    forms: {
      types: JQueryTerminal.formStaticTypes,
      form: (term: JQueryTerminal, data: Array<JQueryTerminal.formData>) => Promise<JQueryTerminal.formData>;
      checkboxes: (term: JQueryTerminal, data: JQueryTerminal.checkboxesInput) => Promise<any[]>;
      radio: (term: JQueryTerminal, data: JQueryTerminal.radioInput) => Promise<any>;
      input: (term: JQueryTerminal, data: JQueryTerminal.simpleInput) => Promise<string>;
      password: (term: JQueryTerminal, data: JQueryTerminal.passwordInput) => Promise<string>;
      boolean: (term: JQueryTerminal, data: JQueryTerminal.booleanInput) => Promise<boolean>;
    };
  }

  export type TerminalException = {
    new(typeOrMessage: string, message?: string, stack?: string): TerminalException;
    message: string;
    type: string;
    stack?: string;
  };

  export type CmdOptions = {
    mask?: string | boolean;
    caseSensitiveSearch?: boolean;
    historySize?: number;
    prompt?: JQueryTerminal.cmdPrompt;
    enabled?: boolean;
    history?: boolean | "memory";
    tabs?: number;
    onPositionChange?: (position: number, display_position: number) => void;
    clickTimeout?: number;
    holdTimeout?: number;
    holdRepeatTimeout?: number;
    mobileIngoreAutoSpace?: string[];
    repeatTimeoutKeys?: string[];
    onPaste?: (this: Cmd, value: string) => TypeOrPromise<string | Blob> | void;
    width?: number;
    historyFilter?: JQueryTerminal.historyFilter;
    commands?: JQueryTerminal.commandsCmdFunction;
    charWidth?: number;
    onCommandChange?: (this: Cmd, command: string) => void;
    name?: string;
    keypress?: JQueryTerminal.KeyEventHandler<Cmd>;
    keydown?: JQueryTerminal.KeyEventHandler<Cmd>;
    tabindex?: number;
    mobileDelete?: boolean;
  }

  type CmdOption = "mask" | "caseSensitiveSearch" | "historySize" | "prompt" | "enabled" |
    "history" | "tabs" | "onPositionChange" | "clickTimeout" | "holdTimeout" | "onPaste" |
    "holdRepeatTimeout" | "repeatTimeoutKeys" | "width" | "historyFilter" | "commands" |
    "charWidth" | "onCommandChange" | "name" | "keypress" | "keydown" | "mobileDelete";

  // we copy methods from jQuery to overwrite it
  // see: https://github.com/Microsoft/TypeScript/issues/978
  export interface Cmd<TElement = HTMLElement> extends JQuery<TElement> {
    option(name: CmdOption, value: any): Cmd;
    option(name: CmdOption): any;
    name(name: string): Cmd;
    name(): string;
    purge(): Cmd;
    history(): JQueryTerminal.History<string>;
    delete(count: number, stay?: boolean): string;
    set(command: string, stay?: boolean, silent?: boolean): Cmd;
    keymap(shortcut: string, callback: JQueryTerminal.keymapFunction<Cmd>): Cmd;
    keymap(shortcut: string): JQueryTerminal.keymapFunctionOptionalArg;
    keymap(arg: JQueryTerminal.keymapObject<Cmd>): Cmd;
    keymap(): JQueryTerminal.keymapObjectOptionalArg;
    insert(value: string, stay?: boolean): Cmd;
    /* jQuery types */
    get(index: number): TElement;
    get(): TElement[];
    get<T extends string>(): T;
    commands(fn: JQueryTerminal.commandsCmdFunction): Cmd;
    commands(): JQueryTerminal.commandsCmdFunction<void>;
    destroy(): Cmd;
    invoke_key(shortcut: string): Cmd;
    column(include_prompt: boolean): number;
    prompt(prompt: JQueryTerminal.cmdPrompt): Cmd;
    prompt(last_render: true): string;
    prompt<T extends JQueryTerminal.cmdPrompt>(): T;
    kill_text(): string;
    position(): JQueryCoordinates;
    position<T extends number>(): number;
    position(value: number, silent?: boolean): Cmd;
    refresh(): Cmd;
    display_position(): number;
    display_position(value: number): Cmd;
    visible(): Cmd;
    //jQuery methods
    show(duration: JQuery.Duration, easing: string, complete: (this: TElement) => void): this;
    show(duration: JQuery.Duration, easing_complete: string | ((this: TElement) => void)): this;
    show(duration_complete_options?: JQuery.Duration | ((this: TElement) => void) | JQuery.EffectsOptions<TElement>): this;
    show(): Cmd;
    // jQuery methods
    resize(handler?: JQuery.TypeEventHandler<TElement, null, TElement, TElement, 'resize'> |
           false): this;
    // jQuery Terminal method
    resize(num_chars?: number): Cmd;
    clear_cache(): Cmd;
    enable(): Cmd;
    isenabled(): boolean;
    disable(focus?: boolean): Cmd;
    mask(mask: boolean | string): Cmd;
    mask<T extends boolean | string>(): T;
  }

  export interface JQueryTerminal<TElement = HTMLElement> extends JQuery<TElement> {
    set_command(command: string): JQueryTerminal;
    id(): number;
    clear(): JQueryTerminal;
    export_view(): JQueryTerminal.View;
    import_view(view: JQueryTerminal.View): JQueryTerminal;
    save_state(command?: string, ignore_hash?: boolean, index?: number): JQueryTerminal;
    exec(command: string, silent?: boolean | JQueryTerminal.execOptions, options?: JQueryTerminal.execOptions): JQuery.Promise<void>;
    autologin(user: string, token: string, silent?: boolean): JQueryTerminal;
    // there is success and error callbacks because we call this function from terminal and auth function can
    // be created by user
    login(auth: JQueryTerminal.LoginFunction, infinite?: boolean, success?: () => void, error?: () => void): JQueryTerminal;
    settings(): any; // we use any because option types have optional values that will throw error when used
    before_cursor(word?: boolean): string;
    complete(commands: string[], options?: JQueryTerminal.CompleteOptions): boolean;
    commands(): JQueryTerminal.interpreterFunction;
    set_interpreter(interpreter: TypeOrArray<JQueryTerminal.Interpreter>, login?: JQueryTerminal.LoginArgument): JQueryTerminal;
    greetings(): JQueryTerminal;
    paused(): boolean;
    pause(): JQueryTerminal;
    resume(): JQueryTerminal;
    signal(): AbortSignal;
    aboort(message?: string): JQueryTerminal;
    cols(): number;
    rows(): number;
    geometry(): JQueryTerminal.geometry;
    history(): JQueryTerminal.History<string>;
    history_state(toggle: boolean): JQueryTerminal;
    clear_history_state(): JQueryTerminal;
    next(selector?: JQuery.Selector): this;
    next(): JQueryTerminal;
    focus(handler?: JQuery.TypeEventHandler<TElement, null, TElement, TElement, 'focus'> | false): this;
    focus(toggle?: boolean, silent?: boolean): JQueryTerminal;
    blur(handler?: JQuery.TypeEventHandler<TElement, null, TElement, TElement, 'blur'> | false):  this;
    blur(silent?: boolean): JQueryTerminal;
    freeze(toggle?: boolean): JQueryTerminal;
    frozen(): boolean;
    enable(silent?: boolean): JQueryTerminal;
    disable(silent?: boolean): JQueryTerminal;
    enabled(): boolean;
    signature(): string;
    version(): string;
    cmd(): Cmd;
    get_command(): string;
    set_command(cmd: string, silent?: boolean): JQueryTerminal;
    set_position(pos: number, relative?: boolean): JQueryTerminal;
    get_position(): number;
    enter(str: string, options: JQueryTerminal.animationOptions): JQuery.Promise<void>;
    enter(str?: string): JQueryTerminal;
    insert(str: string, options: JQueryTerminal.insertOptions & JQueryTerminal.animationOptions): JQuery.Promise<void>;
    insert(str: string, stay?: boolean): JQueryTerminal;
    set_prompt(prompt: JQueryTerminal.ExtendedPrompt, options: JQueryTerminal.animationOptions): JQuery.Promise<void>;
    set_prompt(prompt: JQueryTerminal.ExtendedPrompt): JQueryTerminal;
    get_prompt<T extends JQueryTerminal.ExtendedPrompt>(): T;
    set_mask(toggle?: boolean | string): JQueryTerminal;
    get_output(): string;
    get_output(raw: boolean):  JQueryTerminal.Lines;
    resize(handler?: JQuery.TypeEventHandler<TElement, null, TElement, TElement, 'resize'> | false): this;
    resize(width?: number, height?: number): JQueryTerminal;
    refresh(): JQueryTerminal;
    flush(options?: { update?: boolean, scroll?: boolean }): JQueryTerminal;
    update(line: number, str: string, options?: JQueryTerminal.EchoOptions): JQueryTerminal;
    // options for remove_line is useless but that's how API look like
    remove_line(line: number): JQueryTerminal;
    last_index(): number;
    echo(arg: string, options: JQueryTerminal.animationOptions & JQueryTerminal.EchoOptions): JQuery.Promise<void>;
    echo<TValue = JQueryTerminal.echoValueOrPromise>(arg: TValue, options?: JQueryTerminal.EchoOptions): JQueryTerminal;
    animation(callback: anyFunction): PromiseLike<void>;
    delay(time: number): PromiseLike<void>;
    error(arg: JQueryTerminal.errorArgument, options?: JQueryTerminal.EchoOptions): JQueryTerminal;
    exception<T extends Error>(e: T, label?: string): JQueryTerminal;
    scroll(handler?: JQuery.TypeEventHandler<TElement, null, TElement, TElement, 'scroll'> | false): this;
    scroll(amount: number): JQueryTerminal;
    logout(local?: boolean): JQueryTerminal;
    token<T extends string | void>(local?: boolean): T;
    set_token(token?: string, local?: boolean): JQueryTerminal;
    get_token<T extends string | void>(local?: boolean): T;
    login_name<T extends string | void>(local?: boolean): T;
    name(): string;
    prefix_name(local?: boolean): string;
    typing(type: JQueryTerminal.TypingAnimations, delay: number, message: string, finish: voidFunction): JQuery.Promise<void>;
    skip(): JQueryTerminal;
    skip_stop(): JQueryTerminal;
    read(message: string, success_or_options?: ((result: string) => void) | JQueryTerminal.readOptions, cancel?: voidFunction): JQuery.Promise<string>;
    push(interpreter: TypeOrArray<JQueryTerminal.Interpreter>, options?: JQueryTerminal.pushOptions): JQueryTerminal;
    pop(echoCommand?: string, silent?: boolean): JQueryTerminal;
    option(option: keyof JQueryTerminal.TerminalOptions, value?: any): any;
    option(options: JQueryTerminal.TerminalOptions): any;
    invoke_key(shortcut: string): JQueryTerminal;
    keymap(shortcut: string, callback: JQueryTerminal.keymapFunction): JQueryTerminal;
    keymap(shortcut: string): JQueryTerminal.keymapFunctionOptionalArg;
    keymap(arg: JQueryTerminal.keymapObject): JQueryTerminal;
    keymap(): JQueryTerminal.keymapObjectOptionalArg;
    //keymap<T extends JQueryTerminal.keymapObject | JQueryTerminal.keymapFunctionOptionalArg | JQueryTerminal>(keymap?: JQueryTerminal.keymapObject | string, fn?: JQueryTerminal.keymapFunction): T;
    level(): number;
    reset(): JQueryTerminal;
    purge(): JQueryTerminal;
    destroy(): JQueryTerminal;
    scroll_to_bottom(): JQueryTerminal;
    is_bottom(): boolean;
  }

  const JQTerminal: (window: Window, JQuery: JQueryStatic) => void;
  export default JQTerminal;
}
