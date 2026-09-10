/// <reference path="./jquery.terminal.d.ts" />

export type RedirectCallback = (this: JQueryTerminal, ...args: string[]) => TypeOrPromise<void>;

export type PipeRedirects = Array<{
    name: string;
    output?: true;
    callback: RedirectCallback;
}>;

export type PipeOptions = {
    processArguments?: boolean;
    redirects?: PipeRedirects;
};

declare global {
    namespace JQueryTerminal {
        interface TerminalOptions {
            pipe?: boolean;
            redirects?: PipeRedirects;
        }
    }

    interface JQueryTerminalStatic {
        pipe(
            obj: JQueryTerminal.ObjectInterpreter<string>,
            options: PipeOptions & { processArguments: false }
        ): JQueryTerminal.interpreterFunction;
        pipe(obj: JQueryTerminal.ObjectInterpreter, options?: PipeOptions): JQueryTerminal.interpreterFunction;
    }
}

declare const pipe: (window: Window, JQuery: JQueryStatic) => void;
export default pipe;
