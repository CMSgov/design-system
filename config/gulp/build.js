/**
 * The build task handles compiling and optimizing both the package assets
 * and the documentation site. Essentially makes everything production-ready.
 */
const del = require('del');
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp) => {
  gulp.task('clean-dist', () => {
    dutil.logMessage('clean-dist', 'Cleaning dist directory');
    return del(['dist']);
  });

  gulp.task('build:assets', done => {
    dutil.logMessage('build:assets', 'Building all assets');

    return runSequence(
      [
        'sass',
        'javascript',
        'fonts'
      ],
      done
    );
  });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      'clean-dist',
      'build:assets',
      'docs:build',
      done
    );
  });
};