const getPackageName = require('./getPackageName');
const { CORE_SOURCE_PACKAGE, CORE_DOCS_PACKAGE } = require('./constants');

/**
 * Child Design Systems need to process files from the core CMSDS packages in addition to their own files.
 * These helpers append core npm packages to the list of directories to process if needed.
 */
module.exports = {
  async getSourceDirs(sourceDir) {
    const pkgName = await getPackageName(sourceDir);
    return pkgName === CORE_SOURCE_PACKAGE
      ? [sourceDir]
      : [sourceDir, `node_modules/${CORE_SOURCE_PACKAGE}`];
  },
  async getDocsDirs(docPackageDir) {
    const pkgName = await getPackageName(docPackageDir);
    return pkgName === CORE_DOCS_PACKAGE
      ? [docPackageDir]
      : [docPackageDir, `node_modules/${CORE_DOCS_PACKAGE}`];
  }
};
