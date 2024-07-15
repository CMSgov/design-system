/**
 * Use Webpack + Babel to bundle and transpile our JSX
 */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const dsDist = path.resolve(
  __dirname,
  '..',
  '..',
  'node_modules',
  '@cmsgov',
  'ds-healthcare-gov',
  'dist'
);

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
        { from: path.join(dsDist, 'fonts'), to: '../fonts' },
        { from: path.join(dsDist, 'images'), to: '../images' },
        { from: path.join(dsDist, 'css'), to: '../css' },
      ],
    }),
  ],
};

module.exports = config;
