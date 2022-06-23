#!/usr/bin/env bash
set -eo pipefail

BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Build the demo site
yarn --cwd ./packages/docs clean
yarn build-storybook:gatsby
PATH_PREFIX="/design-system/branch/${BRANCH}" PREFIX_PATHS=true yarn build:gatsby


# Deploy the demo site to a directory on GitHub Pages
yarn gh-pages -d './packages/docs/public' --dest "branch/${BRANCH}"

echo "Deployed demo doc site to https://cmsgov.github.io/design-system/branch/${BRANCH}"