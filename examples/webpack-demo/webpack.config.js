// webpack v4
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // to move static assets from src to dist

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss|.css$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, './src/scss'),
                  path.resolve(__dirname, './node_modules'),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './src/img'),
                path.resolve(__dirname, './node_modules'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, './node_modules')],
            },
          },
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/img', to: 'img' },
      { from: './src/fonts', to: 'fonts' },
      { from: './src/pages', to: '' },
    ]),
  ],
};
