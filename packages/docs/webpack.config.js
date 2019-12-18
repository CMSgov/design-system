/* eslint-disable filenames/match-exported */
const buildPath = require('../../tools/gulp/common/buildPath');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/**
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @param {Array} packages - Design system and theme package directory names
 * @param {Boolean} hotReload - Enable Webpack's hot module replacement
 * @return {Object} Webpack config
 */
function createConfig(docsPath, rootPath = '', packages, hotReload = true) {
  const packagePaths = packages.map(dir =>
    fs.realpathSync(path.resolve(__dirname, '..', dir, 'src'))
  );

  const config = {
    mode: process.env.NODE_ENV,
    context: __dirname,
    entry: {
      index: ['./src/scripts/helpers/polyfills.js', './src/scripts/index.jsx'],
      example: ['./src/scripts/example.js']
    },
    output: {
      path: path.resolve(__dirname, `../../${buildPath(docsPath, rootPath, '/public/scripts/')}`),
      publicPath: path.join('/', rootPath, '/public/scripts/'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [{ loader: 'babel-loader' }],
          include: [path.resolve(__dirname, 'src')].concat(packagePaths)
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          root: JSON.stringify(rootPath),
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

module.exports = createConfig;
