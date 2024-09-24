import data from 'fortune-cookie/fortune-cookie.json';

import type { JQueryTerminal } from 'jquery.terminal';

import { randomize } from '@site/src/utils';

const pick = randomize(data);

export default async function fortune(this: JQueryTerminal) {
  this.echo(pick());
}


