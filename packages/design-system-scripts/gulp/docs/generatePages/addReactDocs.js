const { get } = require('lodash');
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
      if (page.reactProps) {
        const reactProps = get(data, [page.reactProps, 'props']);
        if (reactProps) {
          // There should only ever be one exported component definition
          page.reactComponentProps = reactProps;
          page.reactComponentPath = path.join(path.dirname(page.source.path), page.reactProps);
        } else {
          logError('addReactDocs', `Invalid react component for ${page.source.path}`);
        }
      }

      if (page.reactExample) {
        const reactExample = get(data, [page.reactExample, 'source']);
        if (reactExample) {
          page.reactExampleSource = reactExample;
          page.reactExamplePath = path.join(path.dirname(page.source.path), page.reactExample);
        } else {
          logError('addReactDocs', `Invalid react example for ${page.source.path}`);
        }
      }
    });
  });
};
