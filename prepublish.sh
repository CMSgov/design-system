#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout master
git pull

echo "${GREEN}Cleaning directory and fresh installing..${NC}"
rm -rf **/node_modules
# We need to delete the package-lock.json created by npm link in design-system-scripts
# to prevent an error later on in `lerna version`
rm -rf **/package-lock.json
yarn install

echo "${GREEN}Building files and running tests..${NC}"
yarn build
yarn test
yarn test:e2e --skipBuild

echo "${GREEN}Bumping version and creating tagged release commit...${NC}"
yarn lerna version --no-push --force-publish

echo "${GREEN}Pushing release commit to Github...${NC}"
PACKAGE_VERSION=$(node -pe "require('./lerna.json').version")
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")
git checkout -b $TAG_PREFIX$PACKAGE_VERSION
git push --set-upstream origin $TAG_PREFIX$PACKAGE_VERSION

echo "${GREEN}Creating release zip...${NC}"
npm pack ./packages/design-system/

echo "${GREEN}Prepublish complete, make sure to merge the release branch $TAG_PREFIX$PACKAGE_VERSION into master...${NC}"
