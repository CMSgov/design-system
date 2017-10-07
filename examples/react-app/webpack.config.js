/* eslint-disable filenames/match-exported */
/**
 * Use Webpack + Babel to bundle and transpile our JSX
 */
const path = require('path');
const config = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
