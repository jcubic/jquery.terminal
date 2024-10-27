import type { JQueryTerminal } from 'jquery.terminal';

import { z } from 'zod';

const singleJokeSchema = z.object({
  type: z.literal('single'),
  joke: z.string()
});

const twoPartJokeSchema = z.object({
  type: z.literal('twopart'),
  setup: z.string(),
  delivery: z.string()
});

const jokeSchema = z.union([singleJokeSchema, twoPartJokeSchema]);

export default async function joke(this: JQueryTerminal) {
  const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
  const json = await res.json();

  const { data, success } = jokeSchema.safeParse(json);

  if (!success) {
    return this.error("Error: Invalid joke data format");
  }

  const options = {
    delay: 50,
    typing: true,
    keepWords: true
  };

  (async () => {
    if (data.type == 'twopart') {
      this.animation(async () => {
        await this.echo(`Q: ${data.setup}`, options);
        await this.echo(`A: ${data.delivery}`, options);
      });
    } else if (data.type === 'single') {
      await this.echo(data.joke, options);
    }
  })();
}
