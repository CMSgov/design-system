const processMarkup = require('../../../packages/docs/src/scripts/shared/processMarkup').default;
const savePage = require('./savePage');

/**
 * Creates an HTML page with just the KSS section's markup and no additional UI.
 * This can then be viewed in a browser, or rendered in an iFrame in
 * the documentation.
 * @param {Object} page
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @return {Promise}
 */
function generateHtmlExample(page, modifier, docsPath, rootPath) {
  if (rootPath) rootPath = `${rootPath}/`;
  // ie. components.button
  let id = page.reference;
  // ie. components.button.ds-c-button--primary
  if (modifier) id += `.${modifier.name}`;

  const head = `<title>Example: ${page.reference}</title>
  <link rel="stylesheet" href="/${rootPath}public/styles/example.css" />
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700" rel="stylesheet" />`;

  const body = `${processMarkup(page.markup, modifier)}
  <script type="text/javascript" src="/${rootPath}public/scripts/example.js"></script>`;

  return savePage(
    {
      uri: `${rootPath}example/${id}`,
      head: head,
      body: body
    },
    docsPath
  );
}

module.exports = generateHtmlExample;
