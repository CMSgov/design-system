const gulp = require('gulp');

/**
 * Copy the static assets from the design system, such as the fonts and images.
 * We could do this manually, but why not automate it so it's easy to do
 * as things are updated :)
 */
gulp.task('copy-design-system', function () {
  return gulp
    .src([
      'node_modules/@cmsgov/design-system/dist/**/fonts/*',
      'node_modules/@cmsgov/design-system/dist/**/images/*',
      'node_modules/@cmsgov/design-system/dist/css/*.css',
    ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', gulp.series('copy-design-system'));
