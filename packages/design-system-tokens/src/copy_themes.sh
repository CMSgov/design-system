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
    rm "${PATHS[$i]}/${i}-theme.css"
    echo ":root, :before {" >> "${PATHS[$i]}/${i}-theme.css"
    cat "${i}-theme.css" >> "${PATHS[$i]}/${i}-theme.css"
    cat "${i}-components-theme.css" >> "${PATHS[$i]}/${i}-theme.css"
    echo "}" >> "${PATHS[$i]}/${i}-theme.css"
    # copy to storybook static for storybook building
    cp -v "${PATHS[$i]}/${i}-theme.css" ../../../.storybook/static
    mkdir -p ../../docs/static/themes
    cp -v "${PATHS[$i]}/${i}-theme.css" ../../docs/static/themes
  done
}

copyThemes
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
