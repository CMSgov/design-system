#!/bin/sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No color

git checkout master

echo "${GREEN}Publishing packages...${NC}"
./node_modules/.bin/lerna exec npm publish --ignore "{@cmsgov/design-system-docs,generator-cmsgov}"
