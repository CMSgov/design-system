/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';
const argv = require('yargs').argv;

module.exports = gulp => {
  // Include theme directory in packages to watch, compile, and generate theme docs
  const packages = theme ? ['core', theme] : ['core'];

  // These properties are shared with every Gulp task
  const shared = {
    browserSync: require('browser-sync').create(),
    env: argv.env,
    packages: packages,
    docsPath: argv.docsPath || 'docs',
    srcPath: argv.srcPath || 'src',
    // The path of the docs site relative to the domain root (ie. design.cms.gov/v1/index.html)
    rootPath: argv.root || '',
    webpackConfig: require('../../packages/docs/webpack.config')(docsPath, rootPath, packages)
  };

  ['build', 'docs', 'lint', 'sass', 'server', 'stats/stats', 'watch', 'webpack'].forEach(
    taskGroup => {
      require(`./${taskGroup}`)(gulp, shared);
    }
  );
};
