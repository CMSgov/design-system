const webpack = require('webpack');

let config = {
  context: __dirname,
  entry: ['./src/scripts/index.jsx'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'dist/scripts/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: /(node_modules)/
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
      warnings: false,
      drop_console: true
    }
  });

  config.plugins = [uglifyPlugin];
} else {
  // Enable hot reloading in development
  config.entry = ['webpack-hot-middleware/client'].concat(config.entry);
  config.plugins = [new webpack.HotModuleReplacementPlugin()];
}

module.exports = config;
