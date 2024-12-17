import { useEffect } from 'react';

type CodePenProps = {
  id: string;
  title: string;
};

export default function CodePen({ id, title }: CodePenProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <p className="codepen"
       data-height="300"
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
