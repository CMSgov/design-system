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
const { printStats } = require('./stats');
const { getSourceDirs } = require('./common/getDirsToProcess');
const { log, logTask, logError } = require('./common/logUtil');
const { CORE_SOURCE_PACKAGE } = require('./common/constants');

const getSrcGlob = (src, changedPath) =>
  changedPath
    ? [changedPath]
    : [
        `${src}/**/*.{js,jsx,ts,tsx}`,
        `!${src}/setupTests.{js,jsx,ts,tsx}`,
        `!${src}/**/*{.test,.spec}.{js,jsx,ts,tsx}`,
        `!${src}/**/{__mocks__,__tests__,helpers}/**/*`,
      ];

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
 * Similar to compileJS but babel is configured for esmodules, only used in the core DS
 */
async function compileEsmJs(dir) {
  const src = path.join(dir, 'src', 'components');
  const srcGlob = getSrcGlob(src);

  return streamPromise(
    gulp
      .src(srcGlob, { base: src })
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
        })
      )
      .on('error', (error) => {
        logError('compileEsmJs', error);
      })
      .pipe(
        rename((path) => {
          if (path.dirname === '.' && path.basename === 'index') {
            // Renames `component/index.js` to `esnext/index.esm.js`
            path.extname = '.mjs';
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
function compileJs(dir, options, changedPath) {
  const src = path.join(dir, 'src');
  const srcGlob = getSrcGlob(src, changedPath);

  return streamPromise(
    gulp
      .src(srcGlob, { base: src })
      .pipe(babel())
      .on('error', (error) => {
        logError('compileJs', error);
      })
      .pipe(
        count({
          message: `## JS files processed in ${dir}`,
          logger: (message) => logTask('📜 ', message),
        })
      )
      .pipe(gulp.dest(path.join(dir, 'dist')))
  ).then(() => {
    if (options.core) {
      return compileEsmJs(dir, changedPath);
    }
  });
}

module.exports = {
  /**
   * Builds just the source package for the purpose of publishing
   */
  async buildSrc(sourceDir, options) {
    logTask('🏃 ', 'Starting design system build task');
    await cleanDist(sourceDir);
    await copyAll(sourceDir);
    await compileSourceSass(sourceDir);
    await compileJs(sourceDir, options);
    if (process.env.NODE_ENV === 'production') {
      await printStats(sourceDir, options);
    }
    logTask('✅ ', 'Build succeeded');
    log('');
  },
  copyAll,
  compileJs,
};
