const generateHtmlExample = require('./generateHtmlExample');
const generateReactExample = require('./generateReactExample');

async function generateExamplePage(page, docsPath, sourceDir, docsDir, options) {
  const htmlResult = await generateHtmlExample(page, null, docsPath, options);
  const modifierResults = page.modifiers
    ? await Promise.all(
        page.modifiers.map((modifier) => generateHtmlExample(page, modifier, docsPath, options))
      )
    : [];
  const reactResult = page.reactExampleSource
    ? await generateReactExample(page, docsPath, sourceDir, docsDir, options)
    : [];

  return [htmlResult].concat(modifierResults).concat(reactResult);
}

module.exports = generateExamplePage;
