import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';
import path from 'path-browserify';

import data from '@site/dir.json';

import { prism } from '@site/src/utils';

function alow_data() {
  const $ = (globalThis as any).$ as JQueryStatic;
  if (!$.terminal.defaults.allowedAttributes.includes('data-path')) {
    $.terminal.defaults.allowedAttributes.push('data-path');
  }
}

const root = 'https://cdn.jsdelivr.net/gh/jcubic/jquery.terminal@docusaurus';

function is_image(path_name: string) {
  const ext = path.extname(path_name);
  return ['.jpeg', '.jpg', '.svg', '.png'].includes(ext);
}

export default function source(this: JQueryTerminal) {
  const $ = (globalThis as any).$ as JQueryStatic;
  alow_data();
  let pending = false;
  const display = async (node: JQuery<HTMLSpanElement>) => {
    if (!pending) {
      const full_path = node.data('path');
      const name = path.basename(full_path);
      node.addClass('pending');
      pending = true;
      const url = [root, full_path].join('');
      let text: string;
      if (is_image(full_path)) {
        text = `<img class="less" src="${url}" alt="file ${name}"/>`;
      } else {
        const res = await fetch(url);
        text = prism(name, await res.text());
      }
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
