#!/bin/sh

# copies all themes into appropriate directories for child systems

copyThemes()
{
  cd dist
  
  # move files used in distributed pacakges
  for file in core*[!.map].scss; do
    cp -v "$file" "../../design-system/src/styles/settings/variables/_${file}"
  done
  for file in healthcare*[!.map].scss; do
    cp -v "$file" "../../ds-healthcare-gov/src/styles/settings/_${file}"
  done
  for file in medicare*[!.map].scss; do
    cp -v "$file" "../../ds-medicare-gov/src/styles/settings/variables/_${file}"
  done

  #move files used in internal tooling
  for file in *.map.scss; do
    cp -v "$file" "../../../.storybook/_${file}"
    cp -v "$file" "../../docs/src/styles/theme-variables/_${file}"
  done
  for file in *.css; do
    cp -v "$file" "../../../.storybook/_${file}"
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
