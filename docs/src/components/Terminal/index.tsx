import { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

import useIsBrowser from '@docusaurus/useIsBrowser';
import Head from '@docusaurus/Head';

import useScripts from '@site/src/hooks/useScripts';
import './styles.css';

const replReady = () => {
  return (
    globalThis.jQuery &&
    globalThis.jQuery.terminal
  );
}

import { initTerminal, destroyTerminal } from './terminal';

type InterpreterProps = {
  className?: string;
};

const terminal_scripts = [
  'https://cdn.jsdelivr.net/npm/jquery',
  'https://cdn.jsdelivr.net/combine/npm/jquery.terminal/js/jquery.terminal.min.js,npm/js-polyfills/keyboard.js,npm/jquery.terminal/js/less.js'
]

export default function Interpreter({ className }: InterpreterProps): JSX.Element {
  const ref = useRef<HTMLDivElement>();

  const isProd = process.env.NODE_ENV === 'production';
  const isBrowser = useIsBrowser();
  const isStatic = isProd && !isBrowser && !globalThis.jQuery;

  useScripts(!globalThis.jQuery && terminal_scripts);

  useLayoutEffect(() => {
    (function loop() {
      if (replReady() && styleReady()) {
        initTerminal();
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
        <link href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css" rel="stylesheet"/>
        {isStatic && terminal_scripts.map(script => {
          return <script key={script} src={script} />
        })}
      </Head>
      <div className="terminal marker" ref={ref}></div>
      <div className={clsx('term', className)}/>
    </>
  );
};