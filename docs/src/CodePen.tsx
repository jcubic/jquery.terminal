import { useEffect } from 'react';

type CodePenProps = {
  id: string;
  title: string;
  height: number;
};

export default function CodePen({ id, title, height = 300 }: CodePenProps) {
  useEffect(() => {
    globalThis.__codepen_loaded__ ??= 0;
    globalThis.__codepen_loaded__ += 1;
    const count = globalThis.__codepen_loaded__;
    if (count === 1) {
      const script = document.createElement('script');
      script.className = 'codepen';
      script.dataset.id = count;
      script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      globalThis.__codepen_loaded__ -= 1;
      const script = document.querySelector(`script.codepen[data-id="${count}"]`);
      script?.remove();
    };
  }, []);
  return (
    <p className="codepen"
       data-height={height}
       data-default-tab="result"
       data-slug-hash={id}
       data-pen-title={title}
       data-user="jcubic"
       style={{
         height: 300,
         boxSizing: 'border-box',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         border: '2px solid',
         margin: '1em 0',
         padding: '1em'
       }}>
      <span>See the Pen <a href={`https://codepen.io/jcubic/pen/${id}`}>
        {title}</a> by Jakub T. Jankiewicz (<a href="https://codepen.io/jcubic">@jcubic</a>)
        {' '}on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
  );
}
