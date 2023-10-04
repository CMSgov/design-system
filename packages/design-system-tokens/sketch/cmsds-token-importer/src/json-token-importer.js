import sketch from 'sketch';
import dialog from '@skpm/dialog';
import { readFileSync } from '@skpm/fs';

/*
 * Split tokens into groups based on root name and store in category,
 * based on first word before '-'. Allows keys with up to 4 dash separators.
 *
 * @param colorTokens - An object which contains color name:value pairs
 * @returns An array of Swatch objects created by the Sketch API
 */
const makeColorSwatches = (colorTokens) => {
  const swatches = [];
  for (const [key, value] of Object.entries(colorTokens)) {
    let colorName = key.match(/(^[A-Za-z]*)-?[A-Za-z\d]*?-?[A-Za-z\d]*?-?[A-Za-z\d]*?$/);
    colorName = colorName === null ? (colorName = '') : colorName[1] + '/';
    let currentSwatch = sketch.Swatch.from({
      name: `${colorName}/${key}`,
      color: value,
    });
    swatches.push(currentSwatch);
  }
  return swatches;
};

const makeComponentSwatches = (components) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const swatches = [];
  for (const [componentName, componentTokens] of Object.entries(components)) {
    for (const [tokenName, tokenValue] of Object.entries(componentTokens)) {
      if (hexRegex.test(tokenValue)) {
        swatches.push(
          sketch.Swatch.from({
            name: `components/${componentName}/${componentName}${tokenName}`,
            color: tokenValue,
          })
        );
      }
    }
  }
  return swatches;
};

function updateSwatches(oldSwatches, newSwatches) {
  const swatchMap = oldSwatches.reduce((map, swatch) => {
    map[swatch.name] = swatch;
    return map;
  }, {});

  for (const newSwatch of newSwatches) {
    swatchMap[newSwatch.name] = newSwatch;
  }

  return Object.values(swatchMap);
}

export default function () {
  let tokenData = {};

  const jsonFile = dialog.showOpenDialogSync({
    message: 'Must be a CMSDS valid JSON Token file.',
    buttonLabel: 'Import',
    filters: [{ name: 'Json Data', extensions: ['json', 'tokens', 'tokens.json'] }],
    properties: ['openFile'],
  });

  if (jsonFile) {
    try {
      const importedFile = readFileSync(jsonFile[0]);
      tokenData = JSON.parse(importedFile);
    } catch (err) {
      console.error(err);
    }
  } else {
    sketch.UI.alert('Importing Error', 'Could not open selected file.');
  }

  const doc = sketch.getSelectedDocument();
  // doc.swatches = [];

  const newSwatches = tokenData.color
    ? makeColorSwatches(tokenData.color)
    : makeComponentSwatches(tokenData);

  doc.swatches = updateSwatches(doc.swatches, newSwatches);
}
