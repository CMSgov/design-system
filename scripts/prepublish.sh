#!/bin/sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git checkout staging
git pull --rebase

echo "${GREEN}Bumping version...${NC}"
./node_modules/.bin/lerna publish --skip-git --skip-npm

echo "${GREEN}Building...${NC}"
npm run build
