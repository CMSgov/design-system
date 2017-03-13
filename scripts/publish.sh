#!/bin/sh

set -e

# Set colors for the outputted messages.
# http://stackoverflow.com/a/5947802
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
NC='\033[0m' # No color

# Publish public packages to NPM
echo "${GREEN}Publishing core package to NPM...${NC}"
cd packages/core
npm publish

echo "${ORANGE}[TODO] Publish docs${NC}"

echo "${GREEN}Publishing Succeeded!${NC}"
