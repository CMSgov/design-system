const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// because of the way font & image files are organized in dev vs prod, need to have a different font path
// need to set this before styles are imported
const getFontAndImagePaths = () => {
  // for prod builds
  if (process.env.STORYBOOK_ENV !== 'dev') {
    return `$font-path: './fonts'; $image-path: './images';`;
  }
  // for dev, use default which is '../fonts'
  return '';
};

module.exports = async ({ config }) => {
  config.plugins.push(
    new MiniCssExtractPlugin(),
    // copies current set of static assets to dist folder when building
    new CopyPlugin({
      patterns: [
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
          options: {
            additionalData: `${getFontAndImagePaths()}`,
          },
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
  };

  return config;
};
