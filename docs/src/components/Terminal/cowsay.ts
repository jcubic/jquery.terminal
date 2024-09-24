import type { JQueryTerminal } from 'jquery.terminal';
import { say } from 'cowsay';

export default async function cowsay(this: JQueryTerminal) {
  return say({
    text: await this.read(''),
    e: 'oO'
  }).replace(/\\$/m, '\\ ');
}
