const MemoryFS = require('memory-fs');
const path = require('path');
const savePage = require('./savePage');
const webpack = require('webpack');

/**
 * Creates an HTML page using the React component and no additional UI.
 * This can then be viewed in a browser, or rendered in an iFrame in
 * the documentation.
 * @param {Object} page
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @return {Promise}
 */
function generateReactExample(page, docsPath, rootPath) {
  return new Promise((resolve, reject) => {
    if (rootPath) {
      rootPath = `${rootPath}/`;
    }

    const examplePath = path.resolve(__dirname, '../../../packages', page.reactExamplePath);

    const compiler = createWebpackCompiler(examplePath);
    // Compile file to memory
    // https://webpack.js.org/api/node/#custom-file-systems
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((err, stats) => {
      if (err) return reject(err);
      const exampleScripts = stats.compilation.assets['bundle.js'].source();

      const head = `<title>Example: ${page.reference}</title>
  <link rel="stylesheet" href="/${rootPath}public/styles/example.css" />`;
      const body = `<div id="js-example"></div>
      <script type="text/javascript" src="/${rootPath}public/scripts/example.js"></script>
      <script type="text/javascript">${exampleScripts}</script>`;

      const output = savePage(
        {
          uri: `${rootPath}example/${page.reference}`,
          head: head,
          body: body
        },
        docsPath
      );
      resolve(output);
    });
  });
}

/**
 * Create an instance of the Webpack compiler to be used for
 * bundling and compiling the Example file.
 * @param {String} examplePath - Path to entry file
 * @return {*} Webpack compiler instance
 */
function createWebpackCompiler(examplePath) {
  const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: examplePath,
    output: { filename: 'bundle.js', path: '/build' },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },
    plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
    resolve: { extensions: ['.js', '.jsx'] },
    performance: {
      hints: false
    }
  };

  if (process.env.NODE_ENV === 'production') {
    webpackConfig.optimization = {
      minimize: true
    };
  }

  return webpack(webpackConfig);
}

module.exports = generateReactExample;
