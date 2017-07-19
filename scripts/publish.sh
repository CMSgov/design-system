#!/bin/sh

set -e

# Set colors for the outputted messages.
# http://stackoverflow.com/a/5947802
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
NC='\033[0m' # No color

echo "${GREEN}Pulling latest from GitHub...${NC}"
git pull --rebase

echo "${GREEN}Publishing packages...${NC}"
./node_modules/.bin/lerna publish --skip-git --skip-npm
