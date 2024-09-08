import fs from 'fs/promises';

fs.readFile('../package.json', 'utf8').then(json => {
  const { version } = JSON.parse(json);
  return fs.writeFile('version.json', JSON.stringify(version));
});
