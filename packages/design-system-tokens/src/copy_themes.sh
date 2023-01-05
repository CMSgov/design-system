#!/usr/bin/env bash

declare -A PATHS
PATHS[core]="../../design-system"
PATHS[healthcare]="../../ds-healthcare-gov"
PATHS[medicare]="../../ds-medicare-gov"

cd dist

copyThemes()
{
  { for i in "${!PATHS[@]}"; do
    TD="${PATHS[$i]}/src/styles"

    # copies layout scss vars used by our 
    cp "${i}-layout-tokens.scss" "${TD}/_layout.scss"
    # get rid of any existing theme file in styles folder 
    # since we're going to append to that file with cat.
    rm "${TD}/${i}-theme.css"
    echo ":root, ::before, ::after, ::backdrop {" >> "${TD}/${i}-theme.css"
    cat "${i}-theme.css" >> "${TD}/${i}-theme.css"
    cat "${i}-component-theme.css" >> "${TD}/${i}-theme.css"
    echo "}" >> "${TD}/${i}-theme.css"
    # copy to storybook static for storybook building
    cp "${TD}/${i}-theme.css" ../../../.storybook/static
    mkdir -p ../../docs/static/themes
    cp "${TD}/${i}-theme.css" ../../docs/static/themes
  done }
}

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

copyThemes
copyScssTokenVars

RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
