#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color


git stash
git checkout master
git pull --rebase

echo "${GREEN}Publishing packages...${NC}"
./node_modules/.bin/lerna exec npm publish  --scope "@cmsgov/design-system-*" --ignore "@cmsgov/design-system-docs"
