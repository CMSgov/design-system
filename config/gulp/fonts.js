module.exports = (gulp) => {
  gulp.task('fonts', done => {
    return gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
  });
};
