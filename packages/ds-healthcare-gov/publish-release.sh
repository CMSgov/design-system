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
TAG_PREFIX="v"
git fetch --tags
git checkout tags/$TAG_PREFIX$1

echo "${GREEN}Building packages...${NC}"
yarn install
yarn build

echo "${GREEN}Publishing ${CYAN}$1${GREEN} to npm...${NC}"
if [[ $1 == *"beta"* ]]; then
  NPM_TAG="--tag beta"
else
  NPM_TAG=""
fi
npm publish $NPM_TAG

echo "${GREEN}Done.${NC}"
echo ""
echo "${YELLOW}-------${NC}"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "${YELLOW}  1. Update the documentation site with ${NC}"
echo ""
echo "     ${CYAN}\$${NC} yarn gh-pages"
echo ""