#!/usr/bin/env bash
# Reorganized Jest controller for unit tests, e2e, and snapshots

# Initialize variables
WATCH=false
SKIP_BUILD=${SKIP_BUILD:-false}
E2E=false
EXTRA_OPTS=()

# Populate variables from parameters
while [[ $# -gt 0 ]]; do
  case "$1" in
    -w|--watch)
      WATCH=true
      shift # past argument
      ;;
    --skip-build)
      SKIP_BUILD=true
      shift # past argument
      ;;
    --e2e)
      E2E=true
      shift # past argument
      ;;
    *) # unknown option
      EXTRA_OPTS+=("$1") # save it in an array for later
      shift # past argument
      ;;
  esac
done

if [ "$E2E" = true ]; then
  OPTS="--config tools/jest/e2e.config.js"
else
  OPTS="--config tools/jest/unit.config.js"
fi

if [ "$SKIP_BUILD" = true ]; then
  export SKIP_BUILD
fi

OPTS="${OPTS} ${EXTRA_OPTS[@]}"

if [ "$WATCH" = true ]; then
  # By default if we're watching, build it once up front and tell
  # Jest to skip the build. If --skip-build is passed explicitly,
  # skip the first build also.
  if [ "$SKIP_BUILD" = false ]; then
    set +x
    yarn build
    set -x
  fi
  export SKIP_BUILD=true
  yarn jest $OPTS --watch
else
  yarn jest $OPTS
fi
