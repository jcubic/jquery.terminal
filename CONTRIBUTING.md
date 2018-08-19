## Contributing

All contribution are welcome even not tech one. To contribute you need to fork, then clone the repo:

```
git clone git@github.com:your-name/jquery.terminal.git
```

Please only modify `js/jquery.terminal-src.js`/`css/jquery.terminal-src.css` files. You can run `make`, but you may have conflicts others push commits with their build (you may have conflict because there is build date/time in build file) make sure you're on devel branch and create PR to devel brach as well, fixes to examples and README can be made directly to master but they could also be made to devel.

Non tech contribution are also welcome, if you find a bug in documentation on the website you can file an issue to [jcubic/jquery.terminal-www](https://github.com/jcubic/jquery.terminal-www).


## Test

You should run test to make sure you don't break anything, to run tests from browser you need to run

```
npm install
make test
```

and run ESlint and JSONLint using:

```
make lint
```
you can also run test coverage using

```
make coverage
```

## README

if you want to modify readme please modify the one in templates directory because that one is source file with {{VER}}
markers that get filled with current version when running `make`.
