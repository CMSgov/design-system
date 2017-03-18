const dutil = require('./doc-util');

module.exports = (gulp) => {
  // TODO(sawyer): This seems overkill. Let's only distribute fonts in the
  // src or dist directory, but not both.
  gulp.task('fonts', () => {
    dutil.logMessage(
      '⚠️ ',
      'Copying fonts from core "src" into core "dist" directory'
    );

    return gulp.src('packages/core/src/fonts/**/*')
      .pipe(gulp.dest('packages/core/dist/fonts'));
  });
};
