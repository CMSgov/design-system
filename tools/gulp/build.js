/**
 * The build task handles compiling and optimizing both the package assets
 * and the documentation site. Essentially makes everything production-ready.
 */
const babel = require('gulp-babel');
const del = require('del');
const dutil = require('./common/log-util');
const runSequence = require('run-sequence');

module.exports = (gulp, shared) => {
  gulp.task('build:clean-dist', () => {
    dutil.logMessage('🚮 ', 'Cleaning core "dist" directory');
    return del(['packages/core/dist']);
  });

  // GitHub pages relies on the documentation to be in the root of the "docs"
  // directory, so once everything is built with the proper relative URLs, we
  // move everything into the root of the directory.
  gulp.task('build:gh-pages', () => {
    if (shared.rootPath !== '') {
      dutil.logMessage('🤝 ', 'Moving files to root of docs directory');
      return gulp
        .src(`${shared.docsPath}/${shared.rootPath}/**/*`)
        .pipe(gulp.dest(shared.docsPath));
    }
  });

  /**
   * Transpile design system React components.
   * Note: If you're running a dev server for the documentation site and try
   * to use a new React component, make sure you run this task, otherwise
   * the component won't be found.
   */
  gulp.task('build:react', () => {
    dutil.logMessage('🐠 ', 'Babelfying React components');

    return gulp
      .src([
        'packages/core/src/**/*.{js,jsx}',
        '!packages/core/src/**/*.example.{js,jsx}',
        '!packages/core/src/**/*.test.{js,jsx}'
      ])
      .pipe(babel())
      .pipe(gulp.dest('packages/core/dist'));
  });

  gulp.task('build:success', () => {
    dutil.logMessage('✅ ', 'Build succeeded');
  });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      'build:clean-dist',
      'build:react', // Important: This needs ran before docs:build!
      'docs:build',
      'webpack',
      'sass',
      'build:gh-pages',
      'build:success',
      'stats',
      done
    );
  });
};
