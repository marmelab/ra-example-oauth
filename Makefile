.PHONY: build

install:
	yarn install

run:
	cd app && yarn start

build:
	rm -rf ./docs
	cd app && NODE_ENV=production yarn build
	mv app/build docs
