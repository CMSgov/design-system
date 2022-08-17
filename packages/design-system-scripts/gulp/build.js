/**
 * @file These build tasks handle compiling and bundling CMSDS assets.
 */
const babel = require('gulp-babel');
const cleanDist = require('./common/cleanDist');
const createCdnWebpackConfig = require('./createCdnWebpackConfig');
const copyFontsImages = require('./common/copyFontsImages');
const gulp = require('gulp');
const count = require('gulp-count');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const path = require('path');
const streamPromise = require('./common/streamPromise');
const util = require('util');
const webpack = require('webpack');
const { compileSourceSass } = require('./sass');
const { printStats } = require('./stats');
const { getSourceDirs } = require('./common/getDirsToProcess');
const { log, logTask, logError } = require('./common/logUtil');

const getSrcGlob = (src, changedPath) =>
  changedPath
    ? [changedPath]
    : [
        `${src}/**/*.{js,jsx,ts,tsx}`,
        `!${src}/setupTests.{js,jsx,ts,tsx}`,
        `!${src}/**/*{.test,.spec,.d}.{js,jsx,ts,tsx}`,
        `!${src}/**/{__mocks__,__tests__}/**/*`,
      ];

/**
 * Copy Sass files from src to dist, rename folder to 'scss'
 */
function copySass(dir) {
  const src = path.join(dir, 'src', 'styles');
  return streamPromise(
    gulp.src([`${src}/**/*.{scss,sass}`]).pipe(gulp.dest(path.join(dir, 'dist', 'scss')))
  );
}

/**
 * Copy and process font and image files from src to dist
 */
async function copyAssets(dir, options) {
  const sources = await getSourceDirs(dir);
  const isChildDS = sources.length > 1;

  return [
    // Process SVG with `svgo` if the `minifySvg` flag is enabled
    copyFontsImages(path.join(dir, 'src'), path.join(dir, 'dist'), options.minifySvg),
    // If this a child DS we also need to copy assets from the core npm package
    isChildDS && copyFontsImages(path.join(sources[0], 'dist'), path.join(dir, 'dist')),
  ];
}

/**
 * Generically copy any non test files that arent already processed by the build scripts
 * including type definition files located in `src/types`
 */
function copyMisc(dir) {
  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([
        `${src}/**/*`,
        `!${src}/components/**`,
        `!${src}/fonts/**`,
        `!${src}/images/**`,
        `!${src}/styles/**`,
        `!${src}/setupTests.{js,jsx,ts,tsx}`,
        `!${src}/**/*{.test,.spec}.{js,jsx,ts,tsx}`,
        `!${src}/**/{__mocks__,__tests__,helpers}/**/*`,
      ])
      .pipe(gulp.dest(path.join(dir, 'dist')))
  );
}

function copyComponentJson(dir) {
  const src = path.join(dir, 'src');
  return streamPromise(
    gulp
      .src([`${src}/components/**/*.json`])
      .pipe(gulp.dest(path.join(dir, 'dist', 'components')))
      .pipe(gulp.dest(path.join(dir, 'dist', 'esnext')))
      .pipe(gulp.dest(path.join(dir, 'dist', 'types')))
  );
}

async function copyAll(dir, options) {
  const copyTasks = [
    copySass(dir),
    copyAssets(dir, options),
    copyMisc(dir),
    copyComponentJson(dir),
  ];

  return Promise.all(copyTasks);
}

/**
 * Because we use babel to compile ts files, we have to compile twice to get definition files.
 * This is necessary because the core CMSDS uses babel, but also needs definition files.
 * TODO: Figure out how to use gulp-typescript for ts compilation as well
 */
async function generateTypeDefinitions(dir, changedPath) {
  const src = path.join(dir, 'src', 'components');
  const srcGlob = changedPath
    ? [changedPath]
    : [
        `${src}/**/*.{ts,tsx}`,
        `!${src}/**/*.{js,jsx}`,
        `!${src}/setupTests.{js,jsx,ts,tsx}`,
        `!${src}/**/*{.test,.spec,.d}.{js,jsx,ts,tsx}`,
        `!${src}/**/{__mocks__,__tests__,helpers}/**/*`,
      ];

  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    allowJs: true,
  });

  const tsResult = gulp.src(srcGlob, { base: src }).pipe(tsProject());

  return streamPromise(
    tsResult.dts.pipe(gulp.dest(path.join(dir, 'dist', 'types'))).on('finish', function () {
      logTask('📜 ', 'Typescript definition files generated');
    })
  );
}

/**
 * Similar to compileJS but babel is configured for esmodules, only used in the core DS
 */
async function compileEsmJs(dir, changedPath) {
  const src = path.join(dir, 'src', 'components');
  const srcGlob = getSrcGlob(src, changedPath);

  return streamPromise(
    gulp
      .src(srcGlob, { base: src })
      .pipe(
        babel({
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
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
            path.extname = '.esm.js';
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
 *  Transpile design system React components.
 */

function compileJs(dir, options, changedPath) {
  const src = path.join(dir, 'src', 'components');
  const srcGlob = getSrcGlob(src, changedPath);
  return streamPromise(
    gulp
      .src(srcGlob, { base: path.join(dir, 'src') })
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
  )
    .then(() => {
      // Compile ESM version of code
      return compileEsmJs(dir, changedPath);
    })
    .then(() => {
      // If design system is using typescript, use tsc to generate definition files for tsx files
      const unknownOrTypescriptPath = !changedPath || changedPath.match(/\.(ts|tsx)$/);
      if (options.typescript && unknownOrTypescriptPath) {
        return generateTypeDefinitions(dir, changedPath);
      }
    });
}

async function bundleJs(dir) {
  logTask('🚜 ', 'Running Webpack statically');
  try {
    const config = createCdnWebpackConfig(dir);
    const stats = await util.promisify(webpack)(config); // Promisify webpack so the task will wait on the compilation to finish

    // Log out any errors or warnings
    log(stats.toString());
  } catch (err) {
    logError('webpack static', err.stack || err);
    if (err.details) {
      logError('webpack static', err.details);
    }
  }
}

module.exports = {
  /**
   * Builds just the source package for the purpose of publishing
   */
  async buildSrc(sourceDir, options) {
    logTask('🏃 ', 'Starting design system build task');
    await cleanDist(sourceDir);
    await copyAll(sourceDir, options);
    await compileSourceSass(sourceDir, options);
    await compileJs(sourceDir, options);
    await bundleJs(sourceDir);
    if (process.env.NODE_ENV === 'production') {
      await printStats(sourceDir, options);
    }
    logTask('✅ ', 'Build succeeded', true);
    log('');
  },
  copyAssets,
  copySass,
  compileJs,
};
