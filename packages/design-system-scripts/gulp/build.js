/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const cleanDist = require('./common/cleanDist');
const copyAssets = require('./common/copyAssets');
const count = require('gulp-count');
const getSources = require('./common/getSources');
const gulp = require('gulp');
const streamPromise = require('./common/streamPromise');
const { buildDocs } = require('./docs');
const { compileSass } = require('./sass');
const { printStats } = require('./stats');
const { log, logTask, logIntroduction } = require('./common/logUtil');
const { CORE_PACKAGE_NAME } = require('./common/constants');

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

async function copyAll(dir) {
  const sources = await getSources(dir);
  const copyTasks = [copyJson(dir), copySass(dir)].concat(sources.map(s => copyAssets(s)));

  if (sources.length > 1) {	
    // If this a child DS we also need to copy assets from the core npm package
    logTask('🖼 ', `Copying fonts and images from ${CORE_PACKAGE_NAME} to ${dir}`);
  }

  return Promise.all(copyTasks);
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
  logTask('🏃 ', 'Starting design system build task');
  await cleanDist(sourcePackageDir);
  await copyAll(sourcePackageDir);
  await compileJs(sourcePackageDir);
  await compileSass(sourcePackageDir);
  logTask('✅ ', 'Build succeeded');
  log('');
}

module.exports = {
  /**
   * Builds just the source package for the purpose of publishing and then
   * collects and prints statistics on the new build
   */
  async build(sourcePackageDir, options) {
    logIntroduction();
    await buildSrc(sourcePackageDir);
    await printStats(sourcePackageDir, options.skipLatest);
  },

  /**
   * Builds the source package and the docs package for the purpose of publishing
   * and then collects and prints statistics on the new build
   */
  async buildDocs(sourcePackageDir, docsPackageDirs, options) {
    logIntroduction();
    await buildSrc(sourcePackageDir);
    await buildDocs(sourcePackageDir, docsPackageDirs, options);
    await printStats(sourcePackageDir, options.skipLatest);
  }
};
