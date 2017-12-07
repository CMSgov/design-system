const componentPathFromSource = require('../../../packages/docs/src/scripts/shared/componentPathFromSource')
  .default;
const MemoryFS = require('memory-fs');
const path = require('path');
const savePage = require('./savePage');
const webpack = require('webpack');

/**
 * Creates an HTML page using the React component and no additional UI.
 * This can then be viewed in a browser, or rendered in an iFrame in
 * the documentation.
 * @param {Object} page
 * @param {String} rootPath - Root docs site path
 * @return {Promise}
 */
function generateReactExample(page, rootPath) {
  return new Promise((resolve, reject) => {
    if (rootPath) {
      rootPath = `${rootPath}/`;
    }

    let examplePath = componentPathFromSource(
      page.source.path,
      page.reactExample || page.reactComponent
    );

    // Provide support to pass in a component with or without the extension
    examplePath = examplePath.replace(/\.example\.jsx$/, '');
    examplePath = path.resolve(
      __dirname,
      '../../../packages',
      `${examplePath}.example.jsx`
    );

    // TODO: Setup production bundling
    const compiler = webpack({
      entry: examplePath,
      output: {
        filename: 'bundle.js',
        path: '/build'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    });

    // Compile file to memory
    // https://webpack.js.org/api/node/#custom-file-systems
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((err, stats) => {
      if (err) return reject(err);
      const exampleScripts = stats.compilation.assets['bundle.js'].source();

      const head = `<title>Example: ${page.reference}</title>
  <link rel="stylesheet" href="/${rootPath}public/styles/example.css" />`;
      const body = `<div id="js-root"></div>
      <script type="text/javascript">${exampleScripts}</script>`;

      const output = savePage({
        uri: `${rootPath}example/${page.reference}`,
        head: head,
        body: body
      });
      resolve(output);
    });
  });
}

module.exports = generateReactExample;
