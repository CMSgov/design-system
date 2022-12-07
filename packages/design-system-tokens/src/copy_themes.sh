#!/bin/sh

# copies all themes into appropriate directories

CORE="../../design-system/src/styles"
HC="../../ds-healthcare-gov/src/styles"
MC="../../ds-medicare-gov/src/styles"

cd dist

copyThemes()
{
  # move files used in distributed packages
  for file in core*-theme.scss; do
    cat "$file" >> "$CORE/_core.scss"
  done
  for file in core*-theme.css; do
    cat "$file" >> "$CORE/_core.css"
  done
  for file in healthcare*-theme.scss; do
    cat "$file" >> "$HC/_healthcare.scss"
  done
  for file in healthcare*-theme.css; do
    cat "$file" >> "$HC/_healthcare.css"
  done
  for file in medicare*-theme.scss; do
    cat "$file" >> "$MC/_medicare.scss"
  done
  for file in medicare*-theme.css; do
    cat "$file" >> "$MC/_medicare.css"
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
