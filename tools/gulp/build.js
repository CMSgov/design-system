/**
 * @file The build tasks handle compiling and optimizing both the
 *  package assets and the documentation site. Essentially makes
 *  everything production-ready.
 */
const babel = require('gulp-babel');
const del = require('del');
const dutil = require('./common/log-util');
const runSequence = require('gulp4-run-sequence');

module.exports = (gulp, shared) => {
  const babelTasks = shared.packages.map(pkg => `build:babel:${pkg}`);
  const jsonTasks = shared.packages.map(pkg => `build:json:${pkg}`);
  const cleanTasks = shared.packages.map(pkg => `build:clean:${pkg}`);

  // Form tasks for each package...
  shared.packages.forEach((pkg, i) => {
    /**
     * Transpile design system React components.
     *  Note: If you're running a dev server and try to use a newly
     *  babelfied React component in the docs site, you need to run
     *  this task first, otherwise the component won't be found.
     */
    gulp.task(babelTasks[i], () => {
      dutil.logMessage('🐠 ', `Babelfying JS components: ${pkg}`);

      return gulp
        .src([
          `packages/${pkg}/src/**/*.{js,jsx}`,
          `!packages/${pkg}/src/**/{__mocks__,__tests__}/*.{js,jsx}`,
          `!packages/${pkg}/src/**/*.example.{js,jsx}`,
          `!packages/${pkg}/src/**/*.test.{js,jsx}`,
          `!packages/${pkg}/src/helpers/e2e/*.{js,jsx}`
        ])
        .pipe(babel())
        .pipe(gulp.dest(`packages/${pkg}/dist`));
    });

    // Copy any JSON files that our components might depend on
    gulp.task(jsonTasks[i], () => {
      return gulp
        .src([
          `packages/${pkg}/src/**/*.json`,
          `!packages/${pkg}/src/**/{__mocks__,__tests__}/*.json`
        ])
        .pipe(gulp.dest(`packages/${pkg}/dist`));
    });

    /**
     * Empty the dist/ directory so any stale files are removed
     */
    gulp.task(cleanTasks[i], () => {
      dutil.logMessage('🚮 ', `Resetting "dist" directory: ${pkg}`);
      return del([`packages/${pkg}/dist`]);
    });
  });

  /**
   * GitHub pages relies on the documentation to be in the root of the "docs"
   * directory, so once everything is built with the proper relative URLs, we
   * move everything into the root of the directory.
   */
  gulp.task('build:gh-pages', done => {
    if (shared.rootPath !== '') {
      dutil.logMessage('🤝 ', 'Moving files to root of docs directory');
      return gulp
        .src(`${shared.docsPath}/${shared.rootPath}/**/*`)
        .pipe(gulp.dest(shared.docsPath));
    } else {
      done();
    }
  });

  gulp.task('build:success', done => {
    dutil.logMessage('✅ ', 'Build succeeded');
    done();
  });

  /**
   * Tasks ran before starting a local dev environment
   */
  gulp.task('build:dev', done => {
    runSequence(jsonTasks, babelTasks, 'docs:build', 'sass:process:docs', done);
  });

  gulp.task('build', done => {
    dutil.logIntroduction();

    runSequence(
      cleanTasks,
      jsonTasks,
      babelTasks, // Important: This needs ran before docs:build!
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
