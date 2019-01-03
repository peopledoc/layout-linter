install:
	clear
	rm -Rf node_modules/
	npm install

OPEN_CHROMIUM_BROWSER:=chromium-browser --incognito http://127.0.0.1:8080/ 2>/dev/null
OPEN_CHROME_BROWSER:=open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/ 2>/dev/null
OPEN_FIREFOX_BROWSER:=firefox --private-window http://127.0.0.1:8080/ 2>/dev/null

run-demo:
	clear
	node ./demo/build
	http-server &
	${OPEN_CHROMIUM_BROWSER} || ${OPEN_FIREFOX_BROWSER} || ${OPEN_CHROME_BROWSER} || echo 'No Browser available'


test:
	clear
	npm run test
