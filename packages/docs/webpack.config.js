const buildPath = require('../../tools/gulp/common/buildPath');
const path = require('path');
const webpack = require('webpack');

// TODO: Find a way to have a source of truth for this rootPath. Everywhere else
// gets it from tools/gulp/index.js. We could potentially set it from within
// tools/gulp/webpack.js?
const rootPath = 'design-system/';
const hotReload = true;

let config = {
  context: __dirname,
  entry: {
    example: ['./src/scripts/example.js'],
    index: ['./src/scripts/index.jsx']
  },
  output: {
    path: path.resolve(
      __dirname,
      `../../${buildPath(rootPath, 'public/scripts/')}`
    ),
    publicPath: `/${rootPath}public/scripts/`,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../core/src'),
          // Transpile react-element-to-jsx-string dependency
          // https://github.com/algolia/react-element-to-jsx-string/issues/71
          // https://github.com/sindresorhus/file-type/issues/70
          path.resolve(__dirname, 'node_modules/stringify-object'),
          path.resolve(__dirname, 'node_modules/get-own-enumerable-property-symbols')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
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
    config.entry[key] = ['webpack-hot-middleware/client'].concat(config.entry[key]);
  });

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
