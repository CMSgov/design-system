/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';

module.exports = (gulp) => {
  const shared = {
    browserSync: require('browser-sync').create(),
    webpackConfig: require('../../docs/webpack.config')
  };

  [
    'build',
    'docs',
    'fonts',
    'javascript',
    'sass',
    'server',
    'watch',
    'webpack',
  ].forEach(taskGroup => {
    require(`./${taskGroup}.js`)(gulp, shared);
  });
};
