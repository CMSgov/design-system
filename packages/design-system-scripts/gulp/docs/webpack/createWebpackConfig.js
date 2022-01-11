/* eslint-disable filenames/match-exported */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { getDocsDirs } = require('../../common/getDirsToProcess');

module.exports = async function createWebpackConfig(sourceDir, docsDir, options) {
  const distPath = path.resolve(docsDir, 'dist');
  const docs = await getDocsDirs(docsDir);

  // TODO: Right now we have dependencies duplicated across all three of these
  // entry files. We should split the vendor chunk out into a separate file.
  // This example shows splitting `react` and `react-dom` into a separate file,
  // which is pretty much what we're looking for:
  // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-3
  const entry = {
    // Default doc site JS located in @cmsgov/design-system-docs/src/index.jsx
    index: [path.resolve(docs[0], 'src/index.jsx')],
    // Doc site example page JS located in @cmsgov/design-system-docs/src/example.js
    example: [path.resolve(docs[0], 'src/example.js')],
    // Doc site admin
    'admin/index': [path.resolve(docs[0], 'src/admin/index.ts')],
  };

  const config = {
    mode: process.env.NODE_ENV || 'production',
    context: __dirname,
    entry,
    output: {
      path: distPath,
      publicPath: '/',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // Copy over config options
          core: JSON.stringify(options.core),
          rootPath: JSON.stringify(options.rootPath),
          name: JSON.stringify(options.name),
          githubUrl: JSON.stringify(options.githubUrl),
          npmPackage: JSON.stringify(options.npmPackage),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(docs[0], 'src', 'admin', 'index.html'),
        filename: path.join('admin', 'index.html'),
        excludeChunks: ['index', 'example'],
        minify: false,
      }),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    performance: {
      hints: false,
    },
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      minimize: true,
    };
  } else {
    // Hot reload is enabled for non production envs
    const keys = ['index']; // Object.keys(config.entry);

    keys.forEach((key) => {
      config.entry[key] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(
        config.entry[key]
      );
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
