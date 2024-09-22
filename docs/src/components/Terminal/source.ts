import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';

import data from '@site/dir.json';

function alow_data() {
  const $ = (globalThis as any).$ as JQueryStatic;
  if (!$.terminal.defaults.allowedAttributes.includes('data-path')) {
    $.terminal.defaults.allowedAttributes.push('data-path');
  }
}

const root = 'https://cdn.jsdelivr.net/gh/jcubic/jquery.terminal@docusaurus';

export default function source(this: JQueryTerminal) {
  alow_data();
  let pending = false;
  const display = async (node: JQuery<HTMLSpanElement>) => {
    if (!pending) {
      const path = node.data('path');
      node.addClass('pending');
      pending = true;
      const url = [root, path].join('');
      const res = await fetch(url);
      const text = await res.text();
      pending = false;
      node.removeClass('pending');
      this.less(text);
    }
  };
  this.off('.source');
  this.on('click.source', '[data-path]:not([data-path$="/"])', function() {
    display($(this));
  });
  setTimeout(() => {
    this.less(tree(data));
  }, 0);
}

type TreeNode = {
  name: string | null;
  path: string;
  children?: TreeNode[];
}


function tree({ children, name, path }: TreeNode, prefix = '') {
  let result = prefix ? `${prefix}[[;;;;;{"data-path":"${path}"}]${name}]\n` : '/\n';
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const isLast = i === children.length - 1;
      const newPrefix = prefix + (isLast ? '└── ' : '├── ');
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      result += tree(children[i], childPrefix).replace(childPrefix, newPrefix);
    }
  }

  return result;
}
