import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';
import lolcat from 'isomorphic-lolcat';

import { TColor, hex, random } from '@site/src/utils';
import { delay } from '@site/src/constants';

export default async function command(this: JQueryTerminal, ...args: string[]) {
  const $ = (globalThis as any).$ as JQueryStatic;
  const { a, animation } = $.terminal.parse_options(args);
  let input = await this.read('');
  const options = a || animation ? {typing: true, delay } : undefined;
  this.echo(rainbow(input), options);
}

function rainbow(string: string) {
  const $ = (globalThis as any).$ as JQueryStatic;
  const seed = random(256);
  return lolcat.rainbow(function(char: string, color: TColor) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
  }, string, seed).join('\n');
}
