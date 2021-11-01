#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No color

echo "${GREEN}Creating release branch.${NC}"
DATE=$(date "+%Y-%m-%d")
BRANCH="release-${DATE}"
git checkout -b $BRANCH

echo "${GREEN}Bumping version...${NC}"
yarn lerna version --no-push

if git diff-index --quiet HEAD --; then
  echo "${RED}No local changes detected, therefore version bump did not occur. Removing release branch and exiting...${NC}"
  git checkout -
  git branch -d $BRANCH
  exit 1
fi

echo "${GREEN}Pushing tag and release commit to Github...${NC}"
# git push --set-upstream origin $BRANCH
# git push origin --tags

# echo ""
# echo "${GREEN}Release has been tagged and pushed to origin.${NC}"
# echo ""
# echo "${YELLOW}-------${NC}"
# echo ""
# echo "${YELLOW}NEXT STEPS:${NC}"
# echo ""
# echo "${YELLOW}  1. Create a pull request for merging \`${CYAN}$BRANCH${YELLOW}\` into master to save the version bump${NC}"
# echo ""
# echo "${YELLOW}  2. Publish this release to npm by running:${NC}"
# echo ""
# echo "     ${CYAN}\$${NC} yarn publish-release $PACKAGE_VERSION"
# echo ""
