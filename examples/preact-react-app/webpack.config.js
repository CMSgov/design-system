/**
 * Use Webpack + Babel to bundle and transpile our JSX
 */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const dsDist = path.resolve(
  __dirname,
  '..',
  '..',
  'node_modules',
  '@cmsgov',
  'design-system',
  'dist'
);

const config = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      h: ['preact', 'h'],
      Fragment: ['preact', 'Fragment'],
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(dsDist, 'fonts'), to: '../fonts' },
        { from: path.join(dsDist, 'images'), to: '../images' },
        { from: path.join(dsDist, 'css'), to: '../css' },
      ],
    }),
  ],
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
};

module.exports = config;
