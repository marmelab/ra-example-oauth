.PHONY: build

install:
	yarn install

start:
	yarn start

build:
	rm -rf ./docs
	NODE_ENV=production yarn build
	mv build docs
