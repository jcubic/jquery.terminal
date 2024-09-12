export function initTerminal() {
  const $ = globalThis.$;
  const $term = $('.term');
  $term.empty();

  $term.terminal();

  return $term;
};

export function destroyTerminal() {
  const $ = globalThis.$;
  const $term = $('.term');
  $term.terminal().destroy();
}
