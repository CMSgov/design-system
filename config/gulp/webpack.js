/**
 * Webpack is used to compile the documentation site's JS and
 * enables :fire: features like hot module replacement when running the
 * Browsersync server (see server.js)
 */
const dutil = require('./doc-util');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackStatsConfig = require('../webpack-stats');

module.exports = (gulp, shared) => {
  function handleWebpackResults(err, stats) {
    if (err) {
      dutil.logError('webpack', err.stack || err);
      if (err.details) dutil.logError('webpack', err.details);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors())   dutil.logError('webpack', info.errors);
    if (stats.hasWarnings()) dutil.logData('webpack', info.warnings);

    gutil.log(stats.toString(webpackStatsConfig));
  }

  gulp.task('webpack', done => {
    webpack(shared.webpackConfig, (err, stats) => {
      handleWebpackResults(err, stats);
      done();
    });
  });
};
