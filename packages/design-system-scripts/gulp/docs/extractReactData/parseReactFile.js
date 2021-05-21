const replaceExt = require('replace-ext');
const path = require('path');
const reactDocgen = require('react-docgen');
const tsDocgen = require('react-docgen-typescript');
const through = require('through2');
const { get } = require('lodash');
const { logTask, logData, logError } = require('../../common/logUtil');
const { reactDocgenHandler, processDocgenTemplates } = require('./reactDocgenHandler');

/**
 * A Gulp plugin that generates JSON objects from a stream of React
 * component or example files. The outputted objects are then used
 * for rendering propType documentation and JS markup examples
 * @param {String} rootPath - Root docs site path
 */
function parseFile(isExample, options) {
  const response = {};

  return through.obj((file, encoding, cb) => {
    try {
      if (file.isNull()) return cb(null, file);

      const fileName = file.basename;
      const reactData = isExample ? parseExample(file) : parseComponent(file, options);
      reactData.path = file.path;

      // Override logic mirrored from `uniquePages`
      // TODO: process react docs with markdown pages
      if (response[fileName]) {
        if (response[fileName].path.match(/node_modules/)) {
          // We override react docs that come from `node_modules`
          logTask(
            '🖊️  ',
            `Overriding ${fileName} ${isExample ? 'react example' : 'react props'} with ${
              file.path
            }`
          );
          response[fileName] = reactData;
        }
      } else {
        response[fileName] = reactData;
      }
    } catch (e) {
      logError('react-docgen', e);
      logData('react-docgen', file.path);
    }

    file.contents = Buffer.from(JSON.stringify(response));
    file.path = replaceExt(file.path, '.json');
    return cb(null, file);
  });
}

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
 * For a component file, we parse it's path relative to the root of the repo
 * to generate the "View source" url.
 * For child design systems, we rely on the provided `githubUrl` or cwd in order to infer the repo root.
 * // TODO: Make this logic less fragile
 */
function getRelativePath(file, options) {
  const coreFileMatch = file.path.match(
    /(packages|@cmsgov)\/((design-system|design-system-docs)\/.*)$/i
  );
  if (coreFileMatch && coreFileMatch.length === 4) {
    // The file is coming from the core CMSDS
    return coreFileMatch[2];
  } else {
    // The file is coming from a child DS
    const githubRepo = path.basename(options.githubUrl);
    const githubMatch = file.path.match(new RegExp(`${githubRepo}/(.*)$`, 'i'));
    const cwdMatch = file.path.match(new RegExp(`${process.cwd()}/(.*)$`, 'i'));

    // Use either the githubUrl or the cwd to find the file path relative to the child DS repo root
    const relativePath = get(githubMatch, 1) || get(cwdMatch, 1);
    if (!relativePath) {
      logError(
        'getRelativePath',
        `Unable to generate the "View source" url for ${file.path}. Please ensure the repo folder name matches the provided 'githubURL'`
      );
    }
    return relativePath;
  }
}

/**
 * For a component file, we parse it for its PropTypes documentation
 * @param {Object} file
 * @param {String} rootPath
 */
function parseComponent(file, options) {
  let docs;

  if (file.extname === '.tsx') {
    // Avoid processing .tsx files unless typescript config is enabled
    if (!options.typescript) {
      docs = [{}];
    } else {
      // Filter so that when Components extend standard HTML, those props do not also get printed in the docs page
      const tsOptions = {
        propFilter: (props) =>
          !props.parent ||
          !props.parent.fileName.includes('node_modules') ||
          props.parent.fileName.includes('@cmsgov'),
      };

      // Use `react-docgen-typescript` for `tsx` files
      docs = tsDocgen.withCustomConfig(path.resolve('tsconfig.json'), tsOptions).parse(file.path);
      processDocgenTemplates(docs[0], options);
    }
  } else {
    // Use `react-docgen` for normal `jsx` files
    docs = reactDocgen.parse(
      file.contents,
      reactDocgen.resolver.findAllExportedComponentDefinitions,
      reactDocgenHandler(options),
      { filename: file.basename }
    );
  }

  if (docs.length !== 1) {
    // There should only ever be one component definition
    logError('parseComponent', 'React doc gen should result in 1 document parsed');
  }
  const reactData = docs[0];

  // Reduce filesize by removing properties we don't need
  delete reactData.methods;

  // Get relative path for the "View source" link
  reactData.relativePath = getRelativePath(file, options);

  return reactData;
}

module.exports = {
  parseReactExample: (options) => parseFile(true, options),
  parseReactProps: (options) => parseFile(false, options),
};
