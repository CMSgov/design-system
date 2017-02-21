module.exports = (gulp) => {
  gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
  });
};
