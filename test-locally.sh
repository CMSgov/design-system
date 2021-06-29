# This script is meant to help the local development of the core design system by building child & applications to test local changes

# PRE-REQUISTES
# 1. Set two path variables on your machine and ensure they are exported. You'll need:
#   a. export DS_APP_PATH="absolute path to the application you want to test"
#   b. export CHILD_DS_PATH="absolute path to child design system you want to test"

# 2. Ensure that your local child DS project & application project are looking for the local depency of their design systems. 
# This can be accomplished by updating the package.json to use "file:[relative path to dependency]"

# USING THIS SCRIPT
# In the root directory of the design-system project, run `./test-locally.sh`
#   This will install dependencies and run the core DS.
#   Then, it will navigate to the child DS project. It will remove node_modules, install dependencies & build child system.
#   Then, it will navigate to an application project. It will remove node_modules, install dependencies & build the application.

# This script will try to use the DS_APP_PATH & CHILD_DS_PATH variables in your system's path, but you can override these for alternative testing.
# For example, if you want to test the hcgov child system, but your CHILD_DS_PATH variable is for the mgov child system, you can:
#   1. Update the CHILD_DS_PATH path variable (either globally or in your current session)
#   2. Run `./test-locally.sh -c [absolute path to hcgov project on your machine]

# Similarly, if you want to change the application path your are testing with, you can:
#   1. Update the DS_APP_PATH path variable (either globally or in your current session)
#   2. Run `./test-locally.sh -a [absolute path to application project on your machine]
#     a. If you only want to test in child systems and not in an application, you can run `./test-locally.sh -a ""`


#!/bin/sh

set -e

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

CHILD_SYSTEM_PATH="$CHILD_DS_PATH"
APP_PATH="$DS_APP_PATH"

while getopts ":c:a:" options; do
    case "${options}" in
        c)
            CHILD_SYSTEM_PATH=${OPTARG}
            ;;
        a)
            APP_PATH=${OPTARG}
            ;;
  esac
done

echo $CHILD_SYSTEM_PATH
echo $APP_PATH

if [ "$CHILD_SYSTEM_PATH" = "" ]; then
      echo "${RED}Error: no path set for child system.
Make sure you have the CHILD_DS_PATH environment variable set or
that you have passed a path with the -c option.
"  
exit
fi

echo "${GREEN}Building core design system...${NC}"
yarn install
yarn build

echo "${GREEN}Building child design system with local dependencies at path $CHILD_SYSTEM_PATH...${NC}"
cd $CHILD_SYSTEM_PATH
rm -rf node_modules
yarn install
yarn build

if [ "$APP_PATH" != "" ]; then
    echo "${GREEN}Building application with local dependencies at path $APP_PATH...${NC}"
    cd $APP_PATH
    rm -rf node_modules
    yarn install
    # This next line may need to be updated depending on the application project's local build command
    yarn start
else 
    echo "${GREEN}No application path provided. Skipping application build...
    "  
fi

echo "${GREEN}Local building complete. You can now test with local design system changes...${NC}"
