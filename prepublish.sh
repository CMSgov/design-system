#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout master
git pull

echo "${GREEN}Cleaning directory and fresh installing...${NC}"
# TODO: Fix error on yarn build that happens when dist files are removed
git clean -fdx --exclude="packages/design-system/dist/"
yarn install

echo "${GREEN}Building files and running tests...${NC}"
yarn build
yarn test
yarn test:e2e --skipBuild

echo "${GREEN}Bumping version and creating tagged release commit...${NC}"
# Remove package-lock.json to prevent a lerna error
rm -f "packages/design-system-scripts/package-lock.json"
yarn lerna version --no-push --force-publish

echo "${GREEN}Pushing release commit to Github...${NC}"
PACKAGE_VERSION=$(node -pe "require('./lerna.json').version")
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")
git checkout -b $TAG_PREFIX$PACKAGE_VERSION
git push --set-upstream origin $TAG_PREFIX$PACKAGE_VERSION

echo "${GREEN}Creating release zip...${NC}"
npm pack ./packages/design-system/

echo "${GREEN}Prepublish complete, make sure to merge the release branch $TAG_PREFIX$PACKAGE_VERSION into master...${NC}"
