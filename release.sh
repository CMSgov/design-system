#!/bin/sh

set -e

green() {
  # Print in green
  printf "\033[0;32m${1}\033[0m"
}

green "Bumping version..."
yarn lerna version \
  --no-push \
  --no-git-tag-version \
  --force-publish=@cmsgov/design-system,@cmsgov/design-system-docs,@cmsgov/design-system-scripts

green "Pushing tag and release commit to Github..."
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

green "Release $PACKAGE_VERSION has been tagged and pushed."
green "Please create a pull request for mergin $BRANCH into master to save the version bump!"
green "Next step is to publish this release to npm via yarn release $PACKAGE_VERSION"
