#!/bin/sh

set -euf -o pipefail
# we use a self-contained node/npm environment using "n"
. tools/jenkins/n.sh

n 7.7.3

npm rebuild
BUILD_ONLY=true npm install nodegit
npm install
npm run bootstrap:npm