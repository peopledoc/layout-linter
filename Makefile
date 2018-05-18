install:
	clear
	rm -Rf node_modules/
	npm install


test:
	rm -Rf ./index.html
	node ./tests/dummy-app/build
	open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/
	clear
	http-server
