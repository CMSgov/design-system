#!/bin/sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No color

read_previous_commit_tags() {
  # Get the last commit to undo
  LAST_COMMIT=$(git rev-parse HEAD)
  # Grep the last commit message for package versions
  PACKAGE_VERSIONS=$(git log -1 --pretty=%B | grep -o "@.*$")
  # Take the first one we find to use in example command
  PACKAGE_VERSION=$(echo "$PACKAGE_VERSIONS" | head -1)
  # Get it all on one line so we can push these tags at once
  TAGS=$(echo "$PACKAGE_VERSIONS" | tr '\n' ' ')
}

DELETE_LAST=false
EXTRA_OPTS=()

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

git fetch --tags

if [ "$DELETE_LAST" = true ]; then
  read_previous_commit_tags
  echo "${RED}The following tags will be deleted locally and on origin${NC}"
  echo ""
  echo "${PACKAGE_VERSIONS}"
  echo ""
  read -p "Are you sure want to continue? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "${GREEN}Removing last set of tags...${NC}"
    git tag -d $TAGS
    git push origin --delete $TAGS
  fi
  exit 0
fi

# bump current versions in active branch
echo "${GREEN}Bumping package versions...${NC}"
PRE_VERSION_HASH=$(git rev-parse HEAD)
yarn lerna version --no-push --exact ${EXTRA_OPTS[@]}
POST_VERSION_HASH=$(git rev-parse HEAD)

if [ "$PRE_VERSION_HASH" = "$POST_VERSION_HASH" ]; then
  echo "${RED}No bump commit detected. exiting...${NC}"
  exit 1
fi

# read tags and push to active branch 
echo "${GREEN}Pushing tags and version update commit to Github...${NC}"
read_previous_commit_tags

BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push --set-upstream origin $BRANCH
git push origin $TAGS

# create temporary release branch from latest commit which is tagged
# add an empty commit so it can be pushed to origin and PR'd then 
# move back to previous branch so tags can be deleted with --undo
# if necessary.
echo "${GREEN}Creating temporary release branch...${NC}"
BRANCHREF=$(git rev-parse --short HEAD)
TEMP_BRANCH="release-${BRANCHREF}"
git checkout -b $TEMP_BRANCH
git commit --allow-empty -m "DS Release Bump"
git push --set-upstream origin $TEMP_BRANCH
git checkout $BRANCH

echo ""
echo "${GREEN}Release has been tagged and pushed to origin.${NC}"
echo ""
echo "${PACKAGE_VERSIONS}"
echo ""
echo "${YELLOW}-------${NC}"
echo ""
echo "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "${YELLOW}  1. Create a pull request for merging \`${CYAN}$TEMP_BRANCH${YELLOW}\` into master to save the version bump${NC}."
echo ""
echo "${YELLOW}  2. Publish this release using the \`${CYAN}publish${YELLOW}\` jenkins job${NC}."
echo ""
