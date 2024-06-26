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
      // These aliases are necessary because we use React-based libraries in some of the
      // design-system components
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
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
