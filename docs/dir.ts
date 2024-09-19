import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function is_git_ignored(path_name: string) {
  if (path.basename(path_name) === '.git') {
    return true;
  }
  try {
    execSync(`git check-ignore -q "${path_name}"`);
    return true;
  } catch {
    return false;
  }
}

function dir(root: RegExp, dir_name: string) {
  function children(dir_name: string) {
    const result = {
      name: path.basename(dir_name),
      path: dir_name.replace(root, ''),
      children: []
    };
    const items = fs.readdirSync(dir_name, { withFileTypes: true });

    items.forEach(item => {
      const full_path = path.join(dir_name, item.name);

      if (is_git_ignored(full_path)) {
        return;
      }

      if (item.isDirectory()) {
        result.children.push(children(full_path));
      } else {
        result.children.push({ name: item.name });
      }
    });

    return result;
  }

  return {
    path: '/',
    name: null,
    children: children(dir_name)
  };
}

const root = process.argv[2];

if (!root) {
  console.error('Please provide a directory path');
  process.exit(1);
}

console.log(JSON.stringify(dir(new RegExp('^' + root), root), null, 2));
