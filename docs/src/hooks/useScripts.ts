import { useEffect } from 'react';

function getScript(script: string) {
  return new Promise((resolve, reject) => {
    const $script = document.createElement("script");
    $script.onload = resolve;
    $script.onerror = reject;
    $script.src = script;
    document.head.appendChild($script);
  });
}

export default function useScripts(scripts?: string[]) {
  useEffect(() => {
    (function loop() {
      if (scripts?.length) {
        const script = scripts.shift();
        getScript(script).then(loop);
      }
    })();
  }, []);
}
