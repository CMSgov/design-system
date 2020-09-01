const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * Create an instance of the Webpack compiler to be used for
 * bundling and compiling the Example file.
 * @param {String} entry - Path to entry file
 * @return {*} Webpack compiler instance
 */
module.exports = (sourceDir, reactExampleEntry, typescript) => {
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
      ],
    },
    plugins: [new webpack.EnvironmentPlugin(['NODE_ENV'])],
    resolve: {
      modules: ['node_modules'],
      alias: {
        '@src': path.resolve(sourceDir, 'src'),
      },
      extensions: ['.js', '.jsx'],
      plugins: [],
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

  if (typescript) {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            // Disable type checker and use ForkTsCheckerWebpack plugin
            transpileOnly: true,
          },
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.plugins.push(new TsconfigPathsPlugin());
  }

  return config;
};
