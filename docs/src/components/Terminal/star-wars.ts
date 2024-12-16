import type { JQueryTerminal } from 'jquery.terminal';

export default async function command(this: JQueryTerminal, delay_arg = '50') {
  const $ = (globalThis as any).$ as any;;
  if (this.cols() < 67) {
    this.error('not enough width to run the star wars');
    return;
  }
  let delay = parseInt(delay_arg);
  const sw_frames: string[][] = globalThis.sw_frames = (globalThis as any).sw_frames ?? [];
  if (!globalThis.star_wars) {
    await $.getScript('https://cdn.jsdelivr.net/gh/jcubic/static@master/js/star_wars.js');
    const star_wars = globalThis.star_wars;
    const LINES_PER_FRAME = 14;
    const lines = star_wars.length;
    for (let i = 0; i < lines; i += LINES_PER_FRAME) {
      sw_frames.push(star_wars.slice(i, i + LINES_PER_FRAME));
    }
  }
  let stop = false;
  function play(term: JQueryTerminal) {
    let i = 0;
    let next_delay: number;
    (function display() {
      if (i == sw_frames.length) {
        i = 0;
      }
      if (!stop) {
        term.clear();
        if (sw_frames[i][0].match(/[0-9]+/)) {
          next_delay = parseInt(sw_frames[i][0]) * delay;
        } else {
          next_delay = delay;
        }
        term.echo(sw_frames[i++].slice(1).join('\n')+'\n');
        setTimeout(display, next_delay);
      }
    })();
  }
  const view: JQueryTerminal.View = this.export_view();
  function exit() {
    stop = true;
    this.cmd().show();
    this.import_view(view);
    return false;
  }
  this.push($.noop, {
    onExit: exit,
    keymap: {
      'Q': exit,
      'CTRL+C': exit,
      'ESCAPE': exit
    },
    prompt: ''
  });
  this.cmd().hide();
  play(this);
}
