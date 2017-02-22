/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp, shared) => {
  gulp.task('watch:assets', () => {
    gulp.watch('src/styles/**/*.scss', [
      'sass:lint-assets',
      'sass:process-assets',
      'sass:process-docs',
      'docs:kss'
    ]);

    gulp.watch(['src/scripts/**/*.js', 'src/scripts/**/*.jsx'], ['javascript']);
  });

  gulp.task('watch:docs', () => {
    gulp.watch('docs/src/styles/**/*.scss', [
      'sass:lint-docs',
      'sass:process-docs'
    ]);

    gulp.watch([
      'docs/src/scripts/**/*.js',
      'docs/src/scripts/**/*.jsx'
    ], ['eslint:docs']); // compiling is handled by Webpack when the files change
  });

  gulp.task('watch', () => {
    dutil.logMessage('watch', 'Starting watch');

    runSequence(
      'build:assets',
      [
        'server',
        'watch:assets',
        'watch:docs',
        'webpack:watch',
      ]
    );
  });
};
