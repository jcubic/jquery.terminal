/// <reference path="./jquery.terminal.d.ts" />

export type LessOptions = {
    formatters?: boolean;
    wrap?: boolean;
    keepWords?: boolean;
    ansi?: boolean;
    // onExit is the modern name, exit is kept as a legacy alias
    onExit?: () => void;
    exit?: () => void;
};

declare global {
    namespace JQueryTerminal {
        type LessArgument = string | ((cols: number, cb: (text: string) => void) => void) | string[];
    }

    interface JQuery<TElement = HTMLElement> {
        less(text: JQueryTerminal.LessArgument, options?: LessOptions): JQueryTerminal;
    }
}

declare const less: (window: Window, JQuery: JQueryStatic) => void;
export default less;
