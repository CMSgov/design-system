const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const usePreact = Boolean(JSON.parse(process.env.PREACT ?? 'true'));
const preactAliases = usePreact
  ? {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // Must be below test-utils
      'react/jsx-runtime': 'preact/jsx-runtime',
    }
  : {};

module.exports = async ({ config }) => {
  config.plugins.push(
    new MiniCssExtractPlugin(),
    // copies current set of static assets to dist folder when building
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../packages/design-system/src', 'images'),
          to: './images',
        },
        {
          from: path.resolve(__dirname, '../packages/design-system/src', 'fonts'),
          to: './fonts',
        },
        {
          from: path.resolve(__dirname, '../packages/ds-healthcare-gov/src', 'images'),
          to: './images',
        },
        {
          from: path.resolve(__dirname, '../packages/ds-medicare-gov/src', 'images'),
          to: './images',
        },
        {
          from: path.resolve(__dirname, '../packages/ds-medicare-gov/src', 'fonts'),
          to: './fonts',
        },
      ],
    })
  );

  // add SCSS support for CSS Modules
  config.module.rules.push(
    {
      test: /\.svg$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/',
          },
        },
        'url-loader',
      ],
    },
    {
      test: /\.(woff|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts/',
          },
        },
        'url-loader?limit=100000',
      ],
      include: path.resolve(__dirname, '../'),
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?url=false',
        {
          loader: 'sass-loader',
        },
      ],
      include: path.resolve(__dirname, '../'),
    }
  );

  config.resolve.alias = {
    '@cmsgov/design-system/dist/scss': path.resolve(
      __dirname,
      '../packages/design-system/src/styles/'
    ),
    ...preactAliases,
  };

  return config;
};
