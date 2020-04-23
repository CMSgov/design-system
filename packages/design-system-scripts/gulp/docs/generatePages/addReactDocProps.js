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
      // TODO: Replace this logic with explicitly defined paths in KSS/markdown
      if (page.reactProps) {
        const reactComponentFile = path.join(path.dirname(page.source.path), page.reactProps);

        const reactProps = get(data, [page.reactProps, 0, 'props']);
        if (reactProps) {
          page.reactComponentPath = reactComponentFile;
          // There should only ever be one exported component definition
          page.reactComponentProps = reactProps;
        } else {
          logError('react doc props', `Invalid react component for ${page.source.path}`);
        }
      }

      if (page.reactExample) {
        const reactExampleFile = path.join(path.dirname(page.source.path), page.reactExample);

        const reactExample = get(data, [page.reactExample, 'source']);
        if (reactExample) {
          page.reactExamplePath = reactExampleFile;
          page.reactExampleSource = reactExample;
        } else {
          logError('react doc props', `Invalid react example for ${page.source.path}`);
        }
      }
    });
  });
};
