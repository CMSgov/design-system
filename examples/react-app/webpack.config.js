/**
 * Use Webpack + Babel to bundle and transpile our JSX
 */
var path = require('path');
var webpack = require('webpack');

var config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }]
      }
    ]
  }
};

module.exports = config;
