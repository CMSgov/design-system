#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No color

echo "${GREEN}Creating release branch...${NC}"
DATE=$(date "+%Y-%m-%d")
BRANCH="release-${DATE}"
git checkout -b $BRANCH

echo "${GREEN}Bumping version...${NC}"
PRE_VERSION_HASH=$(git rev-parse HEAD)
yarn lerna version --no-push
POST_VERSION_HASH=$(git rev-parse HEAD)

if [ "$PRE_VERSION_HASH" = "$POST_VERSION_HASH" ]; then
  echo "${RED}No bump commit detected. Removing release branch and exiting...${NC}"
  git checkout -
  git branch -D $BRANCH
  exit 1
fi

echo "${GREEN}Pushing tag and release commit to Github...${NC}"
# git push --set-upstream origin $BRANCH
# git push origin --tags

# Grep the last commit message for package versions
PACKAGE_VERSIONS=$(git log -1 --pretty=%B | grep -o "@.*$")
# Take the first one we find to use in example command
PACKAGE_VERSION=$(echo "$PACKAGE_VERSIONS" | head -1)

echo ""
echo "${GREEN}Release has been tagged and pushed to origin.${NC}"
echo ""
echo "${PACKAGE_VERSIONS}"
echo ""
echo "${YELLOW}-------${NC}"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "${YELLOW}  1. Create a pull request for merging \`${CYAN}$BRANCH${YELLOW}\` into master to save the version bump${NC}"
echo ""
echo "${YELLOW}  2. Publish this release to npm by running:${NC}"
echo ""
echo "     ${CYAN}\$${NC} yarn publish-release $PACKAGE_VERSION"
echo ""
