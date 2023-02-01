const gulp = require('gulp');
const sass = require('gulp-sass');

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
    ])
    .pipe(gulp.dest('./dist/'));
});

/**
 * Transpile Sass to CSS
 */
gulp.task('sass', function () {
  const transpiler = sass({
    outputStyle: 'compressed',
  }).on('error', sass.logError);

  return gulp.src('./src/styles/**/*.scss').pipe(transpiler).pipe(gulp.dest('./dist/styles'));
});

/**
 * Copy CSS files to local dist
 */
gulp.task('css', function () {
  return gulp
    .src('node_modules/@cmsgov/design-system/dist/css/*.css')
    .pipe(gulp.dest('./dist/styles/cmsds'));
});

gulp.task('default', gulp.series('copy-design-system', 'sass'));
