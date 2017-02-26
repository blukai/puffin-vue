#!/bin/bash

set -e

REPO=`git config remote.origin.url`
# Use token for pushing below
TOKENED=${REPO/github.com/$GH_TOKEN@github.com}

git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.org"

git clone --branch gh-pages $REPO deploy

rm -rf deploy/build index.html 404.html

cp index.html 404.html
mv -v build index.html 404.html deploy

cd deploy

git remote add upstream $TOKENED

git add --all .

if [ -n "$(git status --porcelain)" ];
then
  git commit -m "Build $TRAVIS_COMMIT"
  git push --quiet upstream HEAD:gh-pages
else
  exit 0
fi
