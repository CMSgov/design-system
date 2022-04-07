#!/usr/bin/env bash

set -Eeo pipefail
trap cleanup SIGINT SIGTERM ERR

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

usage() {
  cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-v] [-t target] args

Assists with running the Storybook Loki visual regression tests. Items in brackets
are optional. Must have docker running and able to start up instances.

Available options:

args            One of: update/test/approve
-h, --help      Print this help and exit
-v, --verbose   Print script debug info
-t, --target    Optional, core is default, options are: healthcare/medicare

EOF
  exit
}

cleanup() {
  trap - SIGINT SIGTERM ERR
  pkill -f storybook
}

die() {
  local msg=$1
  local code=${2-1} # default exit status 1
  msg "$msg"
  exit "$code"
}

msg() {
  echo >&2 -e "${1-}"
}

run_storybook() {
  targ=""

  while :; do
    case "${1-}" in
      -h | --help) usage ;;
      -v | --verbose) set -x ;;
      -t | --target) 
        targ=":${2-}"
        export LOKI_FILE_PREFIX="${2-}"
        shift
        ;;
      *) break ;;
    esac
    shift
  done

  args=("$@")

  [ ${#args[@]} -eq 0 ] && usage

  yarn storybook$targ --no-open > /dev/null 2>&1 &
  SB_PID=$!
  msg "\n-+- Starting: yarn storybook${targ} PID: ${SB_PID}"

  return 0
}

run_storybook "$@"

# wait for storybook to be ready
msg "-i- Waiting for storybook instance to be ready, timeout in 20s ..\n"

attempts=0
until $(curl --output /dev/null --silent --head --fail http://localhost:6006); do
  if [ $attempts -eq 10 ]; then
    kill $SB_PID
    die "[x] Something went wrong starting storybook ..\n"
  fi
  attempts=$(($attempts+1))
  sleep 2
done

# storybook is up, start the appropriate loki process
msg "[✓] Storybook instance found at http://localhost:6006!"
msg "-+- Starting: yarn loki ${args} ${LOKI_FILE_PREFIX}\n"

if yarn loki $args ; then
  msg "\n[✓] Loki ${args} ran successfully"
else
  msg "\n[X] There was a problem with Loki ${args}"
fi

if pkill -f storybook ; then
  msg "[✓] Successfully killed storybook instance"
else
  msg "[X] There was a problem killing storybook, trying harder"
  if kill -9 $SB_PID ; then
    msg "[✓] That did it, storybook closed"
  else
    msg "[X] Storybook can't be killed, oh no, run!"
  fi
fi

echo ""
