#!/usr/bin/env bash

# copies all themes into appropriate directories

declare -A PATHS
PATHS[core]="../../design-system/src/styles"
PATHS[healthcare]="../../ds-healthcare-gov/src/styles"
PATHS[medicare]="../../ds-medicare-gov/src/styles"

copyThemes()
{
  cd dist
  
  for i in "${!PATHS[@]}"; do
    cp -v "${i}-layout-tokens.scss" "${PATHS[$i]}/_layout.scss"
    cp -v "${i}-components-theme.css" "${PATHS[$i]}/theme/"
    cp -v "${i}-theme.css" "${PATHS[$i]}/theme/"
  done

  #move files used in internal tooling
  for file in *.scss; do
    cp -v "$file" "../../docs/src/styles/theme-variables/_${file}"
  done
  for file in *.css; do
    cp -v "$file" "../../docs/src/styles/theme-variables/_${file}"
  done
}

copyThemes
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
