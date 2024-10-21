import { useLayoutEffect, useRef, useState, RefObject } from 'react';
import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';
import clsx from 'clsx';

import useIsBrowser from '@docusaurus/useIsBrowser';
import Head from '@docusaurus/Head';

import useScripts from '@site/src/hooks/useScripts';
import '@site/src/types';
import styles from './styles.module.css';

const replReady = () => {
  const jQuery = (globalThis as any).jQuery as JQueryStatic;
  return jQuery && jQuery.terminal;
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
import jargon from './jargon';

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
  'https://cdn.jsdelivr.net/combine/gh/jcubic/jquery.terminal@d6255a12264b20/js/jquery.terminal.min.js,npm/js-polyfills/keyboard.js,gh/jcubic/jquery.terminal@9fc5bb9bb2/js/less.js,npm/jquery.terminal/js/xml_formatting.js,npm/jquery.terminal/js/prism.js,npm/jquery.terminal/js/pipe.js',
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

export default function Interpreter(): JSX.Element {
  const [show_commands, set_show_commands] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>();
  const term = useRef<JQueryTerminal>(null);

  const jQuery = (globalThis as any).jQuery as JQueryStatic;

  const isProd = process.env.NODE_ENV === 'production';
  const isBrowser = useIsBrowser();
  const isStatic = isProd && !isBrowser && !jQuery;

  useScripts(!jQuery && terminal_scripts);

  const exec = command(term);

  useLayoutEffect(() => {
    (function loop() {
      if (replReady() && styleReady()) {
        term.current = initTerminal({
          github,
          source,
          echo,
          joke,
          cowsay,
          lolcat,
          fortune,
          figlet,
          jargon,
          theme,
          record,
          size(num: string) {
            this.css('--size', num);
          },
          rows(num: string) {
            this.css('--rows', num);
          }
        });
        term.current.on('click', '.jargon', function() {
          const href = $(this).attr('href');
          const command = `jargon ${href}`;
          term.current.exec(command).then(function() {
            if (term.current.settings().historyState) {
              term.current.save_state(command);
            }
          });
          return false;
        });
        set_show_commands(true);
      } else {
        setTimeout(loop, 100);
      }
    })();
    return destroyTerminal;
  }, []);

  function styleReady() {
    // hack to prevent initalizaing of jQuery Terminal before style is loaded
    return !!getComputedStyle(ref.current).getPropertyValue('--base-background');
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/gh/jcubic/jquery.terminal@devel/css/jquery.terminal.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/terminal-prism/css/prism-coy.css" rel="stylesheet"/>
        {isStatic && terminal_scripts.map(script => {
          return <script key={script} src={script} />
        })}
      </Head>
      <div className={clsx('terminal', styles.marker)} ref={ref}></div>
      <div className={styles.term}/>
      {show_commands && (
        <div className={styles.commands}>
          <p>Commands:</p>
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
           </ul>
        </div>
      )}
    </>
  );
};
