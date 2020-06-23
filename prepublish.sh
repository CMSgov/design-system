#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout master
git pull

echo "${GREEN}Cleaning directory and fresh installing...${NC}"
git clean -fdx
yarn install

echo "${GREEN}Building files and running tests...${NC}"
yarn build
yarn test
yarn test:e2e --skipBuild

echo "${GREEN}Bumping version and creating tagged release commit...${NC}"
yarn lerna version --no-push --force-publish

echo "${GREEN}Pushing tag and release commit to Github...${NC}"
PACKAGE_VERSION=$(node -pe "require('./lerna.json').version")
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")

# Push up release branch containing the updated package versions
git checkout -b release-$PACKAGE_VERSION
git push --set-upstream origin release-$PACKAGE_VERSION
# Push up tag
git push origin $TAG_PREFIX$PACKAGE_VERSION

echo "${GREEN}Creating release zip...${NC}"
npm pack ./packages/design-system/

echo "${GREEN}Prepublish complete, make sure to merge the release branch $TAG_PREFIX$PACKAGE_VERSION into master...${NC}"
