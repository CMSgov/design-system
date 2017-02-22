const eslint = require('gulp-eslint');

module.exports = (gulp) => {
  gulp.task('eslint:assets', () => {
    return gulp.src([
      'src/scripts/**/*.js',
      'src/scripts/**/*.jsx',
      '!src/scripts/vendor/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
  });

  gulp.task('eslint:docs', () => {
    return gulp.src([
      'docs/src/scripts/**/*.js',
      'docs/src/scripts/**/*.jsx'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
  });

  gulp.task('javascript', ['eslint:assets', 'eslint:docs']);
};
