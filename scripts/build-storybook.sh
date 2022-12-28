#!/bin/sh

GREEN='\033[0;32m'
NC='\033[0m' # No color

set -e

OUT="$1"

if [ "$OUT" = "docs" ]; then
  build-storybook -o packages/docs/static/storybook && \
  echo "${GREEN}info${NC}: Moving static assets for use with gatsby."
  mkdir -p packages/docs/static/fonts && \
  mkdir -p packages/docs/static/images && \
  cp -R packages/docs/static/storybook/fonts/* packages/docs/static/fonts/ && \
  cp -R packages/docs/static/storybook/images/* packages/docs/static/images/ && \
  rm -rf packages/docs/static/storybook/fonts && \
  rm -rf packages/docs/static/storybook/images
else
  build-storybook -o storybook-static
fi
