module.exports = (gulp, shared) => {
  gulp.task('server', () => {
    // Start a BrowserSync server
    shared.browserSync.init({
      server: {
        baseDir: './docs'
      },
      notify: false,
      open: false,
    });
  });
};
