const dutil = require('./doc-util');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../../docs/webpack.config');

module.exports = (gulp) => {
  function handleWebpackResults(err, stats) {
    if (err) {
      dutil.logError('webpack', err.stack || err);
      if (err.details) dutil.logError('webpack', err.details);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors())   dutil.logError('webpack', info.errors);
    if (stats.hasWarnings()) dutil.logData('webpack', info.warnings);

    gutil.log(stats.toString({
      assets: true,
      chunks: false,
      colors: true,
      errorDetails: true,
      hash: false,
      source: false,
      timings: true,
      version: false,
    }));
  }

  gulp.task('webpack:watch', done => {
    webpack(webpackConfig).watch({}, handleWebpackResults);
  });

  gulp.task('webpack', done => {
    webpack(webpackConfig, (err, stats) => {
      handleWebpackResults(err, stats);
      done();
    });
  });
};
