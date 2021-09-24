#!/bin/sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN="\033[0;36m"
NC='\033[0m' # No color

echo "${GREEN}Checking out release $1...${NC}"
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")
git fetch --tags
git checkout tags/$TAG_PREFIX$1

echo "${GREEN}Building packages...${NC}"
yarn install
yarn build

echo "${GREEN}Publishing ${CYAN}$1${GREEN} to npm...${NC}"
# yarn lerna publish from-git

echo "${GREEN}Creating release zip...${NC}"
npm pack ./packages/design-system/
npm pack ./packages/design-system-docs/
npm pack ./packages/design-system-scripts/

echo "${GREEN}Done.${NC}"
echo ""
echo "${YELLOW}-------${NC}"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "${YELLOW}  1. Please upload the generated zips to the GitHub release and publish it.${NC}"
echo ""