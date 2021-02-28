install:
	npm install

gendiff:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n '--experimental-vm-modules' jest
