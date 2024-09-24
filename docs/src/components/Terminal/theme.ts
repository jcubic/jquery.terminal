import type { JQueryTerminal } from 'jquery.terminal';
import themes from '@site/themes.json';
import { randomize } from '@site/src/utils';

const pick = randomize(themes);

export default function theme(this: JQueryTerminal) {
  const { background, foreground } = pick();
  this.css({
    '--background': background,
    '--color': foreground
  });
}
