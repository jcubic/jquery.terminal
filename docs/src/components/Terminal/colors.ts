import { omap } from '@site/src/utils';

import type { FormatStyle } from '@site/src/types';


const colors = omap({
  blue:  '#55f',
  green: '#4d4',
  grey:  '#999'
}, function(color) {
  return function(str: string, style?: FormatStyle) {
    return `[[${style ?? ''};${color};]${str}]`;
  };
});

export default colors;
