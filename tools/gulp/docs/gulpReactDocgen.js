/**
 * Creates a Gulp-friendly implementation of react-docgen, extended with our own
 * Markdown handler. Accepts a stream of React component files and returns a
 * stream of JSON documentation files.
 */
const dutil = require('../common/log-util');
const gutil = require('gulp-util');
const marked = require('marked');
const path = require('path');
const reactDocgen = require('react-docgen');
const through = require('through2');
const handlers = reactDocgen.defaultHandlers.concat([markdownHandler]);

function getPropertyName(nameAfter, filePath) {
  if (!nameAfter) return path.basename(filePath);
  let rx = new RegExp(`${nameAfter}([a-z0-9-_./]+)`, 'i');
  return filePath.match(rx)[1];
}

function markdownHandler(doc) {
  const desc = doc.get('description');
  const docObject = doc.toObject();

  Object.keys(docObject.props).forEach(propName => {
    let propDescriptor = doc.getPropDescriptor(propName);

    if (propDescriptor.description !== '') {
      propDescriptor.description = marked(propDescriptor.description);
    }
  });

  if (desc !== '') {
    doc.set('description', marked(desc));
  }
}

module.exports = function(options) {
  options = options || {};
  let response = {};

  return through.obj((file, encoding, cb) => {
    try {
      if (file.isNull()) return cb(null, file);

      let doc = reactDocgen.parse(
        file.contents,
        reactDocgen.resolver.findExportedComponentDefinition,
        handlers
      );
      // Reduce filesize by removing properties we don't need
      delete doc.methods;

      // Assign the doc object to a unique property so we can
      // merge the JSON files in another stream
      response[getPropertyName(options.nameAfter, file.path)] = doc;
    } catch (e) {
      dutil.logError('react-docgen', e);
      dutil.logData('react-docgen', file.path);
      response = {};
    }

    file.contents = new Buffer(JSON.stringify(response));
    file.path = gutil.replaceExtension(file.path, '.json');
    return cb(null, file);
  });
};
