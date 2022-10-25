# This script is meant to help the local development of the core design system by building child & applications to test local changes

# PRE-REQUISTES
# 1. This script assumes that this project, both child systems, and any application project all share a parent directory on your machine.
#    For example, your directory structure should be similar to
#       projects/
#           design-system/
#           mgov-design-system/
#           hcgov-design-system/
#           application-to-test/

# 2. Ensure that child design system projects are looking at local version of the core DS by updating the package.json so that the following dependencies look like this:
#   "@cmsgov/design-system": "file:../design-system/packages/design-system",

# 3. Ensure that application project is pointing at local version of child design system by modifying the package.json so that the following dependencies look like this:
#   "@cmsgov/ds-healthcare-gov": "file:../hcgov-design-system",
#       or
#   "@cmsgov/ds-medicare-gov": "file:../mgov-design-system",

## 4. Note, this script assumes you use nvm to manage node versions

# USING THIS SCRIPT
# In the root directory of the design-system project, run `scripts/test-locally.sh`
#   This will install dependencies and run the core DS.
#   Then, it will navigate to the child DS project. It will remove node_modules, install dependencies & build child system.
#   Then, it will navigate to an application project. It will remove node_modules, install dependencies & build the application.

# This script will try to use the default variables defined in this file, but you can override these for additional testing.
# For example, if you want to test the hcgov child system, when the default CHILD_DS_NAME variable is mgov child system, you can:
#   1. Update the CHILD_DS_NAME variable in this file
#   2. Run `scripts/test-locally.sh -c hcgov-design-system`

# Similarly, if you want to change the application path your are testing with, you can:
#   1. Update the APP_NAME path variable in this file
#   2. Run `scripts/test-locally.sh -a [directory name of application]`
#     a. If you only want to test in child systems and not in an application, you can run `scripts/test-locally.sh -a ""`

#!/bin/sh

source $NVM_DIR/nvm.sh;

RED="\033[0;31m"
GREEN='\033[0;32m'
NC='\033[0m' # No color

# either 'mgov-design-system' or 'hcgov-design-system'
CHILD_DS_NAME="mgov-design-system"
APP_NAME="coverage-tools-frontend"

while getopts ":c:a:" options; do
    case "${options}" in
        c)
            CHILD_DS_NAME=${OPTARG}
            ;;
        a)
            APP_NAME=${OPTARG}
            ;;
  esac
done

if [ "$CHILD_DS_NAME" = "" ]; then
      echo "${RED}Error: no path set for child system.
Make sure you have the CHILD_DS_NAME variable set in this script or
that you have passed a path with the -c option.
"  
exit
fi

echo "${GREEN}Building core design system...${NC}"
yarn install
yarn build

echo "${GREEN}Building child design system with local dependencies at path $CHILD_DS_NAME...${NC}"
cd ../$CHILD_DS_NAME
rm -rf node_modules
yarn install

if [ "$APP_NAME" != "" ]; then
    echo "${GREEN}Building application with local dependencies at path $APP_NAME...${NC}"
    cd ../$APP_NAME

    # check if application has nvmrc
    # if none exists, prompt user to enter node version to use
    FILE=.nvmrc
    if [ -f "$FILE" ]; then
        nvm use
        # if you don't have necessary versin of node installed, don't continue script
        if [ $? -eq 3 ]
            then
                exit
        fi
    else 
        echo "${NC}No .nvmrc file found. Please enter node version you want to use for application build:"
        read node_version
        nvm use $node_version
    fi
    
    rm -rf node_modules
    yarn install

    if [ "$APP_NAME" = "coverage-tools-frontend" ]; then
        rm -rf node_modules/@cmsgov/ds-medicare-gov/node_modules
    fi

    # This next line may need to be updated depending on the application project's local build command
    yarn start
else 
    echo "${GREEN}No application path provided. Skipping application build...
    "  
fi

echo "${GREEN}Local building complete. You can now test with local design system changes...${NC}"
