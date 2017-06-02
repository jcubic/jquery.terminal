VERSION=1.5.0
SED=sed
CP=cp
RM=rm
CAT=cat
DATE=`date -uR`
GIT=git
BRANCH=`git branch | grep '^*' | sed 's/* //'`
ESLINT=./node_modules/.bin/eslint
UGLIFY=./node_modules/.bin/uglifyjs
JSONLINT=./node_modules/.bin/jsonlint
ISTANBUL=./node_modules/.bin/istanbul
JASMINE=./node_modules/.bin/jasmine-node
CSSNANO=./node_modules/.bin/cssnano
SPEC_CHECKSUM=`md5sum spec/terminalSpec.js | cut -d' ' -f 1`

ALL: Makefile .$(VERSION) js/jquery.terminal-$(VERSION).js js/jquery.terminal.js js/jquery.terminal-$(VERSION).min.js js/jquery.terminal.min.js css/jquery.terminal-$(VERSION).css css/jquery.terminal-$(VERSION).min.css css/jquery.terminal.min.css css/jquery.terminal.css README.md www/Makefile terminal.jquery.json bower.json package.json

bower.json: bower.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" bower.in > bower.json

package.json: package.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" package.in > package.json

js/jquery.terminal-$(VERSION).js: js/jquery.terminal-src.js .$(VERSION)
	$(GIT) branch | grep '* devel' > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e "s/{{DATE}}/$(DATE)/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js || $(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js

js/jquery.terminal.js: js/jquery.terminal-$(VERSION).js
	$(CP) js/jquery.terminal-$(VERSION).js js/jquery.terminal.js

js/jquery.terminal-$(VERSION).min.js: js/jquery.terminal-$(VERSION).js
	$(UGLIFY) -o js/jquery.terminal-$(VERSION).min.js --comments --mangle -- js/jquery.terminal-$(VERSION).js

js/jquery.terminal.min.js: js/jquery.terminal-$(VERSION).min.js
	$(CP) js/jquery.terminal-$(VERSION).min.js js/jquery.terminal.min.js

css/jquery.terminal-$(VERSION).css: css/jquery.terminal-src.css .$(VERSION)
	$(GIT) branch | grep devel > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e "s/{{DATE}}/$(DATE)/g" css/jquery.terminal-src.css > css/jquery.terminal-$(VERSION).css || $(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" css/jquery.terminal-src.css > css/jquery.terminal-$(VERSION).css

css/jquery.terminal.css: css/jquery.terminal-$(VERSION).css .$(VERSION)
	$(CP) css/jquery.terminal-$(VERSION).css css/jquery.terminal.css

css/jquery.terminal.min.css: css/jquery.terminal-$(VERSION).min.css
	$(CP) css/jquery.terminal-$(VERSION).min.css css/jquery.terminal.min.css

css/jquery.terminal-$(VERSION).min.css: css/jquery.terminal-$(VERSION).css
	$(CSSNANO) --no-discardUnused css/jquery.terminal-$(VERSION).css css/jquery.terminal-$(VERSION).min.css

README.md: README.in .$(VERSION)
	$(GIT) branch | grep '* devel' > /dev/null && $(SED) -e "s/{{VER}}/DEV/g" -e "s/{{BRANCH}}/$(BRANCH)/g" -e "s/{{CHECKSUM}}/$(SPEC_CHECKSUM)/" < README.in > README.md || $(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{BRANCH}}/$(BRANCH)/g" -e "s/{{CHECKSUM}}/$(SPEC_CHECKSUM)/" < README.in > README.md

.$(VERSION): Makefile
	touch .$(VERSION)

Makefile: Makefile.in
	$(SED) -e "s/{{VER""SION}}/"$(VERSION)"/" Makefile.in > Makefile

terminal.jquery.json: manifest .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" manifest > terminal.jquery.json

www/Makefile: $(wildcard www/Makefile.in) Makefile .$(VERSION)
	@test "$(BRANCH)" = "master" -a -d www && $(SED) -e "s/{{VER""SION}}/$(VERSION)/g" www/Makefile.in > www/Makefile || true

test:
	$(JASMINE) --captureExceptions --verbose --junitreport --color --forceexit spec

cover:
	$(ISTANBUL) cover node_modules/jasmine/bin/jasmine.js

coveralls:
	$(ISTANBUL) cover node_modules/jasmine/bin/jasmine.js --captureExceptions && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls -v

eslint:
	$(ESLINT) js/jquery.terminal-src.js
	$(ESLINT) js/dterm.js
	$(ESLINT) js/xml_formatting.js
	$(ESLINT) js/unix_formatting.js

jsonlint: package.json bower.json
	$(JSONLINT) package.json > /dev/null
	$(JSONLINT) bower.json > /dev/null

lint: eslint jsonlint
