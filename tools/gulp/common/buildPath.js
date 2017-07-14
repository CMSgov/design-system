const path = require('path');

/*
The documentation can be setup to be published in a subdirectory named after the
package version. This is a simple helper method for outputing the proper build path.
*/

module.exports = (rootPath, basename = '') => {
  return path.join('docs', rootPath, basename);
};
