// Run babel transforms on src files so we can run JSX scripts in Gulp tasks
require('babel-register')({
  only: /(packages\/([a-z-_]+|themes\/[a-z_-]+)\/src|generateDocPage)/
});

const generateDocPage = require('./generateDocPage');
const generateHtmlExample = require('./generateHtmlExample');

/**
 * Create an HTML page
 * @param {Array} routes - The documentation's nested routes
 * @param {Object} page
 * @param {String} rootPath - Root docs site path
 * @param {Boolean} isExample - Whether this page should have the docs UI or
 *   if it only render the markup/reactComponent/reactExample
 * @return {Promise<Boolean>}
 */
function generatePage(routes, page, rootPath, isExample) {
  if (isExample) {
    return generateExamples(page, rootPath);
  } else if (typeof page.referenceURI === 'string') {
    return generateDocPage(routes, page, rootPath);
  }

  return Promise.resolve(false);
}

function generateExamples(page, rootPath) {
  return generateHtmlExample(page, null, rootPath).then(() => {
    if (page.modifiers) {
      return page.modifiers.map(modifier =>
        generateHtmlExample(page, modifier, rootPath)
      );
    }
  });
}

module.exports = generatePage;
