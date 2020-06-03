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
const rename = require('gulp-rename');
const streamPromise = require('./common/streamPromise');
const { compileSourceSass } = require('./sass');
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
  const src = path.join(dir, 'src', 'styles');
  return streamPromise(
    gulp.src([`${src}/**/*.{scss,sass}`]).pipe(gulp.dest(path.join(dir, 'dist', 'scss')))
  );
}

async function copyAll(dir) {
  const copyTasks = [
    copyJson(dir),
    copySass(dir),
    copyAssets(path.join(dir, 'src'), path.join(dir, 'dist')),
  ];

  const sources = await getSourceDirs(dir);
  if (sources.length > 1) {
    // If this a child DS we also need to copy assets from the core npm package
    logTask('🖼  ', `Copying fonts and images from ${CORE_SOURCE_PACKAGE} to ${dir}`);
    copyTasks.push(copyAssets(path.join(sources[0], 'dist'), path.join(dir, 'dist')));
  }

  return Promise.all(copyTasks);
}

/**
 * Similar to compileJS but babel is configured for esmodules
 */
async function compileEsmJs(dir) {
  const src = path.join(dir, 'src', 'components');

  return streamPromise(
    gulp
      .src([
        `${src}/**/*.{js,jsx}`,
        `!${src}/**/*.test.{js,jsx}`,
        `!${src}/**/{__mocks__,__tests__,helpers}/**/*.{js,jsx}`,
      ])
      .pipe(
        babel({
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry',
                corejs: '3.0.0',
                modules: false,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-transform-object-assign'],
        })
      )
      .pipe(
        rename((path) => {
          // Updates the object in-place
          if (path.basename === 'index') {
            path.extname = '.es.js';
          }
        })
      )
      .pipe(gulp.dest(path.join(dir, 'dist', 'esnext')))
      .on('finish', function () {
        logTask('📜 ', 'ES module JS files processed');
      })
  );
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
    await compileEsmJs(sourceDir);
    await compileSourceSass(sourceDir);
    logTask('✅ ', 'Build succeeded');
    log('');
  },
  copyAll,
  compileJs,
};
