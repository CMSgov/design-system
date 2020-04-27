const replaceExt = require('replace-ext');
const path = require('path');
const reactDocgen = require('react-docgen');
const reactDocgenHandlers = require('./react-docgen-handlers');
const through = require('through2');
const { logData, logError } = require('../common/logUtil');

/**
 * A Gulp plugin that generates JSON objects from a stream of React
 * component or example files. The outputted objects are then used
 * for rendering propType documentation and JS markup examples
 * @param {String} rootPath - Root docs site path
 */
module.exports = function (rootPath) {
  const response = {};

  return through.obj((file, encoding, cb) => {
    try {
      if (file.isNull()) return cb(null, file);

      const fileName = path.basename(file.path);
      const exampleFile = fileName.match(/.example.jsx$/);

      const data = exampleFile ? parseExample(file) : parseComponent(file, rootPath);

      // Override logic mirrored from `uniquePages`
      // TODO: process react docs with markdown pages
      if (response[fileName]) {
        if (response[fileName].path.match(/node_modules/)) {
          // We override react docs that come from `node_modules`
          // logTask('🖊️  ', `Overriding ${fileName} ${exampleFile ? 'react example' : 'react props'} with ${file.path}`);
          response[fileName] = data;
        }
      } else {
        response[fileName] = data;
      }
    } catch (e) {
      logError('react-docgen', e);
      logData('react-docgen', file.path);
    }

    file.contents = Buffer.from(JSON.stringify(response));
    file.path = replaceExt(file.path, '.json');
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

  return { source, path: file.path };
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

  docs.forEach((doc) => {
    // Reduce filesize by removing properties we don't need
    delete doc.methods;
    doc.path = file.path;
  });

  if (docs.length !== 1) {
    // There should only ever be one component definition
    logError('parseComponent', 'React doc gen should result in 1 document parsed');
  }

  return docs[0];
}
