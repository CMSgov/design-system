/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp, shared) => {
  gulp.task('watch:assets', () => {
    gulp.watch('packages/core/src/**/*.scss', [
      'sass:lint-assets',
      'sass:process-assets',
      'sass:process-docs',
      'docs:kss'
    ]);

    gulp.watch(['packages/core/src/**/*.js', 'packages/core/src/**/*.jsx'], ['javascript']);
  });

  gulp.task('watch:docs', () => {
    gulp.watch('packages/docs/src/**/*.scss', [
      'sass:lint-docs',
      'sass:process-docs'
    ]);

    gulp.watch([
      'packages/docs/src/**/*.js',
      'packages/docs/src/**/*.jsx'
    ], ['eslint:docs']); // compiling is handled by Webpack when the files change
  });

  gulp.task('watch', () => {
    dutil.logMessage('watch', 'Starting watch');

    runSequence(
      'build:assets',
      'docs:build',
      [
        'server',
        'watch:assets',
        'watch:docs'
      ]
    );
  });
};
