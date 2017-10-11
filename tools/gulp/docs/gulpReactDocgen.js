/**
 * Creates a Gulp-friendly implementation of react-docgen, extended with our own
 * Markdown handler. Accepts a stream of React component files and returns a
 * stream of JSON documentation files.
 */
const dutil = require('../common/log-util');
const gutil = require('gulp-util');
const path = require('path');
const reactDocgen = require('react-docgen');
const reactDocgenHandlers = require('./react-docgen-handlers');
const through = require('through2');

// This is the name we use to target the component's documentation
// from the merged documentation's JSON object.
function getPropertyName(nameAfter, filePath) {
  if (!nameAfter) return path.basename(filePath);
  let rx = new RegExp(`${nameAfter}([a-z0-9-_./]+)`, 'i');
  return filePath.match(rx)[1];
}

/**
 * @param {Object} options
 * @param {String} rootPath - Root docs site path
 */
module.exports = function(options, rootPath) {
  options = options || {};
  let response = {};

  return through.obj((file, encoding, cb) => {
    try {
      if (file.isNull()) return cb(null, file);

      const docs = reactDocgen.parse(
        file.contents,
        reactDocgen.resolver.findAllExportedComponentDefinitions,
        reactDocgenHandlers(rootPath)
      );

      docs.forEach(doc => {
        // Reduce filesize by removing properties we don't need
        delete doc.methods;
      });

      // Assign the docs object to a unique property so we can
      // merge the JSON files in another stream
      response[getPropertyName(options.nameAfter, file.path)] = docs;
    } catch (e) {
      dutil.logError('react-docgen', e);
      dutil.logData('react-docgen', file.path);
      response = {};
    }

    file.contents = Buffer.from(JSON.stringify(response));
    file.path = gutil.replaceExtension(file.path, '.json');
    return cb(null, file);
  });
};
