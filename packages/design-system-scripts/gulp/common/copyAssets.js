const copyDir = require('./copyDir');

/**
 * Copy all fonts and images from a package directory's src folder to dist, and
 * also copy the fonts and images from the core design system package.
 */
module.exports = async function copyAssets(sourcePackageDir, destPackageDir = null) {
  const src = `${sourcePackageDir}/src`;
  const dest = `${destPackageDir || sourcePackageDir}/dist`;

  await Promise.all([
    copyDir(`${src}/fonts`, `${dest}/fonts`),
    copyDir(`${src}/images`, `${dest}/images`)
  ]);
};
