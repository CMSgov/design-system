import sketch from 'sketch';
import dialog from '@skpm/dialog';
import { readFileSync } from '@skpm/fs';

const TOKENS_PAGE_NAME = 'CMSDS Design Tokens';

/*
 * Return index of tokens page for use by plugin
 */
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

/*
 * create layer styles based on component values
 * TODO: when first set of layer stlyes (buttons) are created
 * this can be fully tested out & completed
 */
const makeLayerStyles = (componentVals) => {
  const layerStyles = [];
  for (const [key, value] of Object.entries(componentVals)) {
    console.log(key, value);
    const layerStyle = {
      // layerstyle API:
      // opacity: number,
      // fills: Fill[],
      // borders: Border[],
      // borderOptions: BorderOptions,
      // shadows: Shadow[],
    };
    layerStyles.push(layerStyle);
  }
  return layerStyles;
};

/*
 * create text styles based on component values
 * TODO: when first set of text stlyes (buttons) are created
 * this can be fully tested out & completed
 */
const makeTextStyles = (componentVals) => {
  const textStyles = [];
  for (const [key, value] of Object.entries(componentVals)) {
    console.log(key, value);
    const textStyle = {
      // textStyle API
      // alignment: Alignment,
      // verticalAlignment: VerticalAlignment,
      // kerning: number/null,
      // lineHeight: number/null,
      // paragraphSpacing: number,
      // textColor: rgba hex-string,
      // fontSize: number,
      // textTransform: 'none' | 'uppercase' | 'lowercase',
      // fontFamily: string,
      // fontWeight: number,
      // fontStyle: 'italic' | undefined,
    };
    textStyles.push(textStyle);
  }
  return textStyles;
};

/*
 * Create CMSDS Token example page if it doesn't already exist
 * TODO: Populate page with token examples based on layer stlyes
 */
const createTokenPage = (doc) => {
  let tokenPage = getTokensPage(doc);

  if (tokenPage === null) {
    tokenPage = new sketch.Page({
      parent: doc,
      name: 'CMSDS Design Tokens',
    });
  }
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

  /*
   * Theme imports should generate layer styles as well
   * TODO: when first set of component styles are created (buttons)
   * this will be updated to import / test those
   */
  if (jsonFile.tokenType === 'theme') {
    const componentLayerStyles = makeLayerStyles(jsonFile.components);
    const componentTextStyles = makeTextStyles(jsonFile.components);

    doc.sharedLayerStyles = componentLayerStyles.map((layerStyle) => {
      // return layerStyle computation
      console.log(layerStyle);
    });
    doc.sharedTextStyles = componentTextStyles.map((textStyle) => {
      // return textStyle computation
      console.log(textStyle);
    });
  }

  const colorSwatches = makeColorSwatches(tokenData.color);
  colorSwatches.forEach((swatch) => {
    doc.swatches.push(swatch);
  });

  const tokenPage = getTokensPage(doc);
  if (!tokenPage) {
    createTokenPage(doc);
    sketch.UI.message('token page created');
  }
}
