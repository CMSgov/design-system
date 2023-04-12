/**
 * Use Webpack + Babel to bundle and transpile our JSX
 */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/@cmsgov/design-system/dist/fonts', to: '../fonts' },
        { from: 'node_modules/@cmsgov/design-system/dist/images', to: '../images' },
        { from: 'node_modules/@cmsgov/design-system/dist/css', to: '../css' },
      ],
    }),
  ],
};

module.exports = config;
