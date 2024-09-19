import type { JQueryTerminal } from 'jquery.terminal';

export default function echo(this: JQueryTerminal, ...args: string[]) {
  this.echo(args.join(' '));
};
