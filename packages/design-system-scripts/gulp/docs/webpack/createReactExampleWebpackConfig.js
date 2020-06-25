const webpack = require('webpack');
const path = require('path');

/**
 * Create an instance of the Webpack compiler to be used for
 * bundling and compiling the Example file.
 * @param {String} entry - Path to entry file
 * @return {*} Webpack compiler instance
 */
module.exports = (reactExampleEntry, sourceDir) => {
  const config = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(reactExampleEntry),
    output: { filename: 'bundle.js', path: '/build' },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
          exclude: /node_modules(?!\/@cmsgov)/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
    resolve: {
      modules: ['node_modules', path.resolve(sourceDir)],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    performance: {
      hints: false,
    },
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      minimize: true,
    };
  }

  return config;
};
