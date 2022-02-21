import sketch from 'sketch';
import dialog from '@skpm/dialog';
import { readFileSync } from '@skpm/fs';

const TOKENS_PAGE_NAME = 'CMSDS Design Tokens';

const getTokensPage = (doc) => {
  let tokenPage = null;
  doc.pages.forEach((page, index) => {
    if (page.name === TOKENS_PAGE_NAME) {
      tokenPage = doc.pages[index];
    }
  });
  return tokenPage;
};

/*
 * split tokens into groups based on root name
 * and store in tokens submenu, returns array
 * of Sketch Swatches
 */
const makeColorSwatches = (tokens) => {
  const swatches = [];
  for (const [key, value] of Object.entries(tokens.color)) {
    let colorName = key.match(/(^[A-Za-z]+-?[A-Za-z]+?)-\d+$/);
    colorName = colorName === null ? (colorName = '') : colorName[1] + '/';
    const currentSwatch = sketch.Swatch.from({
      name: `tokens/${colorName}${key}`,
      color: value,
    });
    swatches.push(currentSwatch);
  }
  return swatches;
};

const createTokenPage = (doc) => {
  let tokenPage = getTokensPage(doc);

  if (tokenPage === null) {
    tokenPage = new sketch.Page({
      parent: doc,
      name: 'CMSDS Design Tokens',
    });
  }
};

// const colorSwatches = makeColorSwatches(tokens.color);

export default function () {
  let tokenData = {};

  const jsonFile = dialog.showOpenDialogSync({
    message: 'Must be a CMSDS valid JSON Token file.',
    buttonLabel: 'Import',
    filters: [{ name: 'Json Data', extensions: ['json', 'tokens', 'tokens.json'] }],
    properties: ['openFile'],
  });

  if (jsonFile) {
    const importedFile = readFileSync(jsonFile[0]);
    tokenData = JSON.parse(importedFile);
  } else {
    sketch.UI.alert('Importing Error', 'Could not open selected file.');
  }

  const colorSwatches = makeColorSwatches(tokenData);
  const doc = sketch.getSelectedDocument();

  doc.swatches = [];
  colorSwatches.forEach((swatch) => {
    doc.swatches.push(swatch);
  });

  const tokenPage = getTokensPage(doc);
  if (!tokenPage) {
    createTokenPage(doc);
    sketch.UI.message('token page created');
  }
}
