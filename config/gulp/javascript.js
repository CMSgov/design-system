const count = require('gulp-count');
const eslint = require('gulp-eslint');

module.exports = (gulp) => {
  gulp.task('eslint:assets', () => {
    return gulp.src([
      'packages/core/src/scripts/**/*.js',
      'packages/core/src/scripts/**/*.jsx',
      '!src/scripts/vendor/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## system JS files linted'));
  });

  gulp.task('eslint:docs', () => {
    return gulp.src([
      'packages/docs/src/scripts/**/*.js',
      'packages/docs/src/scripts/**/*.jsx'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## docs JS files linted'));
  });

  gulp.task('javascript', ['eslint:assets', 'eslint:docs']);
};
