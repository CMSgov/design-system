const path = require('path');
const version = require('./package.json').version;
const webpack = require('webpack');

let config = {
  context: __dirname,
  entry: ['./src/scripts/index.jsx'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: `build/${version}/public/scripts/index.js`
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
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['../', 'node_modules']
  }
};

if (process.env.NODE_ENV === 'production') {
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true,
      mangle: false, // Mangle messes up React code snippets
      warnings: false
    }
  });

  config.plugins = [uglifyPlugin];
} else {
  // Enable hot reloading in development
  config.entry = ['webpack-hot-middleware/client'].concat(config.entry);
  config.plugins = [new webpack.HotModuleReplacementPlugin()];
}

module.exports = config;
