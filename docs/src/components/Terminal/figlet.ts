import figlet from 'figlet/lib/figlet.js';
import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';

let ready: boolean;

const fonts = ['Standard', 'Slant', 'Small', 'Colossal', 'Roman', 'Univers'] as const;

type Fonts = typeof fonts[number];

function isFont(arg: unknown): arg is Fonts {
  return fonts.includes(arg as Fonts);
}

export default async function command(this: JQueryTerminal, ...args: string[]) {
  const $ = (globalThis as any).$ as JQueryStatic;
  if (!ready) {
    await load_fonts();
    ready = true;
  }
  const options = $.terminal.parse_options(args);
  let input: string;
  if (options._.length) {
    input = options._.join(' ');
  } else {
    input = await this.read('');
  }
  let font: Fonts;
  if (isFont(options.f)) {
    font = options.f;
  }
  let width: number;
  if (typeof options.w === 'string') {
    width = +options.w;
  }
  this.echo(renderFiglet(this, input, font, Number.isNaN(width) ? undefined : width));
}

function load_fonts() {
  return new Promise(resolve => {
    const fontPath = 'https://cdn.jsdelivr.net/npm/figlet/fonts';
    figlet.defaults({ fontPath });
    (figlet as any).preloadFonts(fonts, resolve);
  });
}



function renderFiglet(term: JQueryTerminal, text: string, font: Fonts, width: number) {
  try {
    return trim(figlet.textSync(text, {
      font: font ?? 'Standard',
      width: width ?? term.cols(),
      whitespaceBreak: true
    }));
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

function trim(str: string) {
  return str.replace(/\s+$/, '');
}
