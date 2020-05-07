#!/bin/sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout master
git pull
git status

echo "${GREEN}Building and testing from fresh install..${NC}"
git clean -fdx
yarn install
yarn build
yarn test
yarn test:e2e --skipBuild
backstop test

echo "${GREEN}Bumping version...${NC}"
./node_modules/.bin/lerna publish --skip-git --skip-npm --allow-branch master --scope "@cmsgov/design-system-*" --force-publish=*

echo "${GREEN}Creating release pull request...${NC}"
git checkout -b v1.1.0
git add --all
git commit -m "Release v1.1.0"
git push --set-upstream origin v1.1.0