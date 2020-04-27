const fs = require('mz/fs');
const path = require('path');
const { logError } = require('../../common/logUtil');

/**
 * Iterates through the un-nested pages and identifies those with a React
 * component or example. For those pages, the relevant React documentation
 * data is added as new properties to the page data
 * @param {Array} pages
 * @param {String} dataPath
 * @returns {Promise}
 */
module.exports = function (pages, dataPath) {
  return fs.readFile(dataPath, 'utf8').then((contents) => {
    const data = JSON.parse(contents);

    pages.forEach((page) => {
      // TODO: Replace this logic with explicitly defined paths in KSS/markdown
      if (page.reactComponent || page.reactExample) {
        const reactComponentFile = `${path.join(
          path.dirname(page.source.path),
          page.reactComponent
        )}.jsx`;
        const reactExampleFile = `${path.join(
          path.dirname(page.source.path),
          page.reactComponent
        )}.example.jsx`;

        if (page.reactComponent) {
          const componentData = data[reactComponentFile];
          if (componentData && componentData.length === 1) {
            page.reactComponentPath = reactComponentFile;
            page.reactComponentDocs = componentData;
          } else {
            logError(
              'react doc props',
              `Invalid react component path or data for ${reactComponentFile}`
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
