const webpack = require('webpack');
let plugins;

if (process.env.NODE_ENV === 'production') {
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  });

  plugins = [uglifyPlugin];
} else {
  plugins = [new webpack.HotModuleReplacementPlugin()];
}

let config = {
  context: __dirname,

  entry: [
    'webpack-hot-middleware/client',
    './src/scripts/index.jsx'
  ],

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

  plugins: plugins,

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};

module.exports = config;
