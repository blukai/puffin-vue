#!/bin/bash
set -e
shopt -s extglob

REPO=`git config remote.origin.url`
TOKENED=${REPO/github.com/$GH_TOKEN@github.com} # Use token for pushing below

git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.org"

git clone --branch gh-pages $REPO deploy

rm -rf deploy/!(\.git|\.*)
cp dist/index.html dist/404.html
cp -a dist/. deploy

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
