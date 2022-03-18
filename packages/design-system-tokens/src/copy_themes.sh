#!/bin/sh

# copies all themes into appropriate directories for child systems

copyThemes()
{
  cd dist
  
  for file in core-*; do
    cp -v "$file" "../../design-system/src/styles/settings/variables/_${file#core-}"
  done
  for file in healthcare-*; do
    cp -v "$file" "../../ds-healthcare-gov/src/styles/settings/_${file#healthcare-}"
  done
  for file in medicare-*; do
    cp -v "$file" "../../ds-medicare-gov/src/styles/settings/variables/_${file#medicare-}"
  done
}

copyThemes
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
