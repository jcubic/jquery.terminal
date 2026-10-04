/// <reference path="./jquery.terminal.d.ts" />

// the redirect arguments come from the same command line as the arguments of
// the command, so they are parsed the same way unless processArguments is off
export type RedirectCallback<A = string | number | RegExp> =
    (this: JQueryTerminal, ...args: A[]) => TypeOrPromise<void>;

export type PipeRedirects<A = string | number | RegExp> = Array<{
    name: string;
    output?: true;
    callback: RedirectCallback<A>;
}>;

export type PipeOptions<A = string | number | RegExp> = {
    processArguments?: boolean;
    redirects?: PipeRedirects<A>;
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
            options: PipeOptions<string> & { processArguments: false }
        ): JQueryTerminal.interpreterFunction;
        pipe(obj: JQueryTerminal.ObjectInterpreter, options?: PipeOptions): JQueryTerminal.interpreterFunction;
    }
}

declare const pipe: (window: Window, JQuery: JQueryStatic) => void;
export default pipe;
