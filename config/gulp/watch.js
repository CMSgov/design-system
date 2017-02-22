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
    gulp.watch(['docs/*.html'])
      .on('change', shared.browserSync.reload);

    gulp.watch('docs/src/styles/**/*.scss', [
      'sass:lint-docs',
      'sass:process-docs'
    ]);

    gulp.watch([
      'docs/src/scripts/**/*.js',
      'docs/src/scripts/**/*.jsx'
    ], ['eslint:docs']);
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
