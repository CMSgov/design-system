const path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // aliasing @styles a shortcut to core styles directory
      // aliasing fonts & images to catch relative paths defined in core styles
      alias: {
        '@styles': path.resolve(__dirname, '../design-system/src/styles'),
        '../fonts': path.resolve(__dirname, '../design-system/src/fonts'),
        '../images': path.resolve(__dirname, '../design-system/src/images'),
      },
    },
  });
};
