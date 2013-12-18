VERSION=0.7.12
JSC=java -jar bin/closure.bin/compiler.jar --js
SED=sed
CP=cp

ALL: js/jquery.terminal-$(VERSION).js js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js README.md terminal.jquery.json

js/jquery.terminal-$(VERSION).js: js/jquery.terminal-src.js .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/`date -uR`/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js

js/jquery.terminal-$(VERSION).min.js: js/jquery.terminal-$(VERSION).js
	$(JSC) js/jquery.terminal-$(VERSION).js > js/jquery.terminal-$(VERSION).min.js

js/jquery.terminal-min.js: js/jquery.terminal-$(VERSION).min.js
	$(CP) js/jquery.terminal-$(VERSION).min.js js/jquery.terminal-min.js

README.md: README.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" < README.in > README.md

.$(VERSION):
	touch .$(VERSION)

terminal.jquery.json: manifest .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" manifest > terminal.jquery.json

clean:
	-rm -f js/jquery.terminal-0.*.js js/jquery.terminal-0.*.min.js js/jquery.terminal.js js/jquery.terminal.min.js js/jquery.terminal-min.js README.md terminal.jquery.json

.PHONY: ALL clean
