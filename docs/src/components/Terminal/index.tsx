import { useLayoutEffect, useRef, useState, RefObject, useCallback } from 'react';
import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';
import clsx from 'clsx';

import useIsBrowser from '@docusaurus/useIsBrowser';
import Head from '@docusaurus/Head';

import useScripts from '@site/src/hooks/useScripts';
import '@site/src/types';
import styles from './styles.module.css';

const repl_ready = () => {
  const jQuery = (globalThis as any).jQuery as JQueryStatic;
  return jQuery && jQuery.terminal && jQuery.terminal.xml_formatter;
}

import { initTerminal, destroyTerminal } from './terminal';

import { delay } from '@site/src/constants';
import github from './github';
import echo from './echo';
import source from './source';
import record from './record';
import theme from './theme';
import joke from './joke';
import lolcat from './lolcat';
import cowsay from './cowsay';
import fortune from './fortune';
import figlet from './figlet';
import { jargon, jargon_init } from './jargon';
import cal from './cal';
import chuck_norris from './chuck-norris';

const languages = [
  'markdown',
  'json',
  'typescript',
  'jsx',
  'tsx'
];

const terminal_scripts = [
  'https://cdn.jsdelivr.net/npm/jquery',
  'https://cdn.jsdelivr.net/npm/prismjs/prism.js',
  'https://cdn.jsdelivr.net/combine/gh/jcubic/jquery.terminal@90d0b02a/js/jquery.terminal.js,npm/js-polyfills/keyboard.js,gh/jcubic/jquery.terminal@9fc5bb9bb2/js/less.js,npm/jquery.terminal/js/xml_formatting.js,npm/jquery.terminal/js/unix_formatting.js,npm/jquery.terminal/js/prism.js,gh/jcubic/jquery.terminal@d3a11606/js/pipe.js',
  'https://cdn.jsdelivr.net/combine/' + languages.map(lang => {
    return `npm/prismjs/components/prism-${lang}.min.js`;
  }).join(',')
];

function command(term: RefObject<JQueryTerminal>) {
  const options = { typing: true, delay, history: true };
  return (command: string, silent: boolean = false) => () => {
      setTimeout(() => {
          term.current.focus().exec(command, { ...options, silent });
      }, 0);
  };
}

const commands = {
  github,
  source,
  echo,
  joke,
  cowsay,
  lolcat,
  fortune,
  figlet,
  jargon,
  cal,
  'chuck-norris': chuck_norris,
  help,
  theme,
  record,
  ls() {
    this.echo("[[;red;]command `ls' not found. Try [[!u;;;command]help]]");
  },
  size(num: string) {
    if (!num) {
      this.echo('Change the size of the terminal\nusage\n\tsize &lt;number&gt;\ne.g.: size 1.2');
    } else {
      this.css('--size', num);
    }
  },
  rows(num: string) {
    if (!num) {
      this.echo('Change terminal number of rows\nusage\n\trows &lt;number&gt;');
    } else {
      this.css('--rows', num);
    }
  }
};

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

function help() {
  const list = formatter.format(Object.keys(commands));
  this.echo(`available commands: ${list}`, { keepWords: true });
  this.echo('You can also use Unix/Linux pipe operator to send output of one command to the next input');
  this.echo('Examples are [[!b;white;;command]fortune | cowsay | lolcat]');
}

export default function Interpreter(): JSX.Element {
  const [show_commands, set_show_commands] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const term = useRef<JQueryTerminal>(null);

  const jQuery = (globalThis as any).jQuery as JQueryStatic;

  const isProd = process.env.NODE_ENV === 'production';
  const isBrowser = useIsBrowser();
  const isStatic = isProd && !isBrowser && !jQuery;

  useScripts(!jQuery && terminal_scripts);

  const invoke = useCallback(function(command: string) {
    term.current.exec(command).then(function() {
      if (term.current.settings().historyState) {
        term.current.save_state(command);
      }
    });
  }, []);

  const exec = command(term);

  useLayoutEffect(() => {
    (function loop() {
      if (repl_ready() && style_ready()) {
        term.current = initTerminal(commands);
        jargon_init((globalThis as any).jQuery as JQueryStatic);
        term.current.on('click', 'a.jargon', function() {
          const href = $(this).attr('href');
          invoke(`jargon ${href}`);
          return false;
        }).on('click', 'a.command', function() {
          const commnad = $(this).attr('href');
          invoke(commnad);
          return false;
        });
        set_show_commands(true);
      } else {
        setTimeout(loop, 100);
      }
    })();
    return destroyTerminal;
  }, []);

  function style_ready() {
    // hack to prevent initalizaing of jQuery Terminal before style is loaded
    return !!getComputedStyle(ref.current).getPropertyValue('--base-background');
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/gh/jcubic/jquery.terminal@90d0b02a/css/jquery.terminal.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/terminal-prism/css/prism-coy.css" rel="stylesheet"/>
        {isStatic && terminal_scripts.map(script => {
          return <script key={script} src={script} />
        })}
      </Head>
      <div className={clsx('terminal', styles.term)} ref={ref}/>
      {show_commands && (
        <div className={styles.commands}>
          <p>Top-level Commands:</p>
          <ul>
            <li>
              <button onClick={exec('source')}>source</button>
            </li>
            <li>
              <button onClick={exec('github -u jcubic -r jquery.terminal')}>
                github
              </button>
            </li>
            <li>
              <button onClick={exec('theme', true)}>theme</button>
            </li>
            <li>
              <button onClick={exec('joke | lolcat -a')}>joke</button>
            </li>
            <li>
              <button onClick={exec('chuck-norris')}>chuck-norris</button>
            </li>
            <li>
              <button onClick={exec('fortune | cowsay | lolcat')}>cowsay</button>
            </li>
            <li>
              <button onClick={exec('echo jQuery Terminal | figlet -f Small | lolcat')}>
                figlet
              </button>
            </li>
            <li>
              <button onClick={exec('jargon hacker')}>jargon</button>
            </li>
            <li>
              <button onClick={exec('cal')}>cal</button>
            </li>
           </ul>
        </div>
      )}
    </>
  );
};
