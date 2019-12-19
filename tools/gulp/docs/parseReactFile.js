const dutil = require('../common/log-util');
const gutil = require('gulp-util');
const path = require('path');
const reactDocgen = require('react-docgen');
const reactDocgenHandlers = require('./react-docgen-handlers');
const through = require('through2');

/**
 * A Gulp plugin that generates JSON objects from a stream of React
 * component or example files. The outputted objects are then used
 * for rendering propType documentation and JS markup examples
 * @param {Object} options
 * @param {String} rootPath - Root docs site path
 */
module.exports = function(options = {}, rootPath) {
  const response = {};

  return through.obj((file, encoding, cb) => {
    try {
      if (file.isNull()) return cb(null, file);

      const data = file.path.match(/.example.(jsx|js)$/)
        ? parseExample(file)
        : parseComponent(file, rootPath);

      // Assign the data to a unique property, based on the filename,
      // so we can merge the JSON files in another stream
      response[getNameAfter(options.nameAfter, file.path)] = data;
    } catch (e) {
      dutil.logError('react-docgen', e);
      dutil.logData('react-docgen', file.path);
    }

    file.contents = Buffer.from(JSON.stringify(response));
    file.path = gutil.replaceExtension(file.path, '.json');
    return cb(null, file);
  });
};

/**
 * For an example file, we only need a reference to its uncompiled source code
 * @param {Object} file
 */
function parseExample(file) {
  let source = file.contents.toString();
  // We use relative paths for the components, so this removes the import statements
  // from the example code to avoid causing confusion
  const imports = source.match(/^import.+/gm);
  if (imports) {
    // Remove everything up to the end of the last import statement
    const lastImport = imports[imports.length - 1];
    source = source.substring(source.indexOf(lastImport) + lastImport.length).trim();
  }

  return { source };
}

/**
 * For a component file, we parse it for its PropTypes documentation
 * @param {Object} file
 * @param {String} rootPath
 */
function parseComponent(file, rootPath) {
  const docs = reactDocgen.parse(
    file.contents,
    reactDocgen.resolver.findAllExportedComponentDefinitions,
    reactDocgenHandlers(rootPath)
  );

  docs.forEach(doc => {
    // Reduce filesize by removing properties we don't need
    delete doc.methods;
  });

  return docs;
}

/**
 * Grab a segment of a string that comes after nameAfter
 * @param {String} nameAfter - Where in the path to begin copying
 * @param {String} filePath - The full file path
 */
function getNameAfter(nameAfter, filePath) {
  if (!nameAfter) return path.basename(filePath);
  const rx = new RegExp(`${nameAfter}([a-z0-9-_./]+)`, 'i');
  return filePath.match(rx)[1];
}
