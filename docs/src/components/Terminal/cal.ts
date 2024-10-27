import type { JQueryTerminal } from 'jquery.terminal';

import cal from 'ascii-calendar';

function calendar(callback: (day: string) => string) {
    var today = new Date().getDate();
    var padded_day = today.toString().padStart(2, ' ');
    // regex that match day but not inside the year
    var re = new RegExp(`(?<!20)(${padded_day})`);
    return cal().replace(re, function(_, g) {
        return callback(g);
    })
}

export default function jargon(this: JQueryTerminal) {
  return calendar(function(day: string) {
    return `[[;#000;#ccc;;]${day}]`;
  });
};
