const fs = require('mz/fs');
const path = require('path');
const { logError } = require('../../common/logUtil');

function reactComponentDir(docFilePath) {
  // Get react component directory from the documentation file path
  // Directory is relative to `packages/`
  // Example: packages/design-system/components/Button/_Button.docs.scss -> packages/design-system/components/Button/
  // TODO: replace hardcoded `.docs.scss` with mdx or a more robust regex logic
  return docFilePath.match(/(packages\/[a-z0-9\-/]+\/)[_a-z0-9]+\.docs\.scss/i)[1];
}

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
        const reactComponentFile = `${path.join(
          reactComponentDir(page.source.path),
          page.reactComponent
        )}.jsx`;
        const reactExampleFile = `${path.join(
          reactComponentDir(page.source.path),
          page.reactComponent
        )}.example.jsx`;

        if (page.reactComponent) {
          const componentData = data[reactComponentFile];
          if (componentData && componentData.length === 1) {
            page.reactComponentPath = reactComponentFile;
            // There should only ever be one exported component definition
            page.reactComponentDocs = componentData[0];
          } else {
            logError(
              'react doc props',
              `Invalid react component path or data for ${page.reactComponent}`
            );
          }
        }

        const exampleData = data[reactExampleFile];
        if (exampleData && exampleData.source) {
          page.reactExamplePath = reactExampleFile;
          page.reactExampleSource = exampleData.source;
        }
      }
    });
  });
};
