const webpack = require('webpack');
const path = require('path');
const fs = require('mz/fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { getDocsDirs } = require('../../common/getDirsToProcess');

/**
 * Create an instance of the Webpack compiler to be used for
 * bundling and compiling the Example file.
 * @param {String} entry - Path to entry file
 * @return {*} Webpack compiler instance
 */
module.exports = async function createReactExampleWebpackConfig(
  sourceDir,
  docsDir,
  reactExampleEntry,
  typescript
) {
  const docs = await getDocsDirs(docsDir);
  const exampleEntryFile = path.resolve(docsDir, 'src', 'example.js');
  const additionalEntry = docs.length > 1 && fs.existsSync(exampleEntryFile);

  const entry = [...(additionalEntry ? [exampleEntryFile] : []), path.resolve(reactExampleEntry)];

  console.log(entry);

  const config = {
    mode: process.env.NODE_ENV,
    entry,
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
        '@design-system': path.resolve(sourceDir),
      },
      extensions: ['.js', '.jsx', '.tsx'],
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
