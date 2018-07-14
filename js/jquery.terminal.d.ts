/*
 * helper types
 */
type anyFunction = (...args: any[]) => any;
type StringOrNumber = string | number | null;

type JSONObject = {
    [key: string]: StringOrNumber | JSONObject;
}

type mapFunction = (key: string, anyFunction) => any;

type TypeOrArray<T> = T | T[];
type TypeOrString<T> = string | T;

declare namespace JQueryTerminal {
    type interpterFunction = (this: JQueryTerminal, command: string, term?: JQueryTerminal) => any;
    type Interpterer = string | interpterFunction | ObjectInterpreter;
    type ObjectInterpreter = {
        [key: string]: ObjectInterpreter | anyFunction;
    }

    type RegExpReplacementFunction = (...args: string[]) => string;
    type IterateFormattingFunction = (data: JSONObject) => void;

    type ParsedCommand<T> = {
        command: string;
        name: string;
        args: T[];
        args_quotes: string[];
        rest: string;
    };

    type ParsedOptions = {
        _: string[];
        [key: string]: boolean | string | string[];
    };

    type FormatterRegExpFunction = (...args: string[]) => string;
    type FormaterRegExpReplacement = string | FormatterRegExpFunction;
    type FormatterFunction = (str: string, options: JSONObject) => (string | [string, number]);

    type Formatter = [RegExp, FormaterRegExpReplacement] | [RegExp, FormaterRegExpReplacement, { loop: boolean }] | FormatterFunction;

    type keymapFunction = (event: JQueryKeyEventObject, original?: keymapFunction) => any;
    type keymapObject = { [key: string]: keymapFunction };

    type commandsCmdFunction = (command: string) => any;
    type setStringFunction = (value: string) => void;
    type CmdPrompt = (setPrompt: setStringFunction) => void | string;
    type ExtendedPrompt = (this: JQueryTerminal, setPrompt: setStringFunction) => (void | PromiseLike<string>) | string;

    type historyFilterFunction = (command: string) => boolean;
    type historyFilter = null | RegExp | historyFilterFunction;

    type KeyEventHandler = (event?: JQueryKeyEventObject) => (boolean | void);

    type KeyEventHandlerWithContext = (this: JQueryTerminal, event?: JQueryKeyEventObject) => (boolean | void);

    type ExceptionHandler = (e?: Error | TerminalExeption, label?: string) => void;
    type processRPCResponseFunction = (result: JSONObject, term?: JQueryTerminal) => void;
    type ObjectWithThenMethod = {
        then: () => any;
    }
    type SetLoginCallback = (token: string) => (void | ObjectWithThenMethod);
    type LoginFunction = (username: string, password: string, cb?: SetLoginCallback) => (void | ObjectWithThenMethod);

    type Completion = string[] | CompletionFunction;

    type SetComplationCallback = (complation: string[]) => void;

    type CompletionFunction = (this: JQueryTerminal, str: string, callback: SetComplationCallback) => void;

    type EchoCommandCallback = (command?: string) => void;

    // all arguments are optional so you can use $.noop
    type DoubleTabFunction = (this: JQueryTerminal, str?: string, matched?: string[], echoCmd?: (command?: string) => void) => (void | boolean);

    type RPCErrorCallback = (this: JQueryTerminal, error: JSONObject) => void;

    type RequestResponseCallback = (this: JQueryTerminal, xhr: JQuery.jqXHR, json: JSONObject, term?: JQueryTerminal) => void;

    type EchoFinalizeFunction = (div: JQuery) => void;
    type EventCallback = (this: JQueryTerminal, term: JQueryTerminal) => (void | boolean);


    type Interpreter = {
        completion: "settings" | JQueryTerminal.Completion;
        history?: boolean;
        // all other iterpreters are converted to function
        interpreter: JQueryTerminal.interpterFunction;
        keydown?: KeyEventHandlerWithContext;
        keypress?: KeyEventHandlerWithContext;
        mask?: boolean | string;
        infiniteLogin?: boolean;
        prompt: ExtendedPrompt;
    }

    type PushPopCallback = (this: JQueryTerminal, before: JQueryTerminal.Interpreter, after: JQueryTerminal.Interpreter) => void;

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
        toogle(value?: boolean): void;
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
        set(T): void;
        front(): void | T;
        map(fn: (item: T, index?: number) => any): any[];
        forEach(fn: (item: T, index?: number) => any): void;
        append(item: T): void;
    }
}


interface JQuery<TElement = HTMLElement> {
    terminal(interpreter?: TypeOrArray<JQueryTerminal.Interpterer>, options?: TerminalOptions): JQueryTerminal;
    resizer(arg: TypeOrString<anyFunction>): JQuery;
    cmd(options?: CmdOptions): Cmd;
    text_length(): number;
    caret(pos?: number): number;
    visible(): JQuery;
    hidden(): JQuery;
}

interface JQueryStatic {
    omap(object: { [key: string]: anyFunction }, mapFunction);
    jrpc(url: string, method: string, params: any[], sucess?: (json: JSONObject, status?: string, jqxhr?: JQuery.jqXHR) => void, error?: (jqxhr?: JQuery.jqXHR, status?: string) => void): void;
    terminal: JQueryTerminalStatic;
}


interface JQueryTerminalStatic {
    version: string,
    data: string;
    color_names: string[];
    defaults: {
        formatters: TypeOrArray<JQueryTerminal.Formatter>;
        strings: {
            [key: string]: string;
        };
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
    nested_formatting(str: string): string;
    escape_formatting(str: string): string;
    /**
     * if options have position it will return [string, display_position]
     */
    apply_formatters(str: string, options: JSONObject): string | [string, number];
    format(str: string, options?: { linksNoReferrer: boolean }): string;
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
    parse_option(arg: string | string[], options?: { booleans: string[] }): JQueryTerminal.ParsedOptions;
    extended_command(term: JQueryTerminal, str: string): void;
    /**
     * formatter is an object that can be used in RegExp functions
     */
    formatter: any;
    Exception: TerminalExeption;
}


type TerminalExeption = {
    new(typeOrMessage: string, message?: string, stack?: string): TerminalExeption;
    message: string;
    type: string;
    stack?: string;
};

type CmdOptions = {
    mask?: string | boolean;
    caseSensitiveSearch?: boolean;
    historySize?: number;
    prompt?: JQueryTerminal.CmdPrompt;
    enabled?: boolean;
    history?: boolean | "memory";
    onPositionChange?: (position?: number, display_position?: number) => void;
    width?: number;
    historyFilter?: JQueryTerminal.historyFilter;
    commands?: JQueryTerminal.commandsCmdFunction;
    char_width?: number;
    onCommandChange?: (command: string) => void;
    name?: string;
    keypress?: JQueryTerminal.KeyEventHandler;
    keydown?: JQueryTerminal.KeyEventHandler;
}

// we copy methods from jQuery to overwrite it
// see: https://github.com/Microsoft/TypeScript/issues/978
interface Cmd extends JQuery {
    option(name: string, value: any): Cmd;
    option(name: string): any;
    name(name: string): Cmd;
    name(): string;
    purge(): Cmd;
    history(): History;
    delete(count: number): string;
    delete(count: number, stay: boolean): string;
    set(command: string, stay?: boolean, silent?: boolean): Cmd;
    keymap(shortcut: string, callback: JQueryTerminal.keymapFunction): Cmd;
    keymap(shortcut: string): JQueryTerminal.keymapFunction;
    keymap(keymapObject): Cmd;
    keymap(): JQueryTerminal.keymapObject;
    insert(value: string, stay?: boolean): Cmd;
    get(index: number): HTMLElement;
    get(): HTMLElement[];
    get(): string;
    commands(commandsCmdFunction): Cmd;
    commands(): JQueryTerminal.commandsCmdFunction;
    destroy(): Cmd;
    prompt(prompt: JQueryTerminal.CmdPrompt): Cmd;
    prompt(): JQueryTerminal.CmdPrompt;
    kill_text(): string;
    position(): JQueryCoordinates;
    position(): number;
    position(value: number, silent?: boolean): Cmd;
    refresh: Cmd;
    display_position(): number;
    display_position(value: number): Cmd;
    visible(): Cmd;
    show(): Cmd;
    //jQuery methods
    resize(handler: (eventObject: JQueryEventObject) => any): JQuery;
    resize(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;
    //jQuery Terminal method
    resize(num_chars?: number): Cmd;
    enable(): Cmd;
    isenabled(): Cmd;
    disable(toggle: boolean): Cmd;
    disable(): Cmd;
    mask(toggle: boolean): Cmd;
    mask(mask: string): Cmd;
}

type TerminalOptions = {
    prompt?: JQueryTerminal.ExtendedPrompt;
    history?: boolean;
    exit?: boolean;
    clear?: boolean;
    enabled?: boolean;
    maskCHar?: string;
    wrap?: boolean;
    checkArity?: boolean;
    raw?: boolean;
    exceptionHandler?: null | JQueryTerminal.ExceptionHandler;
    pauseEvents?: boolean;
    softPause?: boolean;
    memory?: boolean;
    cancelableAjax?: boolean;
    processArguments?: boolean;
    linksNoReferrer?: boolean;
    processRPCResponse?: null | JQueryTerminal.processRPCResponseFunction;
    completionEscape?: boolean;
    convertLinks?: boolean;
    extra?: any;
    tabs?: number;
    historySize?: number;
    scrollObject?: null | JQuery.Selector | HTMLElement | JQuery;
    historyState?: boolean;
    importHistory?: boolean;
    historyFilter?: JQueryTerminal.historyFilter;
    echoCommand?: boolean;
    scrollOnEcho?: boolean;
    login?: string | boolean | JQueryTerminal.LoginFunction;
    outputLimit?: number;
    onAjaxError?: (this: JQueryTerminal, xhr: JQuery.jqXHR, status?: string, error?: string) => void;
    pasteImage?: boolean;
    scrollBottomOffset?: boolean;
    wordAutocomplete?: boolean;
    caseSensitiveAutocomplete?: boolean;
    caseSensitiveSearch?: boolean;
    clickTimeout?: number;
    request?: JQueryTerminal.RequestResponseCallback;
    response?: JQueryTerminal.RequestResponseCallback;
    describe?: string;
    onRPCError?: JQueryTerminal.RPCErrorCallback;
    doubleTab?: JQueryTerminal.DoubleTabFunction;
    completion?: JQueryTerminal.Completion;
    onInit?: JQueryTerminal.EventCallback;
    onClear?: JQueryTerminal.EventCallback;
    onBlur?: JQueryTerminal.EventCallback;
    onFocus?: JQueryTerminal.EventCallback;
    onExit?: JQueryTerminal.EventCallback;
    onTerminalChange?: JQueryTerminal.EventCallback;
    onPush?: JQueryTerminal.PushPopCallback;
    onPop?: JQueryTerminal.PushPopCallback;
    keypress?: JQueryTerminal.KeyEventHandlerWithContext;
    keydown?: JQueryTerminal.KeyEventHandlerWithContext;
    onAfterRedraw?: JQueryTerminal.EventCallback;
    onEchoCommand?: (this: JQueryTerminal, div: JQuery, command?: string) => void;
    onFlush?: JQueryTerminal.EventCallback;
    strings: {
        [key: string]: string;
    }
}

type EchoOptions = {
    flush?: boolean;
    raw?: boolean;
    finalize?: JQueryTerminal.EchoFinalizeFunction;
    keepWords?: boolean;
    formatters?: boolean;
}


interface JQueryTerminal extends JQuery {
    set_command(command: string): JQueryTerminal;
    id(): number;
    clear(): JQueryTerminal;
    push(interpreter: TypeOrArray<JQueryTerminal.Interpterer>, options?: JSONObject): JQueryTerminal;
    echo(arg: any, options?: EchoOptions): JQueryTerminal;
}
