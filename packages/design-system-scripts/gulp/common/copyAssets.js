const copyDir = require('./copyDir');
const path = require('path');

/**
 * Copy all fonts and images from a package directory's src folder to dist, and
 * also copy the fonts and images from the core design system package.
 */
module.exports = async function copyAssets(sourcePackageDir, destPackageDir = null) {
  const src = path.join(sourcePackageDir, 'src');
  const dest = path.join(destPackageDir || sourcePackageDir, 'dist');

  await Promise.all([
    copyDir(`${src}/fonts`, `${dest}/fonts`),
    copyDir(`${src}/images`, `${dest}/images`)
  ]);
};
