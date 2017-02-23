/**
 * Creates a Gulp-friendly implementation of react-docgen. Takes a stream
 * of React component files and returns a stream of JSON documentation files.
 */
const gUtil = require('gulp-util');
const reactDocgen = require('react-docgen');
const path = require('path');
const through = require('through2');

function getPropertyName(nameAfter, filePath) {
  if (!nameAfter) return path.basename(filePath);
  let rx = new RegExp(`${nameAfter}([a-z0-9-_\.\/]+)`, 'i');
  return filePath.match(rx)[1];
}

module.exports = function(options) {
  options = options || {};

  return through.obj((file, encoding, cb) => {
    if (file.isNull()) return cb(null, file);

    let doc = reactDocgen.parse(file.contents);
    // Reduce filesize by removing properties we don't need
    delete doc.methods;

    // Assign the doc object to a unique property so we can
    // merge the JSON files in another stream
    let response = {};
    response[getPropertyName(options.nameAfter, file.path)] = doc;

    file.contents = new Buffer(JSON.stringify(response));
    file.path = gUtil.replaceExtension(file.path, '.json');
    return cb(null, file);
  });
};
