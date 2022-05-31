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
  doc.swatches = [];

  const colorSwatches = makeColorSwatches(tokenData.color);
  colorSwatches.forEach((swatch) => {
    doc.swatches.push(swatch);
  });
}
