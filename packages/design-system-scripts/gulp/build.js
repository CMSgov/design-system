/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const cleanDist = require('./common/cleanDist');
const copyAssets = require('./common/copyAssets');
const count = require('gulp-count');
const gulp = require('gulp');
const path = require('path');
const streamPromise = require('./common/streamPromise');
const { compileSass } = require('./sass');
const { getSourceDirs } = require('./common/getDirsToProcess');
const { log, logTask } = require('./common/logUtil');
const { CORE_SOURCE_PACKAGE } = require('./common/constants');

/**
 * Copy any JSON files that our components might depend on
 */
function copyJson(dir) {
  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([`${src}/**/*.json`, `!${src}/**/{__mocks__,__tests__}/*.json`])
      .pipe(gulp.dest(path.join(dir, 'dist')))
  );
}

/**
 * Copy Sass files from src to dist because we don't distribute the src folder
 */
function copySass(dir) {
  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([`${src}/**/*.{scss,sass}`, `!${src}/**/*.docs.{scss,sass}`])
      .pipe(gulp.dest(path.join(dir, 'dist')))
  );
}

async function copyAll(dir) {
  const copyTasks = [copyJson(dir), copySass(dir), copyAssets(dir)];

  const sources = await getSourceDirs(dir);
  if (sources.length > 1) {
    // If this a child DS we also need to copy assets from the core npm package
    logTask('🖼  ', `Copying fonts and images from ${CORE_SOURCE_PACKAGE} to ${dir}`);
    copyTasks.push(copyAssets(sources[0], dir));
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
  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([
        `${src}/**/*.{js,jsx}`,
        `!${src}/**/*.test.{js,jsx}`,
        `!${src}/**/{__mocks__,__tests__,helpers}/**/*.{js,jsx}`,
      ])
      .pipe(babel())
      .pipe(
        count({
          message: `## JS files processed in ${dir}`,
          logger: (message) => logTask('📜 ', message),
        })
      )
      .pipe(gulp.dest(path.join(dir, 'dist')))
  );
}

module.exports = {
  /**
   * Builds just the source package for the purpose of publishing
   */
  async buildSrc(sourceDir) {
    logTask('🏃 ', 'Starting design system build task');
    await cleanDist(sourceDir);
    await copyAll(sourceDir);
    await compileJs(sourceDir);
    await compileSass(sourceDir);
    logTask('✅ ', 'Build succeeded');
    log('');
  },
  copyAll,
  compileJs,
};
