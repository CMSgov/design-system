#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No color

echo "${GREEN}Bumping version...${NC}"
yarn bump

if git diff-index --quiet HEAD --; then
  echo "${RED}No local changes detected, therefore version bump did not occur. Exiting...${NC}"
  exit 1
fi

echo "${GREEN}Pushing tag and release commit to Github...${NC}"
PACKAGE_VERSION=$(node -pe "require('./package.json').version")
TAG="v$PACKAGE_VERSION"
BRANCH="release-$PACKAGE_VERSION"

# Create and push release branch containing the updated package versions
git checkout -b $BRANCH
git add --all
git commit -m "Bump package version to $PACKAGE_VERSION"
git push --set-upstream origin $BRANCH

# Create and push tag
git tag $TAG
git push origin $TAG

echo ""
echo "${GREEN}Release ${CYAN}$PACKAGE_VERSION${GREEN} has been tagged and pushed to origin.${NC}"
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
