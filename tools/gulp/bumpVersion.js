/**
 * The `bumpVersion` task increments our package versions. It accepts a single
 * argument: `--type` with a value of 'patch' (default), 'minor', and 'major'.
 * Example: `gulp bumpVersion --type=major` would bump 1.1.1 to 2.0.0
 */
const argv = require('yargs').argv;
const bump = require('gulp-bump');
const dutil = require('./common/log-util');
const runSequence = require('run-sequence');

module.exports = (gulp) => {
  function bumpVersion(dir = '.') {
    const bumpType = argv.type ? argv.type : 'patch';
    dutil.logMessage('bumpVersion', `Bumping version for ${dir}`);

    return gulp
      .src([`${dir}/package.json`])
      .pipe(bump({ type: bumpType }))
      .pipe(gulp.dest(dir));
  }

  gulp.task('bumpVersion:core', () => bumpVersion('./packages/core'));
  gulp.task('bumpVersion:docs', () => bumpVersion('./packages/docs'));

  gulp.task('bumpVersion', () => {
    runSequence([
      'bumpVersion:core',
      'bumpVersion:docs',
    ]);
  });
};
