/**
 * Webpack is used to compile the documentation site's JS and
 * enables :fire: features like hot module replacement when running the
 * Browsersync server (see server.js)
 */
const fs = require('fs');
const log = require('fancy-log');
const path = require('path');
const util = require('util');
const webpack = util.promisify(require('webpack'));
const createWebpackConfig = require('./webpack.config');
const webpackStatsConfig = require('./webpackStats.config');
const { logData, logError, logTask } = require('../common/logUtil');

module.exports = {
  async runWebpackStatically(sourcePackageDir, docsPackageDir, rootPath) {
    logTask('🚜 ', 'Running Webpack');
    try {
      const config = createWebpackConfig(docsPackageDir, [
        fs.realpathSync(path.resolve(sourcePackageDir, 'src')),
        fs.realpathSync(path.resolve(docsPackageDir, 'src'))
      ], rootPath, '');

      const stats = await webpack(config);
      const info = stats.toJson();

      if (stats.hasErrors()) logError('webpack', info.errors);
      if (stats.hasWarnings()) logData('webpack', info.warnings);

      log(stats.toString(webpackStatsConfig));
    } catch (err) {
      logError('webpack', err.stack || err);
      if (err.details) {
        logError('webpack', err.details);
      }
    }
  }
};
