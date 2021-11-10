const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// import statements in JS & SCSS files cannot be in a conditional
// this is a workaround to load the appropriate SCSS entry in storybook based on environment variable
const getStylesPath = () => {
  if (process.env.STORYBOOK_DS == 'mgov') {
    return '../packages/ds-medicare-gov/src/styles/index.scss';
  } else if (process.env.STORYBOOK_DS == 'hcgov') {
    return '../packages/ds-healthcare-gov/src/styles/index.scss';
  } else {
    return '../packages/design-system/src/styles/index.scss';
  }
};

module.exports = async (webpackConfig) => {
  const { config } = webpackConfig;

  config.plugins.push(new MiniCssExtractPlugin());
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
          options: {
            additionalData: `@import '${getStylesPath()}';`,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    }
  );

  return config;
};
