import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';

import data from '@site/dir.json';

function alow_data() {
  const $ = (globalThis as any).$ as JQueryStatic;
  if (!$.terminal.defaults.allowedAttributes.includes('data-path')) {
    $.terminal.defaults.allowedAttributes.push('data-path');
  }
}

export default function source(this: JQueryTerminal) {
  alow_data();
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
  let result = prefix ? `${prefix}[[;white;;;;{"data-path":"${path}"}]${name}]\n` : '/\n';
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
