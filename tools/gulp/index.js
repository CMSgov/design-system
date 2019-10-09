/**
 * Add any new task groups below to expose them to the runner. If anything
 * needs shared between task groups, add it to the `shared` object, which
 * gets passed to each task group function.
 */
'use strict';
const argv = require('yargs').argv;
const dutil = require('./common/log-util');
const glob = require('glob');
const themePackageDir = argv.theme && findThemePackageDir();

/**
 * Get the directory name of the theme package, relative to ./packages/
 * @returns {String}
 */
function findThemePackageDir() {
  if (typeof argv.theme === 'string') {
    // Manually specified theme package
    return `themes/${argv.theme}`;
  } else {
    const themePackages = glob.sync('packages/themes/*').map(packageName);

    if (themePackages.length) {
      return themePackages[0];
    }
  }
}

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

function themeDirectory() {
  if (argv.theme) {
    if (themePackageDir) {
      dutil.logMessage('🎨 ', `Including theme: ${themePackageDir}`);
      return themePackageDir;
    } else {
      dutil.logMessage('🎨 ', "Couldn't find a theme package, skipping.");
    }
  }
  return null;
}

/**
 * Get the names of the directories containing design system files.
 * These will be used for watching, compiling, and docs generation
 */
function packageDirectories() {
  const directories = glob
    .sync('packages/*', {
      ignore: ['packages/{docs,eslint*,generator*,stylelint*,themes}']
    })
    .map(packageName);
  return directories;
}

module.exports = gulp => {
  // compile docs to the themes directory if it's being applied
  const docsPath = themePackageDir
    ? `packages/${themePackageDir}/docs`
    : 'docs';
  // support placing docs in a subdirectory (ie. design.cms.gov/v1/index.html)
  const rootPath = argv.root || '';
  const theme = themeDirectory();
  // Include theme directory in packages to watch, compile, and generate theme docs
  const packages = packageDirectories().concat(theme);

  // These properties are shared with every Gulp task
  const shared = {
    browserSync: require('browser-sync').create(),
    env: argv.env,
    theme: theme,
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
