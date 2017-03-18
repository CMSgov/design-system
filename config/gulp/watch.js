/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./doc-util');
const runSequence = require('run-sequence');

module.exports = (gulp, shared) => {
  gulp.task('watch:core', () => {
    gulp.watch('packages/core/src/**/*.scss', [
      'lint:core-styles',
      'sass:process:core',
      'sass:process:docs',
      'docs:generate-pages'
    ]);

    gulp.watch([
      'packages/core/src/**/*.js',
      'packages/core/src/**/*.jsx'
    ], ['lint:core-scripts', 'docs:react']);

    gulp.watch(['packages/core/src/images/*'], [
      'docs:clean-images',
      'docs:copy-images'
    ]);
  });

  gulp.task('watch:docs', () => {
    gulp.watch('packages/docs/src/**/*.scss', [
      'lint:docs-styles',
      'sass:process:docs'
    ]);

    gulp.watch([
      'packages/docs/src/**/*.js',
      'packages/docs/src/**/*.jsx'
    ], ['lint:docs-scripts']); // compiling is handled by Webpack when the files change
  });

  gulp.task('watch', () => {
    dutil.logMessage(
      '👀 ',
      'Transpiling + watching files for future changes'
    );

    runSequence(
      'docs:build',
      'build:assets',
      [
        'server',
        'watch:core',
        'watch:docs'
      ]
    );
  });
};
