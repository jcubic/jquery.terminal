VERSION=0.9.0_dev
COMPRESS=uglifyjs
SED=sed
CP=cp
RM=rm
CAT=cat
DATE=`date -uR`

ALL: js/jquery.terminal-$(VERSION).js js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js css/jquery.terminal-$(VERSION).css css/jquery.terminal.css README.md www/Makefile terminal.jquery.json bower.json

bower.json: bower.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" bower.in > bower.json

js/jquery.terminal-$(VERSION).js: js/jquery.terminal-src.js .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js

js/jquery.terminal-$(VERSION).min.js: js/jquery.terminal-$(VERSION).js
	$(COMPRESS) -o js/tmp.min.js js/jquery.terminal-$(VERSION).js
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" copy > copy.tmp
	$(CAT) copy.tmp js/tmp.min.js > js/jquery.terminal-$(VERSION).min.js
	$(RM) js/tmp.min.js copy.tmp

js/jquery.terminal-min.js: js/jquery.terminal-$(VERSION).min.js
	$(CP) js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js

css/jquery.terminal-$(VERSION).css: css/jquery.terminal-src.css .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" css/jquery.terminal-src.css > css/jquery.terminal-$(VERSION).css

css/jquery.terminal.css: css/jquery.terminal-$(VERSION).css .$(VERSION)
	cp css/jquery.terminal-$(VERSION).css css/jquery.terminal.css

README.md: README.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" < README.in > README.md

.$(VERSION):
	touch .$(VERSION)

terminal.jquery.json: manifest .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" manifest > terminal.jquery.json

www/Makefile: www/Makefile.in Makefile
	test -d www && $(SED) -e "s/{{VERSION}}/$(VERSION)/g" www/Makefile.in > www/Makefile || true

test:
	echo "Need to be impleted"
