#!/usr/bin/env bash

declare -A PATHS
PATHS[core]="../../design-system"
PATHS[healthcare]="../../ds-healthcare-gov"
PATHS[medicare]="../../ds-medicare-gov"
PATHS[cmsgov]="../../ds-cms-gov"

cd dist

copyScssTokenVars()
{
  { for i in "${!PATHS[@]}"; do
    TD="${PATHS[$i]}/dist/scss"

    # copies scss vars to dist folder for dist process
    rm -rf $TD
    mkdir -p $TD
    cp "${i}-tokens.scss" $TD
    cp "${i}-component-tokens.scss" $TD
  done }
}

copyScssTokenVars

RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
