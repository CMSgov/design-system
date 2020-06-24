const { get } = require('lodash');
const fs = require('mz/fs');
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
      if (page.reactProps) {
        const reactComponent = get(data, [page.reactProps, 'props']);
        if (reactComponent) {
          page.reactComponentProps = reactComponent;
          page.reactComponentPath = get(data, [page.reactProps, 'relativePath']);
        } else {
          logError(
            'addReactDocs',
            `Invalid react props key ${page.reactProps} for ${page.source.path}`
          );
        }
      }

      if (page.reactExample) {
        const reactExample = get(data, [page.reactExample, 'source']);
        if (reactExample) {
          page.reactExampleSource = reactExample;
          page.reactExampleEntry = get(data, [page.reactExample, 'path']);
        } else {
          logError(
            'addReactDocs',
            `Invalid react example key ${page.reactExample} for ${page.source.path}`
          );
        }
      }
    });
  });
};
