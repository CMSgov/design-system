/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const count = require('gulp-count');
const del = require('del');
const gulp = require('gulp');
const getPackageName = require('./common/getPackageName');
const streamPromise = require('./common/streamPromise');
const { compileSass } = require('./sass');
const { printStats } = require('./stats');
const { log, logTask, logIntroduction } = require('./common/logUtil');

const CORE_PACKAGE_NAME = '@cmsgov/design-system';

/**
 * Empty the dist/ directory so any stale files are removed
 */
function cleanDist(dir) {
  logTask('🚮 ', `Resetting "dist" directory: ${dir}`);
  return del([`${dir}/dist`]);
}

/**
 * Copy any JSON files that our components might depend on
 */
function copyJson(dir) {
  return streamPromise(
    gulp
      .src([`${dir}/src/**/*.json`, `!${dir}/src/**/{__mocks__,__tests__}/*.json`])
      .pipe(gulp.dest(`${dir}/dist`))
  );
}

function copyDir(srcDir, destDir) {
  return streamPromise(gulp.src(`${srcDir}/**/*`).pipe(gulp.dest(destDir)));
}

/**
 * Copy all assets stored in a certain folder
 */
async function copyAssets(dir) {
  // Check to see if this is the core package. If it's not, copy assets from core
  const packageName = await getPackageName(dir);
  if (packageName !== CORE_PACKAGE_NAME) {
    logTask('🖼 ', `Copying fonts and images from ${CORE_PACKAGE_NAME}`);
    const pkgDist = `node_modules/${CORE_PACKAGE_NAME}/dist`;
    await Promise.all([
      copyDir(`${pkgDist}/fonts`, `${dir}/dist/fonts`),
      copyDir(`${pkgDist}/images`, `${dir}/dist/images`)
    ]);
  }

  await Promise.all([
    copyDir(`${dir}/src/fonts`, `${dir}/dist/fonts`),
    copyDir(`${dir}/src/images`, `${dir}/dist/images`)
  ]);
}

/**
 * Copy Sass files from src to dist because we don't distribute the src folder
 */
function copySass(dir) {
  return streamPromise(
    gulp
      .src([`${dir}/src/**/*.{scss,sass}`, `!${dir}/src/**/*.docs.{scss,sass}`])
      .pipe(gulp.dest(`${dir}/dist`))
  );
}

function copyAll(dir) {
  return Promise.all([copyAssets(dir), copyJson(dir), copySass(dir)]);
}

/**
 * Transpile design system React components.
 *  Note: If you're running a dev server and try to use a newly
 *  babelfied React component in the docs site, you need to run
 *  this task first, otherwise the component won't be found.
 */
function compileJs(dir) {
  return streamPromise(
    gulp
      .src([
        `${dir}/src/**/*.{js,jsx}`,
        `!${dir}/src/**/{__mocks__,__tests__}/*.{js,jsx}`,
        `!${dir}/src/**/*.example.{js,jsx}`,
        `!${dir}/src/**/*.test.{js,jsx}`,
        `!${dir}/src/helpers/e2e/*.{js,jsx}`
      ])
      .pipe(babel())
      .pipe(
        count({
          message: `## JS files processed in ${dir}`,
          logger: message => logTask('📜 ', message)
        })
      )
      .pipe(gulp.dest(`${dir}/dist`))
  );
}

/**
 * Builds the source package
 */
async function buildSrc(sourcePackageDir) {
  await cleanDist(sourcePackageDir);
  await copyAll(sourcePackageDir);
  await compileJs(sourcePackageDir);
  await compileSass(sourcePackageDir);
  logTask('✅ ', 'Build succeeded');
  log('');
}

/**
 * Builds the docs site
 *
 * Note that build:src must run before this in order to ensure that the
 * documentation reflects the most recent version of the source.
 */
// async function buildDocs(sourcePackageDir) {
//   logIntroduction();
//   runSequence('docs:build', 'webpack', 'sass:docs', done);
// }

module.exports = {
  /**
   * Builds just the source package for the purpose of publishing and then
   * collects and prints statistics on the new build
   */
  async build(sourcePackageDir, skipLatest = false) {
    logIntroduction();
    await buildSrc(sourcePackageDir);
    await printStats(sourcePackageDir, skipLatest);
  }
};
