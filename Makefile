
CURRENT_UID = $(shell id -u):$(shell id -g)
DIST_DIR ?= $(CURDIR)/dist
REPOSITORY_NAME ?= cv
REPOSITORY_OWNER ?= dduportal
REPOSITORY_BASE_URL ?= https://github.com/$(REPOSITORY_OWNER)/$(REPOSITORY_NAME)

### TRAVIS_BRANCH == TRAVIS_TAG when a build is triggered by a tag as per https://docs.travis-ci.com/user/environment-variables/
ifndef TRAVIS_BRANCH
# For running outside Travis
TRAVIS_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
endif

SOURCE_URL = $(REPOSITORY_BASE_URL)/tree/$(TRAVIS_BRANCH)

ifneq (TRAVIS_BRANCH, "master")
CV_URL = https://$(REPOSITORY_OWNER).github.io/$(REPOSITORY_NAME)/$(TRAVIS_BRANCH)
else
CV_URL = https://$(REPOSITORY_OWNER).github.io/$(REPOSITORY_NAME)
endif


export CV_URL REPOSITORY_URL REPOSITORY_BASE_URL TRAVIS_BRANCH

.PHONY: all
all: clean build

.PHONY: build
build: html pdf

.PHONY: html
html:
	docker-compose up cv

.PHONY: pdf
pdf:
	docker-compose up pdf

.PHONY: clean
clean:
	rm -rf $(DIST_DIR)

# .PHONY: test
# test:
# 	echo test

# .PHONY: deploy
# deploy:
# 	echo deploy
