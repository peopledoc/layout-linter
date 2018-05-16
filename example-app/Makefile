clean:
	rm -Rf node_modules/


install:
	clear
	npm install


build:
	rm -Rf index.html
	clear
	node build

serve:
	make build
	open -na "Google Chrome" --args --incognito http://127.0.0.1:8080/
	clear
	http-server
