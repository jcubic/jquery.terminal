## Contributing

All contribution are welcome even not tech one. To contribute you need to fork, then clone the repo:

```
git clone git@github.com:your-name/jquery.terminal.git
```

Then make sure you modify `js/jquery.terminal-src.js`/`css/jquery.terminal-src.css` files, run `make`, make sure you're on devel branch and create PR to devel brach as well, fixes to examples and README can be made directly to master but they could also be made to devel. To build the files (it only replace version, add current date in files and run minifiers on css and js) you need to have nodejs (on windows npm should be installed when you install nodejs) and run:

```
npm install
```

It will install all dependencies. To build the files you need to run:


```
make
```

You also need to use bash (on Windows you can use git-bash that will get installed when you install git).

Before you create pull request run `make lint`, it will be run by travis, and fix any errors that may show up, the linter used is [eslint](http://eslint.org/). You can find rules for eslint in [package.json](package.json).

Non tech contrubution are also wellcome, if you find a bug in documentation on the website you can file an issue to [jcubic/jquery.terminal-www](https://github.com/jcubic/jquery.terminal-www).


## Test

You should run test to make sure you don't break anything, to run tests from browser you need to run

```
npm install
make test
```

(You don't need to run npm again if you did it when buuilding the files)

you can also run test covarage using

```
make cover
```
