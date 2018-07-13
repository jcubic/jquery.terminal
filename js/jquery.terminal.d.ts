type anyFunction = (...args: any[]) => any;
type ObjectInterpreter = {
    [key: string]: ObjectInterpreter | anyFunction;
}
type TypeOrArray<T> = T | T[];
type interpterFunction = (command: string, term?: JQueryTerminal) => any;
type Interpterer = string | interpterFunction | ObjectInterpreter;

type TypeOrString<T> = string | T;

interface JQuery<TElement = HTMLElement> {
    terminal(interpreter?: TypeOrArray<Interpterer>, options?: TerminalOptions): JQueryTerminal;
    resizer(arg: TypeOrString<anyFunction>): JQuery;
    cmd(options?: CmdOptions): Cmd;
    text_length(): number;
    caret(pos?: number): number;
    visible(): JQuery;
    hidden(): JQuery;
}

type StringOrNumber = string | number | null;

type JSONObject = {
    [key: string]: StringOrNumber
}

type mapFunction = (key: string, anyFunction) => any;

interface JQueryStatic {
    omap(object: { [key: string]: anyFunction }, mapFunction);
    jrpc(url: string, method: string, params: any[], sucess?: (json: JSONObject, status?: string, jqxhr?: JQuery.jqXHR) => void, error?: (jqxhr?: JQuery.jqXHR, status?: string) => void): void;
}

type keymapFunction = (event: JQueryKeyEventObject, original?: keymapFunction) => any;
type keymapObject = { [key: string]: keymapFunction };

type commandsCmdFunction = (command: string) => any;
type setStringFunction = (value: string) => void;
type cmdPrompt = (setPrompt: setStringFunction) => void | string;

type historyFilterFunction = (command: string) => boolean;
type historyFilter = RegExp | historyFilterFunction;

type KeyEventHandler = (event?: JQueryKeyEventObject) => any;

type CmdOptions = {
    mask?: string | boolean;
    caseSensitiveSearch?: boolean;
    historySize?: number;
    prompt?: cmdPrompt;
    enabled?: boolean;
    history?: boolean | "memory";
    onPositionChange?: (position?: number, display_position?: number) => void;
    width?: number;
    historyFilter?: historyFilter;
    commands?: commandsCmdFunction;
    char_width?: number;
    onCommandChange?: (command: string) => void;
    name?: string;
    keypress?: KeyEventHandler;
    keydown?: KeyEventHandler;
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
    keymap(shortcut: string, callback: keymapFunction): Cmd;
    keymap(shortcut: string): keymapFunction;
    keymap(keymapObject): Cmd;
    keymap(): keymapObject
    insert(value: string, stay?: boolean): Cmd;
    get(index: number): HTMLElement;
    get(): HTMLElement[];
    get(): string;
    commands(commandsCmdFunction): Cmd;
    commands(): commandsCmdFunction;
    destroy(): Cmd;
    prompt(cmdPrompt): Cmd;
    prompt(): cmdPrompt;
    kill_text(): string;
    position(): JQueryCoordinates;
    position(): number;
    position(value: number, silent?: boolean): Cmd;
    refresh: Cmd;
    display_position(): number;
    display_position(value: number): Cmd;
    visible(): Cmd;
    show(): Cmd;
    resize(handler: (eventObject: JQueryEventObject) => any): JQuery;
    resize(eventData: Object, handler: (eventObject: JQueryEventObject) => any): JQuery;
    resize(num_chars?: number): Cmd;
    enable(): Cmd;
    isenabled(): Cmd;
    disable(toggle: boolean): Cmd;
    disable(): Cmd;
    mask(toggle: boolean): Cmd;
    mask(mask: string): Cmd;
}



interface History {

}


interface TerminalOptions {

}


interface JQueryTerminal extends JQuery {
    set_command(command: string): JQueryTerminal;
    id(): number;
    clear(): JQueryTerminal;
}
