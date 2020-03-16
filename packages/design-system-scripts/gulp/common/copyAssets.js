const copyDir = require('./copyDir');
const getPackageName = require('./getPackageName');
const gulp = require('gulp');
const streamPromise = require('./streamPromise');
const { CORE_PACKAGE_NAME } = require('./constants');
const { logTask } = require('./logUtil');

/**
 * Copy all fonts and images from a package directory's src folder to dist, and
 * also copy the fonts and images from the core design system package.
 */
module.exports = async function copyAssets(sourcePackageDir, destPackageDir = null) {
  const src = `${sourcePackageDir}/src`;
  const dest = `${destPackageDir ? destPackageDir : sourcePackageDir}/dist`;

  // Check to see if this is the core package. If it's not, copy assets from core
  const packageName = await getPackageName(sourcePackageDir);
  if (packageName !== CORE_PACKAGE_NAME) {
    logTask('🖼 ', `Copying fonts and images from ${CORE_PACKAGE_NAME} to ${dest}`);
    const pkgDist = `node_modules/${CORE_PACKAGE_NAME}/dist`;
    await Promise.all([
      copyDir(`${pkgDist}/fonts`, `${dest}/fonts`),
      copyDir(`${pkgDist}/images`, `${dest}/images`)
    ]);
  }

  await Promise.all([
    copyDir(`${src}/fonts`, `${dest}/fonts`),
    copyDir(`${src}/images`, `${dest}/images`)
  ]);
};
