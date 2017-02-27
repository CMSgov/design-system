const count = require('gulp-count');
const eslint = require('gulp-eslint');

module.exports = (gulp) => {
  gulp.task('eslint:assets', () => {
    return gulp.src([
      'packages/core/src/**/*.js',
      'packages/core/src/**/*.jsx',
      '!src/vendor/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## system JS files linted'));
  });

  gulp.task('eslint:docs', () => {
    return gulp.src([
      'packages/docs/src/**/*.js',
      'packages/docs/src/**/*.jsx'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(count('## docs JS files linted'));
  });

  gulp.task('javascript', ['eslint:assets', 'eslint:docs']);
};
