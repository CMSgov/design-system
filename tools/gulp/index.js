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
    // If the published site is in a subdirectory, set its name as the rootPath
    rootPath: argv.env === 'production' ? pkg.version : '',
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
