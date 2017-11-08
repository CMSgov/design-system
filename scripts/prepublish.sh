#!/bin/sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout master
git pull

echo "${GREEN}Bumping version...${NC}"
./node_modules/.bin/lerna publish --skip-git --skip-npm --allow-branch master --scope "@cmsgov/design-system-*"

echo "${GREEN}Building...${NC}"
npm run build
