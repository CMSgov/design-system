#!/bin/sh

set -e

GREEN='\033[0;32m'
CYAN="\033[0;36m"
NC='\033[0m' # No color

echo "${GREEN}Bumping version...${NC}"
yarn lerna version \
  --no-push \
  --no-git-tag-version \
  --force-publish=@cmsgov/design-system,@cmsgov/design-system-docs,@cmsgov/design-system-scripts

echo "${GREEN}Pushing tag and release commit to Github...${NC}"
PACKAGE_VERSION=$(node -pe "require('./lerna.json').version")
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")
TAG="$TAG_PREFIX$PACKAGE_VERSION"
BRANCH="release-$PACKAGE_VERSION"

# Create and push release branch containing the updated package versions
git checkout -b $BRANCH
git add --all
git commit -m "Bump package version to $PACKAGE_VERSION"
git push --set-upstream origin $BRANCH

# Create and push tag
git tag -a $TAG -m "Release $TAG" -s
git push origin $TAG

echo "${GREEN}Release ${CYAN}$PACKAGE_VERSION${GREEN} has been tagged and pushed.${NC}"
echo "${GREEN}Please create a pull request for mergin ${CYAN}$BRANCH${GREEN} into master to save the version bump!${NC}"
echo "${GREEN}Next step is to publish this release to npm via yarn release ${CYAN}$PACKAGE_VERSION${GREEN}${NC}"
