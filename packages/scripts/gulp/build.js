/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const count = require('gulp-count');
const del = require('del');
const dutil = require('./common/log-util');
const runSequence = require('gulp4-run-sequence');

/**
 * Empty the dist/ directory so any stale files are removed
 */
function cleanDist(gulp, dir) {
  dutil.logMessage('🚮 ', `Resetting "dist" directory: ${dir}`);
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
        logger: message => dutil.logMessage('📜 ', message)
      })
    );
}

module.exports = (gulp, { sourcePackageDir }) => {
  gulp.task('build:clean', () => cleanDist(gulp, sourcePackageDir));
  gulp.task('build:json', () => copyJson(gulp, sourcePackageDir));
  gulp.task('build:babel', () => compileJs(gulp, sourcePackageDir));
  gulp.task('build:success', done => {
    dutil.logMessage('✅ ', 'Build succeeded');
    done();
  });

  // gulp.task('build:dev', done => {
  //   runSequence(jsonTasks, babelTasks, 'docs:build', 'sass:docs', done);
  // });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      'build:clean',
      'build:json',
      'build:babel', // Important: This needs ran before docs:build!
      // 'docs:build',
      // 'webpack',
      'sass:src',
      'build:success',
      // 'stats',
      done
    );
  });
};
