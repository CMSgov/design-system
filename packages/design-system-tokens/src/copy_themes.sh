#!/bin/sh

# copies all themes into appropriate directories for child systems

copyThemes()
{
  cd dist
  
  # move files used in distributed pacakges
  for file in core*.css; do
    cp -v "$file" "../../design-system/src/styles/settings/variables/${file}"
  done
  for file in healthcare*.css; do
    cp -v "$file" "../../ds-healthcare-gov/src/styles/settings/variables/${file}"
  done
  for file in medicare*.css; do
    cp -v "$file" "../../ds-medicare-gov/src/styles/settings/variables/${file}"
  done

  #move files used in internal tooling
  for file in *.css; do
    cp -v "$file" "../../docs/src/styles/theme-variables/${file}"
  done
}

copyThemes
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo Themes copied successfully.
else
  echo Theme copy failed.
fi
