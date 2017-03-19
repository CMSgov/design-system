/**
 * The build task handles compiling and optimizing both the package assets
 * and the documentation site. Essentially makes everything production-ready.
 */
const del = require('del');
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp) => {
  gulp.task('build:clean-dist', () => {
    dutil.logMessage('🚮 ', 'Cleaning core "dist" directory');
    return del(['packages/core/dist']);
  });

  // This could be simplified once the fonts task removed
  gulp.task('build:assets', ['sass', 'fonts']);

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
      done
    );
  });
};
