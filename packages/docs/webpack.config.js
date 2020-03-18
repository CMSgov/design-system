/* eslint-disable filenames/match-exported */
const buildPath = require('../../tools/gulp/common/buildPath');
const path = require('path');
const webpack = require('webpack');

/**
 * @param {String} docsPath
 * @param {String} rootPath - Root docs site path
 * @param {Array} srcPaths - Paths to directories to include in the babel-loader
 * @param {Boolean} hotReload - Enable Webpack's hot module replacement
 * @return {Object} Webpack config
 */
function createConfig(docsPath, srcPaths, githubUrl, rootPath = '', hotReload = true) {
  const config = {
    mode: process.env.NODE_ENV,
    context: __dirname,
    entry: {
      index: ['./src/scripts/index.jsx'],
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
          include: [path.resolve(__dirname, 'src')].concat(srcPaths)
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

module.exports = createConfig;
