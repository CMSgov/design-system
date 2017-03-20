#!/bin/sh

set -euf -o pipefail
# we use a self-contained node/npm environment using "n"
tools/jenkins/n.sh

n 6.9.5

npm rebuild