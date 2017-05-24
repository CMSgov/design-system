/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';
const argv = require('yargs').argv;
const pkg = require('../../packages/core/package.json');

module.exports = (gulp) => {
  const shared = {
    browserSync: require('browser-sync').create(),
    env: argv.env,
    // Since we're publishing to GitHub Pages until we get approval to use S3, then
    // we always build the documentation into the root of the docs directory, rather
    // than nesting it in a subdirectory named after the package version.
    // TODO: Replace the line below once we move to publishing the docs on S3.
    rootPath: '', // pkg.version,
    version: pkg.version,
    webpackConfig: require('../../packages/docs/webpack.config')
  };

  [
    'build',
    'bumpVersion',
    'docs/docs',
    'fonts',
    'lint',
    'sass',
    'server',
    'stats/stats',
    'watch',
    'webpack'
  ].forEach(taskGroup => {
    require(`./${taskGroup}.js`)(gulp, shared);
  });
};
