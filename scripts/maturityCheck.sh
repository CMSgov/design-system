#!/bin/bash

cd packages/docs/content

TOTAL=$(grep -RE 'MaturityChecklist' | wc -l | tr -d ' ')

MC=(a11yStandards color forcedColors screenReaders keyboardNavigable storybook responsive spanish completeUiKit responsiveUiKit tokensInCode tokensInSketch)

for i in ${MC[@]}; do
  COUNT=$(grep -RE "${i}=\{" | grep -Ei 'true|null' | wc -l | tr -d ' ')
  echo "${i}: ${COUNT}/${TOTAL}"
done
