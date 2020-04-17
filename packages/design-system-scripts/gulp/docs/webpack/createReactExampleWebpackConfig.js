const webpack = require('webpack');

/**
 * Create an instance of the Webpack compiler to be used for
 * bundling and compiling the Example file.
 * @param {String} examplePath - Path to entry file
 * @return {*} Webpack compiler instance
 */
module.exports = examplePath => {
  // TODO: Add include paths
  const config = {
    mode: process.env.NODE_ENV,
    entry: examplePath,
    output: { filename: 'bundle.js', path: '/build' },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules(?!\/@cmsgov)/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },
    plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
    resolve: { extensions: ['.js', '.jsx'] },
    performance: {
      hints: false
    }
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      minimize: true
    };
  }

  return config;
};
