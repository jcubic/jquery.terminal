import type { JQueryTerminal, JQueryStatic } from 'jquery.terminal';
import type { Deferred } from 'jquery';

import { prism } from '@site/src/utils';
import colors from './colors';

type FileEntry = {
  name: string;
  type: string;
};

type DirResult = Record<'dirs' | 'files', FileEntry[]>;

export default function github(this: JQueryTerminal, ...args: string[]) {
  const $ = (globalThis as any).$ as JQueryStatic;
  const term = this;
  const options = $.terminal.parse_options(args);
  const user = options.u ?? options.username;
  const repo = options.r ?? options.repo;
  const branch = options.b ?? options.branch;
  const base = 'https://api.github.com/repos';
  let base_content: DirResult;
  let base_defer: typeof Deferred<void>;

  async function dir(path: string): Promise<DirResult> {
    let url = `${base}/${user}/${repo}/contents/${path.replace(/\/$/, '')}`;
    if (branch) {
      url += `?ref=${branch}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Wrong directory ${path}`);
    }
    const data = await res.json();
    return {
      dirs: data.filter(function(object: {type: string}) {
        return object.type == 'dir';
      }),
      files: data.filter(function(object: {type: string}) {
        return object.type == 'file';
      })
    };
  }
  async function file(path: string) {
    const origin = 'https://raw.githubusercontent.com';
    const url = `${origin}/${user}/${repo}/${branch}/${path}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`file ${path} not found`);
    }
    return prism(path, await res.text());
  }
  function list(data: DirResult) {
    term.echo(data.dirs.map(function(object: {name: string}) {
      return colors.blue(object.name);
    }).concat(data.files.map(function(object: {name: string}) {
      return object.name;
    })).join('\n'));
  }
  async function print(cmd, callback) {
    return callback.call(term, await file(cwd + cmd.args[0]));
  }
  if (user && repo) {
    var cwd = '/';
    base_defer = $.Deferred();
    dir('').then(function(data) {
      base_content = data;
      base_defer.resolve();
    });
    term.push(async function(command) {
      var cmd = $.terminal.parse_command(command);
      if (cmd.name == 'cd') {
        var path = cmd.args[0];
        if (cmd.args[0] == '..') {
          path = cwd.replace(/[^\/]+\/$/, '');
        } else {
          path = (cwd == '/' ? '' : cwd) + cmd.args[0];
        }
        term.pause();
        base_defer = $.Deferred();
        base_content = await dir(path);
        cwd = path;
        if (!cwd.match(/\/$/)) {
          cwd += '/';
        }
        base_defer.resolve();
      } else if (cmd.name == 'less') {
        await print(cmd, term.less);
      } else if (cmd.name == 'cat') {
        await print(cmd, term.echo);
      } else if (cmd.name == 'ls') {
        if (cmd.args.length == 0) {
          list(base_content);
        } else {
          list(await dir(cmd.args[0]));
        }
      } else if (cmd.name === 'help') {
        term.echo('available commands: cd, ls, less, cat');
      } else {
        term.echo('unknown command ' + cmd.name + ' try [[;#fff;]help]');
      }
    }, {
      prompt: function(callback) {
        var name = colors.green(user + '&#64;' + repo);
        var path = cwd;
        if (path != '/') {
          path = '/' + path.replace(/\/$/, '');
        }
        callback(name + colors.grey(':') + colors.blue(path) + '$ ');
      },
      name: 'github',
      completion: async function(string) {
        var command = $.terminal.parse_command(this.get_command());
        var m = string.match(/(.*)\/([^\/]+)/);
        if (m) {
          const data = await dir(m[1]);
          if (command.name == 'cd') {
            return data.dirs.map(function(object) {
              return m[1] + '/' + object.name + '/';
            });
          } else {
            return data.files.map(function(object) {
              return m[1] + '/' + object.name + '/';
            }).concat(data.dirs.map(function(object) {
              return m[1] + '/' + object.name;
            }));
          }
        } else {
          await base_defer.promise;
          if (command.name == 'cd') {
            return base_content.dirs.map(function(object) {
              return object.name + '/';
            });
          } else {
            return base_content.files.map(function(object) {
              return object.name;
            }).concat(base_content.dirs.map(function(object) {
              return object.name + '/';
            }));
          }
        }
      }
    });
  } else {
    term.echo(`Browse github repo using unix commands

usage:
github -u <user> -r <repo>
  -u | --username <user>
  -r | --repo <repo>
`);
  }
}
