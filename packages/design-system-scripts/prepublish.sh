#!/bin/sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git stash
git fetch origin
git checkout master
git pull origin master

echo "${GREEN}Cleaning directory and fresh installing..${NC}"
lerna clean --yes
yarn install

echo "${GREEN}Building files and running tests..${NC}"
yarn build
yarn test
yarn test:e2e --skipBuild
backstop test

echo "${GREEN}Bumping version...${NC}"
yarn lerna version --no-git-tag-version --force-publish

echo "${GREEN}Creating release...${NC}"
# Use github cli