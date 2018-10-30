const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
            options: {
              includePaths: [
                path.resolve(__dirname, './src/scss'),
                path.resolve(__dirname, './node_modules')
                // console.log(__dirname + '/node_modules')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './src/img'),
                path.resolve(__dirname, './node_modules')
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './src/fonts'),
                path.resolve(__dirname, './node_modules')
              ]
            }
          }
        ]
      }
    ]
  }
};
