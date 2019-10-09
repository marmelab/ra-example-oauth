.PHONY: build

install:
	yarn install

run:
	yarn start

build:
	rm -rf ./docs
	NODE_ENV=production yarn build
	mv build docs
