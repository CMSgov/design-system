const buildPath = require('../../tools/gulp/common/buildPath');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/**
 * @param {String} rootPath - Root docs site path
 * @param {Array} packages - Design system and theme package directory names
 * @param {Boolean} hotReload - Enable Webpack's hot module replacement
 * @return {Object} Webpack config
 */
function createConfig(rootPath = '', packages, hotReload = true) {
  const packagePaths = packages.map(dir =>
    fs.realpathSync(path.resolve(__dirname, '..', dir, 'src'))
  );

  const config = {
    context: __dirname,
    entry: {
      index: [
        './src/scripts/helpers/polyfills.js',
        './src/scripts/index.jsx'
      ],
      example: ['./src/scripts/example.js']
    },
    output: {
      path: path.resolve(
        __dirname,
        `../../${buildPath(rootPath, '/public/scripts/')}`
      ),
      publicPath: path.join('/', rootPath, '/public/scripts/'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: ['babel-loader'],
          include: [
            path.resolve(__dirname, 'src'),
            // Transpile react-element-to-jsx-string dependency
            // https://github.com/algolia/react-element-to-jsx-string/issues/71
            // https://github.com/sindresorhus/file-type/issues/70
            path.resolve(__dirname, 'node_modules/stringify-object'),
            path.resolve(__dirname, 'node_modules/get-own-enumerable-property-symbols')
          ].concat(packagePaths)
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          root: JSON.stringify(rootPath),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['../', 'node_modules']
    }
  };

  if (process.env.NODE_ENV === 'production') {
    const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        warnings: false
      },
      mangle: false // Mangle messes up React code snippets
    });

    config.plugins.push(uglifyPlugin);
  } else if (hotReload) {
    const keys = ['index']; // Object.keys(config.entry);

    keys.forEach(key => {
      config.entry[key] = [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'
      ].concat(config.entry[key]);
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
}

module.exports = createConfig;
