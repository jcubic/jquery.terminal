import * as $ from "jquery";

type TypeOrArray<T> = T | T[];
type interpterFunction = (command: string, term?: JQueryTerminal) => any;
type anyFunction = (...args: any[]) => any;
type ObjectInterpreter = {
    [key: string]: ObjectInterpreter | anyFunction;
}
type Interpterer = string | interpterFunction | ObjectInterpreter;

type TypeOrString<T> = string | T;

interface JQueryTerminal extends JQuery {
    terminal(interpreter: TypeOrArray<Interpterer>);
    resizer(arg: TypeOrString<anyFunction>);
}

type mapFunction = (key: string, anyFunction) => any;

interface JQueryStatic {
    omap(object: {[key: string]: anyFunction}, mapFunction);
}

type keymapFunction = (event: JQueryKeyEventObject, original?: keymapFunction) => any;
type keymapObject = {[key:string]: keymapFunction};

type commandsCmdFunction = (command: string) => any;
type setStringFunction = (value: string) => void;
type cmdPrompt = (setPrompt: setStringFunction) => void | string;


// we copy from method from jQuery to overwrite it
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
/*
type TerminalOptions = {
}

interface History {
    
}

interface CmdOptions {
    
}


interface Terminal extends jQuery {
    
}

interface TerminalOptions {
    
}


*/
