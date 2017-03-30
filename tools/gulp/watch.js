/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const dutil = require('./common/log-util');
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
      'packages/core/src/**/*.{js,jsx}',
      '!packages/core/src/**/*.example.{js,jsx}',
      '!packages/core/src/**/*.test.{js,jsx}'
    ], ['lint:core-scripts', 'docs:react']);

    gulp.watch(['packages/core/src/images/*'], [
      'docs:clean-images',
      'docs:copy-images'
    ]);
  });

  gulp.task('watch:docs', () => {
    gulp.watch('packages/docs/src/styles/**/*.scss', [
      'lint:docs-styles',
      'sass:process:docs'
    ]);

    gulp.watch('packages/docs/src/pages/**/*.md', [
      'docs:generate-pages'
    ]);

    gulp.watch([
      'packages/docs/src/scripts/**/*.{js,jsx}'
    ], ['lint:docs-scripts']);
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
