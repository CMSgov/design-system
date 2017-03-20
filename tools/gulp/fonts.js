module.exports = (gulp) => {
  gulp.task('fonts', () => {
    return gulp.src('packages/core/src/fonts/**/*')
      .pipe(gulp.dest('packages/core/dist/fonts'));
  });
};
