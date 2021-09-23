#!/bin/sh

set -e

green() {
  # Print in green
  printf "\033[0;32m${1}\033[0m"
}

green "Checking out release $1..."
TAG_PREFIX=$(node -pe "require('./lerna.json').tagVersionPrefix")
git fetch --tags
git checkout tags/$TAG_PREFIX$1

green "Building packages..."
yarn install
yarn build

green "Publishing $1 to npm..."
yarn lerna publish from-git

green "Creating release zip..."
npm pack ./packages/design-system/
npm pack ./packages/design-system-docs/
npm pack ./packages/design-system-scripts/

green "Done. Please upload the generated zips to the GitHub Release!"