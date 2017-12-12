const gulp = require('gulp');
const sass = require('gulp-sass');

/**
 * Copy the static assets from the design system, such as the fonts and images.
 * We could do this manually, but why not automate it so it's easy to do
 * as things are updated :)
 */
gulp.task('copy-design-system', function() {
  return gulp
    .src([
      'node_modules/@cmsgov/design-system-core/**/fonts/*',
      'node_modules/@cmsgov/design-system-core/**/images/*'
    ])
    .pipe(gulp.dest('./dist'));
});

/**
 * Transpile Sass to CSS
 */
gulp.task('sass', function() {
  const transpiler = sass({
    // Add node_modules to the list of paths used to resolve @import
    // declarations. This way it's easier to import our design system's
    // Sass files.
    includePaths: ['node_modules'],
    outputStyle: 'compressed'
  }).on('error', sass.logError);

  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(transpiler)
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('default', ['copy-design-system', 'sass']);
