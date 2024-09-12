import { useLayoutEffect, useRef, CSSProperties } from 'react';
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

export interface TerminalProps extends CSSProperties {
  '--rows': number;
}

export default function Interpreter(): JSX.Element {
  const ref = useRef<HTMLDivElement>();

  const isProd = process.env.NODE_ENV === 'production';
  const isBrowser = useIsBrowser();
  const isStatic = isProd && !isBrowser && !globalThis.jQuery;

  useScripts(!globalThis.jQuery && [
    'https://cdn.jsdelivr.net/npm/jquery',
    'https://cdn.jsdelivr.net/combine/npm/jquery.terminal/js/jquery.terminal.min.js,npm/js-polyfills/keyboard.js'
  ]);

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

  const terminalStyle = {
    '--rows': 15
  } as TerminalProps;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css" rel="stylesheet"/>
        {isStatic && <script src="https://cdn.jsdelivr.net/npm/jquery" />}
        {isStatic && <script src="https://cdn.jsdelivr.net/combine/npm/jquery.terminal/js/jquery.terminal.min.js,npm/js-polyfills/keyboard.js" />}
      </Head>
      <div className="terminal marker" ref={ref}></div>
      <div className="term" style={terminalStyle} />
    </>
  );
};
