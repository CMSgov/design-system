// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('@babel/register')({
  only: [/(@cmsgov\/design-system-docs|design-system\/packages\/([a-z-_]+)\/src|generateDocPage)/],
});

const generateHtmlExample = require('./generateHtmlExample');
const generateReactExample = require('./generateReactExample');
let generateDocPage;

/**
 * Create an HTML page
 * @param {Array} routes - The documentation's nested routes
 * @param {Object} page
 * @param {String} docsPath
 * @param {String} options
 * @param {Boolean} isExample - Whether this page should have the docs UI or
 *   if it only render the markup/reactComponent/reactExample
 * @return {Promise<Boolean>}
 */
function generatePage(routes, page, docsPath, sourceDir, options, isExample) {
  if (!generateDocPage) {
    // We need to require this module inside of the method because
    // it depends on compiled React files. Those files are compiled
    // in a preceding Gulp task, and requiring this outside of the
    // method will break things.
    generateDocPage = require('./generateDocPage');
  }

  if (isExample) {
    return generateExamples(page, docsPath, sourceDir, options);
  } else if (typeof page.referenceURI === 'string') {
    return generateDocPage(routes, page, docsPath, options);
  }

  return Promise.resolve(false);
}

function generateExamples(page, docsPath, sourceDir, options) {
  return generateHtmlExample(page, null, docsPath, options)
    .then(() => {
      if (page.modifiers) {
        return page.modifiers.map((modifier) =>
          generateHtmlExample(page, modifier, docsPath, options)
        );
      }
    })
    .then(() => {
      if (page.reactExampleSource) {
        generateReactExample(page, docsPath, sourceDir, options);
      }
    });
}

module.exports = generatePage;
