/**
 * Webpack is used to compile the documentation site's JS and
 * enables :fire: features like hot module replacement when running the
 * Browsersync server (see server.js)
 */
const fs = require('fs');
const log = require('fancy-log');
const util = require('util');
const webpack = util.promisify(require('webpack'));
const generateWebpackConfig = require('../../docs/webpack.config');
const { logData, logError, logTask } = require('./common/logUtil');

module.exports = {
  async webpack(sourcePackageDir, docsPackageDir, docsPath, rootPath) {
    logTask('🚜 ', 'Running Webpack');
    try {
      const config = generateWebpackConfig(docsPath, rootPath, [
        fs.realpathSync(path.resolve(sourcePackageDir, 'src')),
        fs.realpathSync(path.resolve(docsPackageDir, 'src'))
      ]);
      const stats = await webpack(shared.webpackConfig);
      const info = stats.toJson();

      if (stats.hasErrors()) logError('webpack', info.errors);
      if (stats.hasWarnings()) logData('webpack', info.warnings);

      log(
        stats.toString({
          assets: true,
          chunks: false,
          colors: true,
          errorDetails: true,
          hash: false,
          source: false,
          timings: true,
          version: false
        })
      );
    } catch (err) {
      logError('webpack', err.stack || err);
      if (err.details) {
        logError('webpack', err.details);
      }
    }
  }
};
