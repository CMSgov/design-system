const eslint = require('gulp-eslint');

module.exports = (gulp) => {
  gulp.task('eslint', () => {
    return gulp.src([
      'src/scripts/**/*.js',
      'src/scripts/**/*.jsx',
      '!src/scripts/vendor/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
  });

  gulp.task('javascript', ['eslint']);
};
