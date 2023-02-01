const gulp = require('gulp');

/**
 * Copy the static assets from the design system, such as the fonts and images.
 * We could do this manually, but why not automate it so it's easy to do
 * as things are updated :)
 */
gulp.task('copy-design-system', function () {
  return gulp
    .src([
      'node_modules/@cmsgov/ds-cms-gov/dist/**/fonts/*',
      'node_modules/@cmsgov/ds-cms-gov/dist/**/images/*',
    ])
    .pipe(gulp.dest('./dist/'));
});

/**
 * Copy CSS files to local dist
 */
gulp.task('css', function () {
  return gulp
    .src('node_modules/@cmsgov/ds-cms-gov/dist/css/*.css')
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('default', gulp.series('copy-design-system', 'css'));
