/**
 * Webpack is used to compile the documentation site's JS and
 * enables :fire: features like hot module replacement when running the
 * Browsersync server (see server.js)
 */
const log = require('fancy-log');
const webpack = require('webpack');
const webpackStatsConfig = require('../webpack-stats');
const { logData, logError, logTask } = require('./common/logUtil');

module.exports = (gulp, shared) => {
  function handleWebpackResults(err, stats) {
    if (err) {
      logError('webpack', err.stack || err);
      if (err.details) logError('webpack', err.details);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) logError('webpack', info.errors);
    if (stats.hasWarnings()) logData('webpack', info.warnings);

    log(stats.toString(webpackStatsConfig));
  }

  gulp.task('webpack', done => {
    logTask('🚜 ', 'Running Webpack');

    webpack(shared.webpackConfig, (err, stats) => {
      handleWebpackResults(err, stats);
      done();
    });
  });
};
