#!/usr/bin/env bash

set -Eeo pipefail
trap cleanup SIGINT SIGTERM ERR

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
STORYBOOK_DS=${STORYBOOK_DS:-core}

usage() {
  cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-v] <...loki args>

Assists with running the Storybook Loki visual regression tests. Items in brackets
are optional. Must have docker running and able to start up instances.

Utilizes the STORYBOOK_DS environment variable to determine which system to test.

Available options:

args            One of: update/test/approve
-h, --help      Print this help and exit
-v, --verbose   Print script debug info
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

kill_storybook() {
  if pkill -f storybook ; then
    msg "[✓] Successfully killed storybook instance"
  else
    msg "[X] There was a problem killing storybook, trying harder"
    if kill -9 $SB_PID ; then
      msg "[✓] That did it, storybook closed"
    else
      die "[X] Storybook can't be killed, oh no, run!"
    fi
  fi
}

msg() {
  echo >&2 -e "${1-}"
}

while :; do
  case "${1-}" in
    -h | --help) usage ;;
    -v | --verbose) set -x ;;
    *) break ;;
  esac
  shift
done

args=("$@")

[ ${#args[@]} -eq 0 ] && usage

npx start-storybook --no-open -p 6006 > /dev/null 2>&1 &
SB_PID=$!
msg "\n-+- Starting: Storybook on port 6006 ${STORYBOOK_DS} PID: ${SB_PID}"

# wait for storybook to be ready
msg "-i- Waiting for storybook instance to be ready, timeout in 120s ..\n"

attempts=0
until $(true &>/dev/null </dev/tcp/127.0.0.1/6006); do
  if [ $attempts -eq 20 ]; then
    kill $SB_PID
    die "[x] Something went wrong starting storybook ..\n"
  fi
  attempts=$(($attempts+1))
  sleep 6
done

# storybook is up, start the appropriate loki process
msg "[✓] Storybook instance found at http://localhost:6006!"
msg "-+- Starting: npx loki ${args} ${STORYBOOK_DS}\n"

if npx loki $args ; then
  msg "\n[✓] Loki ${args} ran successfully"
else
  kill_storybook && die "\n[X] There was a problem with Loki ${args}"
fi

kill_storybook
