import { omap } from '@site/src/utils';

const colors = omap({
  blue:  '#55f',
  green: '#4d4',
  grey:  '#999'
}, function(color) {
  return function(str: string, style: string) {
    return '[[' + (style||'') + ';' + color + ';]' + str + ']';
  };
});

export default colors;
