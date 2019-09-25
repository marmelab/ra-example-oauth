.PHONY: build

install:
	yarn install

start:
	yarn start

build:
	rm -rf ./docs
	yarn build
	mv build docs
