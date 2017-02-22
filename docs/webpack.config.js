const webpack = require('webpack');
// Since Webpack is ran from the root project's build system, file paths
// are relative to the root, rather than where this webpack file is located
const cwd = './docs';

let config = {
  entry: {
    'index': `${cwd}/src/scripts/index.jsx`,
  },
  output: {
    path: `${cwd}/dist/scripts`,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  })];
}

module.exports = config;