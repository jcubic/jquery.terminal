import type { JQueryStatic } from 'jquery.terminal';
import ascii_table from 'jquery.terminal/js/ascii_table';
import { FormatStyle } from '@site/src/types';

type TemplateKeys<T extends string> = Partial<Record<T, string>>;

const format_begin_re = /\[\[([!gbiuso]*);([^;]*)(;[^\]]*\])/i;
const format_split_re = /(\[\[[!gbiuso]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/i;

function list(list: string[]) {
  if (list.length == 1) {
    return list[0];
  } else if (list.length == 2) {
    return list.join(' and ');
  } else if (list.length > 2) {
    return list.slice(0, list.length-1).join(', ') + ' and ' +
      list[list.length-1];
  }
}

function wiki_list(text: string) {
  return list(text.split('|').map(function(wiki) {
    if (wiki.match(/^\s*.*\s*=/)) {
      return '';
    } else {
      return '[[!bu;#fff;;wiki;]' + wiki + ']';
    }
  }).filter(function(item) {
    return !!item;
  }));
}

function word_template(content: string, color: string, default_text: string) {
  var re = /\[\[([^\]]+)\]\]/;
  if (content.match(re)) {
    return content.split(/(\[\[[^\]]+\]\])/).map(function(text) {
      var m = text.match(re);
      if (m) {
        return '[[!bu;' + color + ';;wiki]' + m[1] + ']';
      } else {
        return '[[;' + color + ';]' + text + ']';
      }
    }).join('');
  } else {
    return '[[;' + color + ';]' + (content || default_text) + ']';
  }
}

const phonemes = {
  'tS': 'tʃ', 'dZ': 'dʒ', 'J\\': 'ɟ', 'p\\': 'ɸ',
  'B': 'β', 'T': 'θ', 'D': 'ð', 'S': 'ʃ', 'Z':
  'ʒ', 'C': 'ç', 'j\\ (jj)': 'ʝ', 'G': 'ɣ', 'X\\':
  'ħ', '?\\': 'ʕ', 'h\\': 'ɦ', 'F': 'ɱ', 'J': 'ɲ',
  'N': 'ŋ', '4 (r)': 'ɾ', 'r (rr)': 'r', 'r\\':
  'ɹ', 'R': 'ʀ', 'P': 'ʋ', 'H': 'ɥ', 'I': 'ɪ',
  'E': 'ɛ', '{': 'æ', '2': 'ø', '9': 'œ', '1':
  'i', '@': 'ə', '6': 'ɐ', '3': 'ɜ', '}': 'ʉ',
  '8': 'ɵ', '&': 'ɶ', 'M': 'ɯ', '7': 'ɤ', 'V':
  'ʌ', 'A': 'ɑ', 'U': 'ʊ', 'O': 'ɔ', 'Q': 'ɒ',
  ',': 'ˌ', "'": 'ˈ', '_': 'ː'
};

function escape(text: string) {
  var chars = {
    '{': '&#123;',
    '}': '&#125;',
    '[': '&#91;',
    ']': '&#93;',
    '<': '&#60;',
    '>': '&#62;',
    "'": '&#39;'
  };
  Object.keys(chars).forEach(function(chr) {
    text = text.replace(new RegExp('\\' + chr, 'g'), chars[chr]);
  });
  return text;
}

function format(style: FormatStyle, color?: string) {
  const $ = (globalThis as any).$ as JQueryStatic;
  return function(_: any, text: string) {
    return text.split(format_split_re).map(function(txt: string) {
      function replace(_: any, st: string, cl: string, rest: string) {
        return '[['+style+st+';'+(color||cl)+rest;
      }
      if ($.terminal.is_formatting(txt)) {
        return txt.replace(format_begin_re, replace);
      } else {
        return '[[' + style + ';' + (color||'')+';]' +
          txt + ']';
      }
    }).join('');
  };
}

export default function wikipedia(text: string, title: string): string {
  const $ = (globalThis as any).$ as JQueryStatic;

  const templates = {
    'main': function(content: string) {
      return 'Main Article: ' + wiki_list(content) + '\n';
    },
    dunno: function() {
      return '?';
    },
    yes: function(content: string) {
      return word_template(content, '#0f0', 'yes');
    },
    no: function(content: string) {
      return word_template(content, '#f00', 'no');
    },
    partial: function(content: string) {
      return word_template(content, '#ff0', 'partial');
    },
    'lang-ar': function(content: string) {
      return '[[bu;#fff;;;Arabic_language]Arabic]: ' + content;
    },
    '(?:IPAc-en|IPA-en)': function(content: string) {
      if (!content.match(/\|/)) {
        return 'English pronunciation: /' + content + '/';
      }
      const keys: TemplateKeys<'pron' | 'lang' | 'us'> = {};
      let pron = '/' + content.split('|').map(function(text) {
        if (!text.match(/^\s*-\s*$|^\s*en-us/)) {
          var re = /^\s*(us|lang|pron|audio)\s*=?\s*(.*)/i;
          var m = text.match(re);
          if (m) {
            keys[m[1].toLowerCase().trim()] = m[2] || true;
          } else {
            Object.keys(phonemes).forEach(function(key) {
              text = text.replace(key, phonemes[key]);
            });
            return text;
          }
        }
      }).filter(Boolean).join('') + '/';
      pron = '[[!bu;#fff;;wiki;Help:IPA for English]' + pron + ']';
      if (keys.pron) {
        pron = 'pronunciation: ' + pron;
      }
      if (keys.lang) {
        pron = 'English ' + pron;
      }
      if (keys.us) {
        pron = 'US ' + pron;
      }
      return pron;
    },
    'quote box': function(content: string) {
      let quote = content.match(/\s*quote\s*=\s*("[^"]+"|[^|]+)/)[1];
      const bold_re = /'''([^']+(?:'[^']+)*)'''/g;
      quote = quote.replace(bold_re, function(_, bold) {
        return '][[bi;#fff;]' + bold + '][[i;;]';
      }).replace(/''([^']+(?:'[^']+)*)''/g, '$1').
        replace(/\[\[([^\]]+)\]\]/g, function(_, wiki) {
          wiki = wiki.split('|');
          if (wiki.length == 1) {
            return '][[!bui;#fff;;wiki]' + wiki[0] + '][[i;;]';
          } else {
            return '][[!bui;#fff;;wiki;' + wiki[0] + ']' +
              wiki[1] + '][[i;;]';
          }
        });
      var author = content.match(/\s*source\s*=\s*([^|]+)/)[1].replace(/^(—|-)/, '').trim();
      return '[[i;;]' + quote + ']\n-- ' + author;
    },
    quote: function(content: string) {
      const parts = content.replace(/^\s*\|/gm, '').
        split(/|(?![^\]]+\])/);
      var keys: TemplateKeys<'author'> = {};
      const result = parts.map(function(item) {
        var m = item.match(/\s*(\w+)\s*=\s*(.*)/);
        if (m) {
          if (!isNaN(+m[1])) {
            return m[2];
          } else {
            keys[m[1].toLowerCase()] = m[2];
            return '';
          }
        } else {
          return item;
        }
      }).join('');
      var author = '';
      if (keys.author) {
        author = keys.author;
      } else if (result.match(/^ /m)) {
        author = result.match(/^ (.*)/m)[1];
      }
      return '[[i;;]' + result.
        replace(/'''([^']+(?:'[^']+)*)'''/g, function(_, bold) {
          return '][[bi;#fff;]' + bold + '][[i;;]';
        }).
        replace(/''([^']+(?:'[^']+)*)''/g, '$1').
        replace(/\[\[([^\]]+)\]\]/g, function(_, wiki) {
          wiki = wiki.split('|');
          if (wiki.length == 1) {
            return '][[!bui;#fff;;wiki]' + wiki + '][[i;;]';
          } else {
            return '][[!bui;#fff;;wiki;' + wiki[0] + ']' +
              wiki[1] + '][[i;;]';
          }
        }) + ']' + (author ? '\n-- ' + author : '');
    },
    'Cat main': function(content: string) {
      return 'The main article for this [[!bu;#fff;;wiki' +
        ';Help:category]Category] is [[!bu;#fff;;wiki]' +
        content + ']\n';
    },
    'see also': function(content: string) {
      return 'See also ' + wiki_list(content) + '\n';
    },
    tag: function(content: string) {
      return escape('<'+content+'>...</' + content + '>');
    },
    '(?:official website|official)': function(content: string) {
      if (!content.match(/^http:/)) {
        content = 'http://' + content;
      }
      return '[[!;;;;' + content + ']Official Website]';
    },
    'IMDb name': function(content: string) {
      if (title) {
        var m = content.match(/id\s*=\s*([^|]+)/);
        let id: string;
        if (m) {
          id = m[1];
        } else {
          id = content;
        }
        var url = 'http://www.imdb.com/name/nm' + id;
        return '[[!;;;;' + url + ']' + title + '] ' +
          'at the [[Internet Movie Database]]';
      }
    },
    'youtube': function(content: string) {
      const parts = content.split('|');
      if (parts.length >= 2) {
        var url = 'https://www.youtube.com/watch?v=' + parts[0];
        return '(YT): [[!;;;;' + url + ']' + parts[1] + ']';
      }
    },
    '(?:tlx|tl)': function(content: string) {
      const parts = content.split('|');
      var params = '';
      if (parts.length > 1) {
        params = '|' + parts.slice(1).join('|');
      }
      return escape('{{') + '[[!bu;#fff;;wiki;Template:' + parts[0] +
        ']' + parts[0] + ']' + params + escape('}}');
    },
    '(?:as of|Asof)': function(content: string) {
      const parts = content.split('|');
      const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
      ];
      const date = [];
      const keys: TemplateKeys<'since' | 'lc' | 'df'> = {};
      for (var i=0; i<parts.length; ++i) {
        const m = parts[i].match(/(\w+)\s*=\s*(\w+)/);
        if (m) {
          keys[m[1].toLowerCase()] = m[2];
        } else {
          date.push(parts[i]);
        }
      }
      let str = 'As of ';
      if (keys.since) {
        str = 'Since ';
      }
      if (keys.lc == 'y') {
        str = str.toLowerCase();
      }
      if (keys.df && keys.df.toLowerCase() == 'us') {
        return str + (date[1] ? months[date[1]-1]+' ' : '') +
          (date[2] ? date[2]+', ':'') + date[0];
      } else {
        return str + (date[2] ? date[2]+' ' : '') +
          (date[1] ? months[date[1]-1]+' ' : '') + date[0];
      }
    }
  };

  text = $.terminal.amp(text.replace(/&nbsp;/g, ' ')).
    replace(/^\s*;\s*([^:]+):\s*/gm, function(_, header) {
      return '\n' + header + '\n\n';
    }).
    //replace(/(''\[\[[^\]]+\]])(?!'')/, '$1\'\'').
    replace(/^\s*(?:=+)\s*([^=]+)\s*\1/gm, function(_: string, text: string) {
      text = text.replace(/''([^']+)''/g, function(_: string, text: string) {
        return '][[bi;#fff;]' + text + '][[b;#fff;]';
      });
      return '\n[[b;#fff;]' + text + ']\n';
    }).
    replace(/\[\.\.\.\]/g, '...').
    replace(/<code><pre>(.*?)<\/pre><\/code>/g, function(_: string, str: string) {
      return escape(str);
    }).
    replace(/\[\[(?=<nowki\s*\/>)/, function(str: string) {
      return escape(str);
    }).
    replace(/\|\s*url={{google books[^}]+}}/g, '|url=').
    replace(/{{Cite([^}]+)}}(?![\s\n]*<\/ref>)/gi, function(_: string, cite: string) {
      var title = cite.match(/title\s*=\s*([^|]+)/i);
      var url = cite.match(/url\s*=\s*([^|]+)/i);
      if (title) {
        if (url && url[1].match(/^http/)) {
          return '[[!;;;;' + url[1].trim() + ']' +
            title[1].trim() + ']';
        } else {
          return title[1].trim();
        }
      } else {
        return '';
      }
    }).
    replace(/<nowiki>([\s\S]*?)<\/nowiki>/g, function(_: string, wiki: string) {
      return escape(wiki);
    });
  const strip = [
    /<ref[^>]*\/>/g, /<ref[^>]*>[\s\S]*?<\/ref>/g,
    /\[\[(file|image):[^[\]]*(?:\[\[[^[\]]*]][^[\]]*)*]]/gi,
    /<!--[\s\S]*?-->/g, /<gallery>[\s\S]*?<\/galery>/g
  ];
  strip.forEach(function(re) {
    text = text.replace(re, '');
  });
  for (const template in templates) {
    const re = new RegExp('{{' + template + '\\|?(.*?)}}', 'gi');
    text = text.replace(re, function(_, content) {
      return templates[template](content) || '';
    });
  }
  // strip the rest of the templates
  const re = /{{[^{}]*(?:{(?!{)[^{}]*|}(?!})[^{}]*)*}}/g;
  do {
    var cnt=0;
    text = text.replace(re, function (_) {
      cnt++; return '';
    });
  } while (cnt);


  text = text.replace(/\[\[([^\]]+)\]\]/g, function(_: any, gr: string) {
    if (_.match(format_begin_re)) {
      // empty terminal formatting
      return _;
    }
    if (_.match(/<nowiki[^>]*>/)) {
      return $.terminal.escape_brackets(_);
    }
    const parts = gr.replace(/^:(Category)/i, '$1').split('|');
    let result: string;
    if (parts.length == 1) {
      result = '[[!bu;#fff;;wiki]' + parts[0] + ']';
    } else {
      parts[1] = parts[1].replace(/''([^']+)''/gm, function(_: any, g: string) {
        return '][[!bui;#fff;;wiki;' + parts[0] + ']' + g + ']' +
          '[[!bu;#fff;;wiki;' + parts[0] + ']';
      });
      result = '[[!bu;#fff;;wiki;' + parts[0] + ']' + parts[1] + ']';
    }
    return result;
  }).
    replace(/'''((?:[^']|[^']'[^'])+)'''/g, function(_, g) {
      return '[[b;#fff;]' + g.replace(/'/g, '&#39;') + ']';
    }).
    replace(/'''((?:([^']+|[\s\S]+(?:(?=[^']''[^'])|(?![^']'''[^'])))))'''(?=[^']|$)/g, '[[b;#fff;]$1]').
    replace(/^(\n\s*)*/, '').
    replace(/([^[])\[(\s*(?:http|ftp)[^\[ ]+) ([^\]]+)\]/g,
            function(_, c, url, text) {
              function rep(_: any, str: string) {
                return '][[!i;;;;' + url + ']' + str +
                  '][[!;;;;' + url + ']';
              }
              text = text.replace(/'''([^']*(?:'[^']+)*)'''/g,
                                  '$1').
                replace(/''([^']*(?:'[^']+)*)''/g,
                        rep);
              return c + '[[!;;;;' + url + ']' + text + ']';
            }).
    replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, format('i')).
    replace(/''([^']+(?:'[^']+)*)''/g, format('i')).
    replace(/{\|.*\n([\s\S]*?)\|}/g, function(_, table) {
      const head_re = /\|\+(.*)\n/;
      let have_header: boolean;
      const m = table.match(head_re);
      let head: string;
      if (m) {
        head = m[1].trim().
          replace(/\[\[([^;]+)(;[^\]]+\][^\]]+\])/g,
                  function(_: any, style: string, rest: string) {
                    return '][[' + style + 'i' +
                      rest + '[[i;;]';
                  });
      }
      table = table.replace(/^.*\n/, '').
        replace(head_re, '').split(/\|\-.*\n/);
      if (table.length == 1) {
        have_header = false;
        table = table[0].replace(/[\n\s]*$/, '').
          split(/\n/).map(function(text: string) {
            return [text];
          });
      } else {
        if (table[0].match(/^!|\n!/)) {
          have_header = true;
        }
        table = table.map(function(text: string) {
          var re = /^[|!]|\n[|!]|\|\|/;
          if (text.match(re)) {
            return text.split(re).map(function(item: string) {
              return item.replace(/\n/g, '').trim();
            }).filter(function(_: any, i: number) {
              return i !== 0;
            });
          } else {
            return [];
          }
        }).filter(function(row: string[]) {
          return row.length;
        });
      }
      var result = '';
      if (head) {
        result = '\n[[i;;]' + head + '\n';
      }
      result += ascii_table(table, have_header);
      return result;
    }).replace(/#(REDIRECT)/i, '&#35;$1').
    replace(/(^\*.*(\n|$))+/gm, function(list) { // unordered list
      return '\n' + list;
    }).
    replace(/(^#.*(\n|$))+/gm, function(list) { // numbered list
      const parts = list.split(/^#\s*/m).slice(1);
      return '\n' + parts.map(function(line, i) {
        return (list.length > 9 && i < 9 ? ' ' : '') + (i+1) +
          '. ' + line;
      }).join('') + '\n';
    }).split(/(<pre[^>]*>[\s\S]*?<\/pre>)/).map(function(text) {
      const m = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
      const re = /([^\n])\n(?![\n*|+]|\s*[0-9]|:|--|\[\[!bu;#fff;;wiki\]Category)/gi;
      if (m) {
        return m[1];
      } else {
        return text.replace(re, '$1 ').replace(/ +/g, ' ');
      }
    }).join('').
    replace(/<[^>]+>/gm, ''). // strip rest of html tags
    replace(/\n{3,}/g, '\n\n'). // remove larger newline space
    replace(/\*(\S)/g, '* $1'); // Fix lists
  return text;
}
