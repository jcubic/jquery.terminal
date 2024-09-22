import type { JQueryTerminal } from 'jquery.terminal';

import github from './github';
import echo from './echo';
import source from './source';

import styles from './styles.module.css';

export function initTerminal() {
  const $ = (globalThis as any).$;
  const $term = $(`.${styles.term}`);
  $term.empty();

  const scroll_event: JQueryTerminal.MouseWheelCallback = (...args) => {
    return scroll.apply(term, args);
  };

  const term = $term.terminal({
    github,
    source,
    echo
  }, {
    processArguments: false,
    checkArity: false,
    completion: true,
    mousewheel: scroll_event,
    touchscroll: scroll_event
  });

  return $term;
};

export function destroyTerminal() {
  const $ = (globalThis as any).$;
  const $term = $(`.${styles.term}`);
  $term.terminal().destroy();
}

function scroll() {
  const { length } = this.get_output().split('\n');
  const rows = this.rows();
  if (rows >= length) {
    this.removeClass(styles.shake);
    this.addClass(styles.shake);
    this.stopTime('shake');
    this.oneTime(200, 'shake', () => {
      this.removeClass(styles.shake);
    });
  }
}
