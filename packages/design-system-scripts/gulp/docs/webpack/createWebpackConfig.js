/* eslint-disable filenames/match-exported */
const path = require('path');
const webpack = require('webpack');
const { getDocsDirs } = require('../../common/getDirsToProcess');

module.exports = async function createWebpackConfig(sourceDir, docsDir, options) {
  const distPath = path.resolve(docsDir, 'dist');
  const docs = await getDocsDirs(docsDir);

  // Entry and include paths are set to `design-system` and `design-system-docs`
  // packages in `node_modules` for child design systems
  // This is the first element in the dirs array from `getDirsToProcess`
  const entry = {
    index: [path.resolve(docs[0], 'src/index.jsx')],
    example: [path.resolve(docs[0], 'src/example.js')],
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
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json'],
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
