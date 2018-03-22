#!/usr/bin/env bash

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
        --slow-mo)
            SLOW_MO="$2"
            shift # past argument
            shift # past value
            ;;
        *) # unknown option
            EXTRA_OPTS+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done

if [ "$E2E" = true ]; then
  OPTS="--config=jest.e2e.config.js"
else
  OPTS="--config=jest.config.js"
fi

if [ "$SKIP_BUILD" = true ]; then
  export SKIP_BUILD
fi

if [ -n "$SLOW_MO" ]; then
  export SLOW_MO
fi

OPTS="${OPTS} ${EXTRA_OPTS[@]}"

if [ "$WATCH" = true ]; then
  # By default if we're watching, build it once up front and then tell jest to
  # skip the build. If --skip-build is passed in explicitly, skip even the
  # initial build.
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
