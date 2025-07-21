VERSION=2.45.2
SED=sed
CD=cd
NPM=npm
CP=cp
ECHO=echo
RM=rm
CAT=cat
DATE=`date -uR`
GIT=LC_ALL=C git
BRANCH=`git branch | grep '^*' | sed 's/* //'`
BRANCH_SAFE=`git branch | grep '^*' | sed 's/* //' | sed 's/\//\\\\\//g'`
UGLIFY=../node_modules/.bin/uglifyjs
JSONLINT=./node_modules/.bin/jsonlint
JEST=./node_modules/.bin/jest
CSSNANO=./scripts/cssnano.js
ESLINT=./node_modules/.bin/eslint
TSC=./node_modules/.bin/tsc
SPEC_CHECKSUM=`md5sum __tests__/terminal.spec.js | cut -d' ' -f 1`
COMMIT=`git log -n 1 | grep '^commit' | sed 's/commit //'`
TOKEN=cat .github.token | tr -d '\n'
URL=`git config --get remote.origin.url`
skip_re="[xfi]it\\(|[fdx]describe\\("
UPDATE_CONTRIBUTORS=0

.PHONY: coverage test coveralls lint.src eslint skipped_tests jsonlint publish lint tscheck publish-guthub emoji

ALL: Makefile .$(VERSION) terminal.jquery.json bower.json package.json assets/ascii_art.svg js/jquery.terminal.js js/jquery.terminal.min.js js/jquery.terminal.min.js.map  css/jquery.terminal.min.css css/jquery.terminal.min.css.map css/jquery.terminal.css README.md import.html js/terminal.widget.js css/emoji.css update-contributors

bower.json: templates/bower.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" templates/bower.in > bower.json

package.json: .$(VERSION)
	$(SED) -i 's/"version": "[^"]\+"/"version": "$(VERSION)"/' package.json

js/jquery.terminal.js: js/jquery.terminal-src.js .$(VERSION)
	$(GIT) branch | grep '* devel' > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e "s/{{DATE}}/$(DATE)/g" js/jquery.terminal-src.js > js/jquery.terminal.js || $(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" js/jquery.terminal-src.js > js/jquery.terminal.js

js/jquery.terminal.min.js js/jquery.terminal.min.js.map: js/jquery.terminal.js
	$(CD) js && $(UGLIFY) -o jquery.terminal.min.js --comments --mangle --source-map "includeSources,url='jquery.terminal.min.js.map'" -- jquery.terminal.js && $(ECHO) >> jquery.terminal.min.js

css/jquery.terminal.css: css/jquery.terminal-src.css .$(VERSION)
	$(GIT) branch | grep '* devel' > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e "s/{{DATE}}/$(DATE)/g" css/jquery.terminal-src.css > css/jquery.terminal.css || $(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" css/jquery.terminal-src.css > css/jquery.terminal.css

css/jquery.terminal.min.css css/jquery.terminal.min.css.map: css/jquery.terminal.css
	$(CSSNANO) css/jquery.terminal.css css/jquery.terminal.min.css

README.md: templates/README.in .$(VERSION) __tests__/terminal.spec.js
	$(GIT) branch | grep '* devel' > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e \
	"s/{{BRANCH}}/$(BRANCH_SAFE)/g" -e "s/{{CHECKSUM}}/$(SPEC_CHECKSUM)/" \
	-e "s/{{COMMIT}}/$(COMMIT)/g" < templates/README.in > README.md || $(SED) -e \
	"s/{{VER}}/$(VERSION)/g" -e "s/{{BRANCH}}/$(BRANCH_SAFE)/g" -e \
	"s/{{CHECKSUM}}/$(SPEC_CHECKSUM)/" -e "s/{{COMMIT}}/$(COMMIT)/g" < templates/README.in > README.md

.$(VERSION): Makefile
	touch .$(VERSION)

Makefile: templates/Makefile.in
	$(SED) -e "s/{{VER""SION}}/"$(VERSION)"/" templates/Makefile.in > Makefile

import.html: templates/import.in
	$(SED) -e "s/{{BRANCH}}/$(BRANCH_SAFE)/g" templates/import.in > import.html

js/terminal.widget.js: js/terminal.widget.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" js/terminal.widget.in > js/terminal.widget.js

terminal.jquery.json: manifest .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" manifest > terminal.jquery.json

css/emoji.css: ./scripts/mkemoji .$(VERSION)
	./scripts/mkemoji $(VERSION) > css/emoji.css

emoji:
	./scripts/mkemoji $(VERSION) > css/emoji.css

test:
	$(JEST) --coverage

test-watch:
	$(JEST) --coverage --watch

assets/ascii_art.svg: templates/ascii_art.svg .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" templates/ascii_art.svg > assets/ascii_art.svg

test-accept-snapshots:
	$(JEST) --coverage --updateSnapshot

coveralls:
	$(CAT) ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

lint.src:
	$(ESLINT) js/jquery.terminal-src.js

eslint:
	$(ESLINT) js/jquery.terminal-src.js
	$(ESLINT) js/dterm.js
	$(ESLINT) js/xml_formatting.js
	$(ESLINT) js/unix_formatting.js
	$(ESLINT) js/prism.js
	$(ESLINT) js/less.js
	$(ESLINT) js/emoji.js
	$(ESLINT) js/pipe.js
	$(ESLINT) js/autocomplete_menu.js
	$(ESLINT) js/echo_newline.js

skipped_tests:
	@! grep -E $(skip_re) __tests__/terminal.spec.js

tscheck:
	$(TSC) --noEmit --project tsconfig.json

jsonlint: package.json bower.json
	$(JSONLINT) -cq package.json
	$(JSONLINT) -cq bower.json

publish:
	test -e npm && ( $(CD) npm && $(GIT) pull ) || true
	test -e npm || $(GIT) clone $(URL) --depth 1 npm
	$(CD) npm && $(NPM) publish && $(CD) .. && $(RM) -rf npm

publish-guthub: .github.token
	$(SED) "s/{{TOKEN}}/`$(TOKEN)`/" templates/npmrc.tmpl > .npmrc
	$(SED) -e "s/{{VER}}/$(VERSION)/g" templates/package.git > package.json

contributors.json:
	./scripts/contributors.mjs -u jcubic -r jquery.terminal > contributors.json

contributors-www.json:
	./scripts/contributors.mjs -u jcubic -r jquery.terminal-www > contributors-www.json

contributors: contributors-www.json contributors.json
	./scripts/update-contributors-readme jquery.terminal contributors.json "CONTRIBUTORS" templates/README.in
	./scripts/update-contributors-readme jquery.terminal-www contributors-www.json "CONTRIBUTORS-WWW" templates/README.in
	./scripts/update-contributors-readme jquery.terminal-www contributors-www.json "CONTRIBUTORS" www/README.md
	./scripts/update-contributors-package.js -j contributors.json -f package.json
	./scripts/update-contributors-package.js -j contributors.json -f templates/package.git

lint: eslint jsonlint

checkout:
	@$(GIT) status | sed "1,/not staged/d" | grep modified | sed "s/.*modified:\s*\(.*\)/\1/" | tr '\n' ' ' | sed -e "s/.*/git checkout &; touch &/" | bash


update-contributors:
	@if [ $(UPDATE_CONTRIBUTORS) = 1 ]; then\
		echo -e "\x1b[31mUpdate Contributors\x1b[m";\
		if [ $(BRANCH) = 'master' ]; then \
			false;\
		fi;\
	fi
