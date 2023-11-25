## Contributing

All contributions are welcome, even non-tech ones. To contribute you need to fork, then clone the repo:

```
git clone git@github.com:your-name/jquery.terminal.git
```

Please only modify `js/jquery.terminal-src.js`/`css/jquery.terminal-src.css` files (and extensions). You can run `make` but you may have conflicts. Other contributors push commits with their builds (you may have conflicts because there is a build date and time in the build file). Make sure you're on the devel branch, and create a PR to the devel branch as well. You could make fixes to examples and the README directly to the master, but you could also add them to the devel branch as well.

Non-technical contributions are also welcome. If you find a bug in the documentation on the website, you can file an issue to [jcubic/jquery.terminal-www](https://github.com/jcubic/jquery.terminal-www).

## List of contributors with avatars

To update the list, the script needs to be run when changes are merged to master, and since all merges are done on
devel. I need to run the script when I release a new version. To help me remember if this is your first contribution,
please update the line `UPDATE_CONTRIBUTORS=1` in template/Makefile.in to reflect your contribution. It should be 1, which
is true (0 is false). On each build, it will show a red reminder message, and it will stop the build when run on master.

## Building the project

The process of building the project is very simple all you need is this:

```bash
clone https://github.com/jcubic/jquery.terminal.git
cd jquery.terminal
npm install
make
```

While developing you can use -src versions, they are working fine. Make will just create
Release files that have proper version number, create minified files and build emoji
css.

## Test

You should run test to make sure you don't break anything, to run tests from browser you need to run

```bash
npm install
make test
```

and run ESlint and JSONLint using:

```bash
make lint
```

## README

if you want to modify readme please modify the one in `./templates` directory, because
that one is source file with {{VER}} markers that get filled with current version when
running `make`.

## Release Cycle

* New version is developed on devel branch
* When bug is fixed (or feature implemented) it's not closed only `resolved` label is added
* Each fix and feature need to be added to CHANGELOG.md file
* After a random number of features and bugfixes are done, the code needs to be merged with master

```bash
git checkout master
git merge devel --no-ff -m 'merge with devel'
```

* then the next version needs to be created, and the last version from the CHANGELOG needs to be used
to call a version script that renames files that have a version at the end.

```bash
./scripts/version 2.21.0
make
git commit -am 'version 2.21.0'
git push
git tag 2.21.0
git push --tags
```

**NOTE:** If something is wrong (e.g., Travis CI failed), the tag can be removed and a fix can be added in a new commit and the tag readded again.

* New version on GitHub is released. You need to wait a bit to have confirmationfrom CI that the build was successful. In the meantime, you can add Release Notes  on GitHub. Just click releases -> draft new release, then pick the version and copy and paste what's in the CHANGELOG.md file.

* When new release is done, issues that have `resovled` label are closed.

* After you get confirmation that CI (travis) run successfully you can close issues
  labeled with `resolved` and release to npm. By calling:

```bash
make publish
```

* Script will clone the repo (just in case you have lot of files in repo that you
  don't want to publish to npm) into ./npm directory and run `npm publish`,
  after that it will delete the directory.

* New version is ready.

