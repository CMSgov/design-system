const reactPathFromSassSource = require('./reactPathFromSassSource');
const fs = require('mz/fs');

/**
 * Iterates through the un-nested pages and identifies those with a React
 * component or example. For those pages, the relevant React documentation
 * data is added as new properties to the page data
 * @param {Array} pages
 * @param {String} dataPath
 * @returns {Promise}
 */
module.exports = function(pages, dataPath) {
  return fs.readFile(dataPath, 'utf8').then(contents => {
    const data = JSON.parse(contents);

    pages.forEach(page => {
      if (page.reactComponent || page.reactExample) {
        const componentPath = `${reactPathFromSassSource(
          page.source.path,
          page.reactComponent
        )}.jsx`;
        const componentData = data[componentPath];
        const examplePath = formExamplePath(page);
        const exampleData = data[examplePath];

        page.reactComponentPath = componentPath;
        // There should only ever be one exported component definition
        page.reactComponentDocs =
          componentData && componentData.length ? componentData[0] : null;

        if (exampleData && exampleData.source) {
          page.reactExamplePath = examplePath;
          page.reactExampleSource = exampleData.source;
        }
      }
    });
  });
};

/**
 * @param {Object} page
 * @return {String} Path to the file responsible for rendering a
 *  React component's example. Relative to packages/
 */
function formExamplePath(page) {
  let examplePath = reactPathFromSassSource(
    page.source.path,
    page.reactExample || page.reactComponent
  );

  // Provide support to pass in a component with or without the extension
  examplePath = examplePath.replace(/\.example\.jsx$/, '');
  return `${examplePath}.example.jsx`;
}
