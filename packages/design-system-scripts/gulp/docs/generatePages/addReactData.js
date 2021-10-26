const { get } = require('lodash');
const fs = require('mz/fs');
const { logError } = require('../../common/logUtil');
const { REACT_PROP_DATA_PATH, REACT_EXAMPLE_DATA_PATH } = require('../../common/constants');

function addReactPropData(pageSections) {
  return fs.readFile(REACT_PROP_DATA_PATH, 'utf8').then((contents) => {
    const data = JSON.parse(contents);

    pageSections.forEach((page) => {
      if (page.reactProps) {
        const reactComponent = get(data, [page.reactProps, 'props']);
        if (reactComponent) {
          page.reactComponentProps = reactComponent;
          page.reactComponentPath = get(data, [page.reactProps, 'relativePath']);
        } else {
          logError('addReactPropData', `Invalid key ${page.reactProps} for ${page.source.path}`);
        }
      }
    });
  });
}

function addReactExampleData(pageSections) {
  return fs.readFile(REACT_EXAMPLE_DATA_PATH, 'utf8').then((contents) => {
    const data = JSON.parse(contents);

    pageSections.forEach((page) => {
      if (page.reactExample) {
        const reactExample = get(data, [page.reactExample, 'source']);
        if (reactExample) {
          page.reactExampleSource = reactExample;
          page.reactExampleEntry = get(data, [page.reactExample, 'path']);
        } else {
          logError(
            'addReactExampleData',
            `Invalid key ${page.reactExample} for ${page.source.path}`
          );
        }
      }
    });
  });
}

/**
 * Iterates through un-nested pageSections and identifies those with a React
 * component or example. For those pageSections, the relevant React documentation
 * data is added as new properties to the page data
 * @param {Array} pageSections
 * @returns {Promise}
 */
async function addReactData(pageSections) {
  await addReactPropData(pageSections);
  await addReactExampleData(pageSections);
}

module.exports = addReactData;
