const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.plugins.push(new MiniCssExtractPlugin()),
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
          use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader'],
          include: path.resolve(__dirname, '../'),
        }
      );

    return config;
  },
};
