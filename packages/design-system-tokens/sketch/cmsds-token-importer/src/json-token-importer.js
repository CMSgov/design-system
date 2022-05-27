import sketch from 'sketch';
import dialog from '@skpm/dialog';
import { readFileSync } from '@skpm/fs';

/*
 * split tokens into groups based on root name
 * and store in tokens submenu, returns array
 * of Sketch Swatches
 */
const makeColorSwatches = (colorTokens) => {
  const swatches = [];
  for (const [key, value] of Object.entries(colorTokens)) {
    let colorName = key.match(/(^[A-Za-z]+-?[A-Za-z]+?)-?\d+?$/);
    colorName = colorName === null ? (colorName = '') : colorName[1] + '/';
    const currentSwatch = sketch.Swatch.from({
      name: `tokens/${colorName}${key}`,
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
