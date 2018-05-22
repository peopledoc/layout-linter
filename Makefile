install:
	clear
	rm -Rf node_modules/
	npm install


run-demo:
	clear
	node ./demo/build
	open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/
	http-server


test:
	clear
	npm run test

test-debug:
	clear
	LAYOUT_LINTER_DEBUG='true' npm run test
