const copyDir = require('../common/copyDir');
const del = require('del');
const path = require('path');

const tempDir = path.resolve('tmp/docs');

/**
 * Copy all docs directories into a temporary directory, where the order of copy
 * operations matches the order of directory array passed in.
 *
 * @param {String} dirs - Directory paths, in copy order
 * @return {Promise<string>} Path to new temporary directory
 */
module.exports = async function copyDocsToTempDir(dirs) {
  await del(tempDir);
  for (const dir of dirs) {
    await copyDir(dir, tempDir);
  }
  return tempDir;
};
