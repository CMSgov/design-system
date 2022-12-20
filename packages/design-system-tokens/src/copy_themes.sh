#!/usr/bin/env bash

# copies all themes into appropriate directories

declare -A PATHS
PATHS[core]="../../design-system/src/styles"
PATHS[healthcare]="../../ds-healthcare-gov/src/styles"
PATHS[medicare]="../../ds-medicare-gov/src/styles"

copyThemes()
{
  cd dist
  
  { for i in "${!PATHS[@]}"; do
    TD=${PATHS[$i]}

    cp -v "${i}-layout-tokens.scss" "${TD}/_layout.scss"
    rm "${TD}/${i}-theme.css"
    echo "building ${TD}/${i}-theme.css"
    echo ":root, ::before, ::after, ::backdrop {" >> "${TD}/${i}-theme.css"
    cat "${i}-theme.css" >> "${TD}/${i}-theme.css"
    cat "${i}-components-theme.css" >> "${TD}/${i}-theme.css"
    echo "}" >> "${TD}/${i}-theme.css"
    # copy to storybook static for storybook building
    cp -v "${TD}/${i}-theme.css" ../../../.storybook/static
    mkdir -p ../../docs/static/themes
    cp -v "${TD}/${i}-theme.css" ../../docs/static/themes
  done }
}

copyThemes
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
