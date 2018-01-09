/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';
const argv = require('yargs').argv;
const dutil = require('./common/log-util');
const glob = require('glob');

/**
 * Get the name of a package, relative to packages/
 * @example
 * packageName('packages/foo') // returns 'foo'
 * @param {String} packagePath
 * @return {String}
 */
function packageName(packagePath) {
  return packagePath.match(/packages\/([a-z-_/]+)/)[1];
}

/**
 * Get the names of the directories containing design system (or theme)
 * files. These will be used for watching, compiling, and docs generation
 */
function packageDirectories() {
  let directories = glob
    .sync('packages/*', {
      ignore: ['packages/{docs,eslint*,generator*,stylelint*,themes}']
    })
    .map(packageName);

  if (argv.theme) {
    if (typeof argv.theme === 'string') {
      // Manually specified theme package
      directories.push(`themes/${argv.theme}`);
    } else {
      directories = directories.concat(
        glob.sync('packages/themes/*').map(packageName)
      );
    }

    dutil.logMessage('🎨 ', 'Including theme package');
  }

  return directories;
}

module.exports = gulp => {
  // where docs files are compiled to (useful for themes. ie. packages/themes/foo/docs)
  const docsPath = argv.docs || 'docs';
  // support placing docs in a subdirectory (ie. design.cms.gov/v1/index.html)
  const rootPath = argv.root || '';
  const packages = packageDirectories();

  // These properties are shared with every Gulp task
  const shared = {
    browserSync: require('browser-sync').create(),
    env: argv.env,
    packages: packages,
    docsPath: docsPath,
    rootPath: rootPath,
    webpackConfig: require('../../packages/docs/webpack.config')(
      docsPath,
      rootPath,
      packages
    )
  };

  [
    'build',
    'docs',
    'lint',
    'sass',
    'server',
    'stats/stats',
    'watch',
    'webpack'
  ].forEach(taskGroup => {
    require(`./${taskGroup}`)(gulp, shared);
  });
};
