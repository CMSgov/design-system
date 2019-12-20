const path = require('path');

/**
 * Return the path for a file relative to the theme package's directory
 * @param {String} themeDirectory - Name of the theme directory, relative to
 *                                packages/ (ie. "themes/foo")
 * @param {String} filename - Name of file coming after ~theme/. It may or may
 *                          not have the file extension
 * @return {Promise} Resolves with the filename relative to the theme's src
 *                   directory, or null if the file doesn't exist
 */
function filePath(themeDirectory, filename) {
  return path.join(__dirname, '../../../packages', themeDirectory, 'src', filename);
}

/**
 * A custom node-sass importer to handle cases where we want to import a
 * theme's Sass file. This allows us to use a generic "~theme/" path and
 * return an empty string if a theme isn't present.
 * @param {Array} packages - Design system and theme package directory names
 * @param {String} url - the path in import as-is
 */
function themeImporter(packages, url) {
  const match = url.match(/^~theme\/([a-z.]+)/i);
  const themePackages = packages.filter(name => name.match(/^themes\//));

  if (match) {
    if (themePackages.length) {
      return { file: filePath(themePackages[0], match[1]) };
    } else {
      return { contents: '' };
    }
  } else {
    // Return null to fallback to default importer
    return null;
  }
}

module.exports = themeImporter;
