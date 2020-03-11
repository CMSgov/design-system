/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const count = require('gulp-count');
const del = require('del');
const getPackageName = require('./common/getPackageName');
const runSequence = require('gulp4-run-sequence');
const { log, logTask, logIntroduction } = require('./common/logUtil');
const { promisify } = require('util');
const finished = promisify(require('stream').finished);

const CORE_PACKAGE_NAME = '@cmsgov/design-system-core';

/**
 * Empty the dist/ directory so any stale files are removed
 */
function cleanDist(gulp, dir) {
  logTask('🚮 ', `Resetting "dist" directory: ${dir}`);
  return del([`${dir}/dist`]);
}

/**
 * Copy any JSON files that our components might depend on
 */
function copyJson(gulp, dir) {
  return gulp
    .src([`${dir}/src/**/*.json`, `!${dir}/src/**/{__mocks__,__tests__}/*.json`])
    .pipe(gulp.dest(`${dir}/dist`));
}

function copyDir(gulp, srcDir, destDir) {
  return gulp.src(`${srcDir}/**/*`).pipe(gulp.dest(destDir));
}

/**
 * Copy all assets stored in a certain folder
 */
async function copyAssets(gulp, dir) {
  // Check to see if this is the core package. If it's not, copy assets from core
  const packageName = await getPackageName(dir);
  if (packageName !== CORE_PACKAGE_NAME) {
    logTask('🖼 ', `Copying fonts and images from ${CORE_PACKAGE_NAME}`);
    const pkgDist = `node_modules/${CORE_PACKAGE_NAME}/dist`;
    await Promise.all([
      finished(copyDir(gulp, `${pkgDist}/fonts`, `${dir}/dist/fonts`)),
      finished(copyDir(gulp, `${pkgDist}/images`, `${dir}/dist/images`))
    ]);
  }

  await Promise.all([
    finished(copyDir(gulp, `${dir}/src/fonts`, `${dir}/dist/fonts`)),
    finished(copyDir(gulp, `${dir}/src/images`, `${dir}/dist/images`))
  ]);
}

/**
 * Copy Sass files from src to dist because we don't distribute the src folder
 */
function copySass(gulp, dir) {
  return gulp
    .src([`${dir}/src/**/*.{scss,sass}`, `!${dir}/src/**/*.docs.{scss,sass}`])
    .pipe(gulp.dest(`${dir}/dist`));
}

function copyAll(gulp, dir) {
  return Promise.all([
    copyAssets(gulp, dir),
    finished(copyJson(gulp, dir)),
    finished(copySass(gulp, dir))
  ]);
}

/**
 * Transpile design system React components.
 *  Note: If you're running a dev server and try to use a newly
 *  babelfied React component in the docs site, you need to run
 *  this task first, otherwise the component won't be found.
 */
function compileJs(gulp, dir) {
  return gulp
    .src([
      `${dir}/src/**/*.{js,jsx}`,
      `!${dir}/src/**/{__mocks__,__tests__}/*.{js,jsx}`,
      `!${dir}/src/**/*.example.{js,jsx}`,
      `!${dir}/src/**/*.test.{js,jsx}`,
      `!${dir}/src/helpers/e2e/*.{js,jsx}`
    ])
    .pipe(babel())
    .pipe(gulp.dest(`${dir}/dist`))
    .pipe(
      count({
        message: `## JS files processed in ${dir}`,
        logger: message => logTask('📜 ', message)
      })
    );
}

module.exports = (gulp, { sourcePackageDir }) => {
  gulp.task('build:clean', () => cleanDist(gulp, sourcePackageDir));
  gulp.task('build:copy', () => copyAll(gulp, sourcePackageDir));
  gulp.task('build:babel', () => compileJs(gulp, sourcePackageDir));
  gulp.task('build:success', done => {
    logTask('✅ ', 'Build succeeded');
    log('');
    done();
  });

  gulp.task('build:src', done => {
    runSequence(
      'build:clean',
      'build:copy',
      'build:babel', // Important: This needs ran before docs:build!
      'sass:src',
      'build:success',
      done
    );
  });

  /**
   * Builds the docs site. Note that build:src must run before this
   */
  gulp.task('build:docs', done => {
    logIntroduction();

    runSequence('docs:build', 'webpack', 'sass:docs', done);
  });

  gulp.task('build', done => {
    logIntroduction();
    runSequence('build:src', 'stats', done);
  });

  gulp.task('build:dev', done => {
    runSequence('build:src', 'build:docs', done);
  });
};
