import type { JQueryTerminal } from 'jquery.terminal';
import { z } from 'zod';

import { delay } from '@site/src/constants';

const schema = z.object({
    id: z.string(),
    url: z.string(),
    value: z.string()
});

export default async function chuck_norris(this: JQueryTerminal) {
    const res = await fetch('https://api.chucknorris.io/jokes/random');
    const json = await res.json();
    const { data, success } = schema.safeParse(json);
    if (success) {
        this.echo(`[[b;white;]${data.value}]`, { typing: true, delay, keepWords: true });
    } else {
        this.error('invalid response from remote server');
    }
}
