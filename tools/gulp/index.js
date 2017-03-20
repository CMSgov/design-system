/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';

module.exports = (gulp) => {
  const shared = {
    browserSync: require('browser-sync').create(),
    webpackConfig: require('../../packages/docs/webpack.config')
  };

  [
    'build',
    'bumpVersion',
    'docs/index',
    'fonts',
    'lint',
    'sass',
    'server',
    'watch',
    'webpack'
  ].forEach(taskGroup => {
    require(`./${taskGroup}.js`)(gulp, shared);
  });
};
