const fs = require('mz/fs');
const path = require('path');

/**
 * @param {String} filename - Name of file coming after ~theme/. It may or may
 *                          not have the file extension
 * @return {Promise} Resolves with the filename relative to the theme's src
 *                   directory, or null if the file doesn't exist
 */
function filePath(filename) {
  return themePath()
    .then(dir => {
      if (dir) return path.join(dir, 'src', filename);
    });
}

/**
 * Detects if a theme directory is present
 * @return {Promise<String>} Absolute path to the theme's directory
 */
function themePath() {
  const themes = path.join(__dirname, '../../../packages/themes');

  return fs.stat(themes)
    .then(stats => {
      if (stats.isDirectory()) {
        return fs.readdir(themes);
      }

      throw Error('No themes directory');
    })
    .then(files => {
      let dir;

      // Return the first directory we find.
      // If multiple theme support is required in the future, this can
      // change to a filter that picks whatever theme is requested
      files.some(filename => {
        const filePath = path.join(themes, filename);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          dir = filePath;
          return true;
        }

        return false;
      });

      return dir;
    });
}

/**
 * A custom node-sass importer to handle cases where we want to import a
 * theme's Sass file. This allows us to use a generic "~theme/" path and
 * return an empty string if a theme isn't present.
 * @param {String} url - the path in import as-is
 * @param {String} prev - the previously resolved path
 * @param {Function} done - a callback function to invoke on async completion,
 *                        takes an object literal containing `file` (String) or
 *                        `contents` (String).
 */
function themeImporter(url, prev, done) {
  const match = url.match(/^~theme\/([a-z.]+)/i);

  if (match) {
    filePath(match[1])
      .then(file => {
        if (file) return done({ file: file });
        done({ contents: '' });
      })
      .catch(() => done({ contents: '' }));
  } else {
    // Return null to fallback to default importer
    return null;
  }
};

module.exports = themeImporter;
