VERSION=0.8.7
COMPRESS=uglifyjs
SED=sed
CP=cp

ALL: js/jquery.terminal-$(VERSION).js js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js README.md www/Makefile terminal.jquery.json bower.json

bower.json: bower.in
	$(SED) -e "s/{{VER}}/$(VERSION)/g" bower.in > bower.json

js/jquery.terminal-$(VERSION).js: js/jquery.terminal-src.js .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/`date -uR`/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js

js/jquery.terminal-$(VERSION).min.js: js/jquery.terminal-$(VERSION).js
	$(COMPRESS) -o js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-$(VERSION).js

js/jquery.terminal-min.js: js/jquery.terminal-$(VERSION).min.js
	$(CP) js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js

README.md: README.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" < README.in > README.md

.$(VERSION):
	touch .$(VERSION)

terminal.jquery.json: manifest .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" manifest > terminal.jquery.json

www/Makefile: Makefile
	test -d www && $(SED) -e "s/{{VERSION}}/$(VERSION)/g" www/Makefile.in > www/Makefile || true

