#!/bin/sh

# copies all themes into appropriate directories

copyThemes()
{
  cd dist
  
  # move files used in distributed packages
  for file in core*.scss; do
    cp -v "$file" "../../design-system/src/styles/_${file}"
  done
  for file in core*.css; do
    cp -v "$file" "../../design-system/src/styles/_${file}"
  done
  for file in healthcare*.scss; do
    cp -v "$file" "../../ds-healthcare-gov/src/styles/_${file}"
  done
  for file in healthcare*.css; do
    cp -v "$file" "../../ds-healthcare-gov/src/styles/_${file}"
  done
  for file in medicare*.scss; do
    cp -v "$file" "../../ds-medicare-gov/src/styles/_${file}"
  done
  for file in medicare*.css; do
    cp -v "$file" "../../ds-medicare-gov/src/styles/_${file}"
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
