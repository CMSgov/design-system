/* eslint-disable filenames/match-exported */
const path = require('path');
const webpack = require('webpack');
const getDocsDistPath = require('../common/getDocsDistPath');

/**
 * @param {String} docsPath
 * @param {Array} srcPaths - Paths to directories to include in the babel-loader
 * @param {String} rootPath - Root docs site path
 * @param {Boolean} hotReload - Enable Webpack's hot module replacement
 * @return {Object} Webpack config
 */
function createWebpackConfig(docsPath, srcPaths, rootPath = '', githubUrl = '', hotReload = true) {
  const distPath = getDocsDistPath(docsPath, rootPath, 'public/scripts/');
  const config = {
    mode: process.env.NODE_ENV,
    context: __dirname,
    entry: {
      index: [path.resolve(docsPath, 'src/scripts/index.jsx')],
      example: [path.resolve(docsPath, 'src/scripts/example.js')],
    },
    output: {
      path: distPath,
      publicPath: distPath,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env']
              }
            }
          ],
          include: srcPaths
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          root: JSON.stringify(rootPath),
          githubUrlBase: JSON.stringify(githubUrl),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['../', 'node_modules']
    },
    performance: {
      hints: false
    }
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      minimize: true
    };
  } else if (hotReload) {
    const keys = ['index']; // Object.keys(config.entry);

    keys.forEach(key => {
      config.entry[key] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(
        config.entry[key]
      );
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
}

module.exports = createWebpackConfig;
