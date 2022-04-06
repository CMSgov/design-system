#!/usr/bin/env bash

set -Eeuo pipefail

die() {
  local msg=$1
  local code=${2-1} # default exit status 1
  msg "$msg"
  exit "$code"
}

setup_colors() {
  if [ -t 2 ] && [ "${TERM-}" != "dumb" ]; then
    NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
  else
    NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
  fi
}
setup_colors

msg() {
  echo >&2 -e "${1-}"
}

run_storybook() {
  args=("$@")

  if [ ${#args[@]} -eq 0 ]; then
    args=''
  else
    args=":$@"
  fi

  yarn storybook$args --no-open > /dev/null 2>&1 &
  SB_PID=$!
  msg "${NOFORMAT}--- Starting ${CYAN}yarn storybook${args}${NOFORMAT} with process id ${GREEN}${SB_PID}${NOFORMAT}"
}

run_storybook "$@"

# wait for storybook to be ready
attempts=0
until $(curl --output /dev/null --silent --head --fail http://localhost:6006); do
  if [ $attempts -eq 10 ]; then
    kill $SB_PID
    die "[x] something went wrong starting storybook .."
  fi
  attempts=$(($attempts+1))
  sleep 2
done

# storybook is up, start the appropriate loki process
msg "[${GREEN}✓${NOFORMAT}] Storybook is up!"
msg "${NOFORMAT}--- Starting ${CYAN}yarn loki:update${args}${NOFORMAT}"

if yarn loki:update$args ; then
  msg "[${GREEN}✓${NOFORMAT}] Loki updated successfully"
else
  msg "[${RED}X${NOFORMAT}] There was a problem with Loki"
fi

if pkill -f storybook ; then
  msg "[${GREEN}✓${NOFORMAT}] Successfully killed storybook instance"
else
  msg "[${RED}X${NOFORMAT}] There was a problem killing storybook, trying harder"
  if kill -9 $SB_PID ; then
    msg "[${GREEN}✓${NOFORMAT}] That did it, storybook closed"
  else
    msg "[${RED}X${NOFORMAT}] Storybook can't be killed, oh no!"
  fi
fi
