/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';
const argv = require('yargs').argv;
const pkg = require('../../packages/core/package.json');

module.exports = (gulp) => {
  const rootPath = ''; // pkg.version
  const shared = {
    browserSync: require('browser-sync').create(),
    env: argv.env,
    // Design system packages (excluding docs and development packages)
    packages: ['core', 'layout', 'support'],
    // TODO: Replace the line below once we move to publishing the docs on S3
    // rather than GitHub pages.
    rootPath: rootPath,
    version: pkg.version,
    webpackConfig: require('../../packages/docs/webpack.config')(rootPath)
  };

  [
    'build',
    'docs/docs',
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
