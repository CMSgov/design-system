const createReactExampleWebpackConfig = require('../webpack/createReactExampleWebpackConfig');
const MemoryFS = require('memory-fs');
const path = require('path');
const savePage = require('./savePage');
const webpack = require('webpack');
const createAnalyticsTag = require('./createAnalyticsTag');
const { log } = require('../../common/logUtil');

/**
 * Creates an HTML page using the React component and no additional UI.
 * This can then be viewed in a browser, or rendered in an iFrame in
 * the documentation.
 * @param {Object} page
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @return {Promise}
 */
async function generateReactExample(
  page,
  docsPath,
  sourceDir,
  docsDir,
  { core, typescript, rootPath }
) {
  const config = await createReactExampleWebpackConfig(
    sourceDir,
    docsDir,
    page.reactExampleEntry,
    typescript
  );

  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    // Compile file to memory
    // https://webpack.js.org/api/node/#custom-file-systems
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((err, stats) => {
      if (err) return reject(err);
      const webpackErrors = stats.toString('errors-warnings');
      if (webpackErrors) {
        log(webpackErrors);
      }

      const exampleScripts = stats.compilation.assets['bundle.js'].source();

      // TODO: Remove line `${core ? createAnalyticsTag() : ''}` before merging to master
      // Purpose if for localhost testing of Tealium event tracking
      const head = `
        <title>Example: ${page.reference}</title>
        <link rel="stylesheet" href="/${path.join(rootPath, 'example.css')}" />
        ${core ? createAnalyticsTag() : ''}
      `;
      const body = `
        <div id="js-example"></div>
        <script type="text/javascript" src="/${path.join(rootPath, 'example.js')}"></script>
        <script type="text/javascript">${exampleScripts}</script>
      `;

      const output = savePage(
        {
          uri: `example/${page.reference}`,
          head: head,
          body: body,
        },
        docsPath
      );
      resolve(output);
    });
  });
}

module.exports = generateReactExample;
