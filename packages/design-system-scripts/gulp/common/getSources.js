
const { CORE_PACKAGE_NAME } = require('../common/constants');
const getPackageName = require('./getPackageName');

/**
 * Child Design Systems need to process files from the core CMSDS package
 * in addition to their own files
 */
module.exports = async function getSources(sourcePackageDir) {
  const pkgName = await getPackageName(sourcePackageDir);

  return pkgName === CORE_PACKAGE_NAME
    ? [sourcePackageDir]
    : [sourcePackageDir, `node_modules/${CORE_PACKAGE_NAME}`];
}