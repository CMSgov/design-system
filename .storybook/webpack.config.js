const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

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

  // TODO: if mgov & in production mode...
  if (process.env.STORYBOOK_DS == 'mgov') {
    config.plugins.push(
      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [
              {
                source: 'storybook-static/medicare/core/fonts/**',
                destination: 'storybook-static/medicare/fonts/',
                options: { overwrite: false },
              },
              {
                source: 'storybook-static/medicare/core/images/**',
                destination: 'storybook-static/medicare/images/',
                options: { overwrite: false },
              },
              {
                source: 'storybook-static/medicare/mgov/fonts/montserrat/',
                destination: 'storybook-static/medicare/fonts/montserrat',
                options: { overwrite: false },
              },
              {
                source: 'storybook-static/medicare/mgov/fonts/rubik/',
                destination: 'storybook-static/medicare/fonts/rubik',
                options: { overwrite: false },
              },
              {
                source: 'storybook-static/medicare/mgov/images/**',
                destination: 'storybook-static/medicare/images/',
                options: { overwrite: false },
              },
            ],
            delete: ['storybook-static/medicare/core', 'storybook-static/medicare/mgov'],
          },
        },
      })
    );
  }
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

  config.resolve.alias = {
    '@cmsgov/design-system/dist/scss': path.resolve(
      __dirname,
      '../packages/design-system/src/styles/'
    ),
  };

  return config;
};
