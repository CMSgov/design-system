const del = require('del');
const { logTask } = require('./logUtil');

/**
 * Empty the dist/ directory so any stale files are removed
 */
module.exports = function cleanDist(dir) {
  logTask('🚮 ', `Resetting "dist" directory: ${dir}`);
  return del([`${dir}/dist`]);
};
