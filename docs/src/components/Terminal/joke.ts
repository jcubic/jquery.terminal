import type { JQueryTerminal } from 'jquery.terminal';

export default async function joke(this: JQueryTerminal) {
  const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
  const data = await res.json();
  (async () => {
    if (data.type == 'twopart') {
      this.animation(async () => {
        await this.echo(`Q: ${data.setup}`, {
          delay: 50,
          typing: true
        });
        await this.echo(`A: ${data.delivery}`, {
          delay: 50,
          typing: true
        });
      });
    } else if (data.type === 'single') {
      await this.echo(data.joke, {
        delay: 50,
        typing: true
      });
    }
  })();
}
