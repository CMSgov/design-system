/* eslint-disable @typescript-eslint/no-var-requires */
const sketch = require('sketch');
const tokens = require('../../src/tokens');

type SketchPage = typeof sketch.Page;
type SketchDocument = typeof sketch.Document;

const TOKENS_PAGE_NAME = 'CMSDS Design Tokens';

const getTokensPage = (doc: SketchDocument) => {
  let tokenPage = null;
  doc.pages.forEach((page: SketchPage, index: number) => {
    if (page.name === TOKENS_PAGE_NAME) {
      tokenPage = doc.pages[index];
    }
  });
  return tokenPage;
};

const makeColorSwatches = (colorTokens: []) => {
  const swatches = [];
  for (const [key, value] of Object.entries(colorTokens)) {
    const currentSwatch = sketch.Swatch.from({
      name: key,
      color: value,
    });
    swatches.push(currentSwatch);
  }
  return swatches;
};

export default function (): number {
  const doc = sketch.Document.getSelectedDocument();
  let tokenPage = getTokensPage(doc);
  const colorSwatches = makeColorSwatches(tokens.color);

  if (tokenPage === null) {
    tokenPage = new sketch.Page({
      parent: doc,
      name: 'CMSDS Design Tokens',
    });
  }

  console.log(colorSwatches);

  return 1;
  // console.log(doc.pages.length)
  // console.log(tokenPage)
  // var colors = sketch.globalAssets.colors
  // sketch.UI.alert("It's alive 🙌", JSON.stringify(colors));
  // console.log(colors)
  // console.log(doc.path)
  // console.log(tokenPage)
}
