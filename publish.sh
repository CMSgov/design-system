#!/bin/sh

# This script checks out a specified release tag, builds it, and publishes
# it to npm.
#
# Usage:
# $ yarn publish-release <version number>

set -e

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN="\033[0;36m"
NC='\033[0m' # No color

echo "${GREEN}Checking out release $1...${NC}"
git fetch --tags
git checkout tags/$1

echo "${GREEN}Building packages...${NC}"
yarn install
yarn build
yarn build:healthcare
yarn build:medicare

echo "${GREEN}Publishing ${CYAN}$1${GREEN} to npm...${NC}"
if [[ $1 == *"beta"* ]]; then
  NPM_TAG="--dist-tag beta"
else
  NPM_TAG=""
fi
yarn lerna publish from-git $NPM_TAG

echo "${GREEN}Creating release zip...${NC}"
npm pack ./packages/design-system/
npm pack ./packages/design-system-docs/
npm pack ./packages/design-system-scripts/
npm pack ./packages/ds-healthcare-gov/
npm pack ./packages/ds-medicare-gov/

echo "${GREEN}Done.${NC}"
echo ""
echo "${YELLOW}-------${NC}"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "${YELLOW}  1. Please upload the generated zips to the GitHub release and publish it.${NC}"
echo ""
echo "${YELLOW}  1. Update the documentation site.${NC}"
echo ""