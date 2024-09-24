import type { JQueryTerminal } from 'jquery.terminal';
import themes from '@site/themes.json';
import { shuffle } from '@site/src/utils';

let index = 0;
shuffle(themes);

export default function theme(this: JQueryTerminal) {
  const { background, foreground } = themes[index++ % themes.length];
  this.css({
    '--background': background,
    '--color': foreground
  });
}
