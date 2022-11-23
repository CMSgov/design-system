#!/usr/bin/env sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No color

# Parse options
while [[ $# -gt 0 ]]
do
  case "$1" in
    -u|--undo)
      DELETE_LAST=true
      shift # past argument
      ;;
    *)
      # unknown option
      EXTRA_OPTS+=("$1") # save it in an array for later
      shift # past argument
      ;;
  esac
done

TEMP_BRANCH="version-bump-$(date '+%m%d%Y-%H%M')"
echo "+ Creating version bump in ${CYAN}${TEMP_BRANCH}${NC}, to be merged into ${GREEN}main${NC}..."
echo "+ Please make sure to use the same versions in the latest release."
git checkout main
git checkout -b $TEMP_BRANCH
yarn lerna version --no-push --no-git-tag-version --exact ${EXTRA_OPTS[@]}

git add *
git commit -m 'version bump'
git push --set-upstream origin $TEMP_BRANCH

echo "+ Creating pull request via ${CYAN}gh${NC} to merge these updates into ${GREEN}main${NC}..."
gh pr create --base main --title "[RELEASE] $(date '+m/%d') Version bump main" --body "Please review version updates and compare against latest release branch" --reviewer "zarahzachz" --reviewer "pwolfert" --reviewer "forrestbaer"

git checkout main
