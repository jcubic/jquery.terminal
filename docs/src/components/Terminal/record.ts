import type { JQueryTerminal } from 'jquery.terminal';

export default function(this: JQueryTerminal, arg: string) {
  if (arg === 'start') {
    this.history_state(true);
  } else if (arg === 'stop') {
    this.history_state(false);
  } else {
    this.echo('save commands in url hash so you can share the link\n\n' +
              'usage: record [stop|start]');
  }
};
