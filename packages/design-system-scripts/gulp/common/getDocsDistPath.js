const path = require('path');

/**
 * The documentation can be setup to be published in a subdirectory. This is
 * a simple helper method for outputting the proper build path.
 */
module.exports = (docsPath, rootPath = '', basename = '') => {
  return path.resolve(docsPath, 'dist', rootPath, basename);
};
