/**
 * The build task handles compiling and optimizing both the package assets
 * and the documentation site. Essentially makes everything production-ready.
 */
const babel = require('gulp-babel');
const del = require('del');
const dutil = require('./common/log-util');
const runSequence = require('run-sequence');

module.exports = (gulp) => {
  gulp.task('build:clean-dist', () => {
    dutil.logMessage('🚮 ', 'Cleaning core "dist" directory');
    return del(['packages/core/dist']);
  });

  // This could be simplified once the fonts task removed
  gulp.task('build:assets', ['sass', 'fonts', 'build:react']);

  // Transpile React components
  gulp.task('build:react', () => {
    dutil.logMessage('🐠 ', 'Babelfying React components');

    return gulp.src([
      'packages/core/src/**/*.{js,jsx}',
      '!packages/core/src/**/*.example.{js,jsx}',
      '!packages/core/src/**/*.test.{js,jsx}'
    ])
      .pipe(babel())
      .pipe(gulp.dest('packages/core/dist'));
  });

  gulp.task('build:success', () => {
    dutil.logMessage('✅ ', 'Generated documentation added to packages/docs/build');
    dutil.logMessage('✅ ', 'Compiled core assets added to packages/core/dist');
  });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      'build:clean-dist',
      'docs:build',
      'build:assets',
      'build:success',
      'stats',
      done
    );
  });
};
