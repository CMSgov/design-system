/* eslint-disable filenames/match-exported */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const getDocsDistPath = require('../../common/getDocsDistPath');
const { last } = require('lodash');
const { getSourceDirs, getDocsDirs } = require('../../common/getDirsToProcess');

module.exports = async function createWebpackConfig(sourceDir, docsDir, options) {
  const distPath = getDocsDistPath(docsDir, options.rootPath);
  const sources = await getSourceDirs(sourceDir);
  const docs = await getDocsDirs(docsDir);

  const includePaths = [
    fs.realpathSync(path.resolve(last(sources), 'src')),
    fs.realpathSync(path.resolve(last(docs), 'src'))
  ];

  const config = {
    mode: process.env.NODE_ENV || 'production',
    context: __dirname,
    entry: {
      index: [path.resolve(last(docs), 'src/index.jsx')],
      example: [path.resolve(last(docs), 'src/example.js')]
    },
    output: {
      path: distPath,
      publicPath: '/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules(?!\/@cmsgov)/,
          include: includePaths,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          rootPath: JSON.stringify(options.rootPath),
          githubUrl: JSON.stringify(options.githubUrl),
          name: JSON.stringify(options.name),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ['../', 'node_modules']
    },
    performance: {
      hints: false
    }
  };

  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      minimize: true
    };
  } else {
    // Hot reload is enabled for non production envs
    const keys = ['index']; // Object.keys(config.entry);

    keys.forEach(key => {
      config.entry[key] = ['react-hot-loader/patch', 'webpack-hot-middleware/client'].concat(
        config.entry[key]
      );
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
