#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

if npm whoami | grep cmsgov -v
then
  echo "${RED}✘ Not logged in as correct NPM user"
  exit 0
fi

git stash
git checkout master
git pull --rebase

echo "${GREEN}Publishing packages...${NC}"
./node_modules/.bin/lerna exec npm publish  --scope "@cmsgov/design-system-*" --ignore "@cmsgov/design-system-docs"
