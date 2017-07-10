/**
 * The `bumpVersion` task increments our package versions. It accepts a single
 * argument: `--type` with a value of 'patch' (default), 'minor', and 'major'.
 * Example: `gulp bumpVersion --type=major` would bump 1.1.1 to 2.0.0
 */
const argv = require('yargs').argv;
const bump = require('gulp-bump');
const dutil = require('./common/log-util');
const packagesRegex = require('./common/packagesRegex');

module.exports = (gulp, shared) => {
  gulp.task('bumpVersion', () => {
    const bumpType = argv.type ? argv.type : 'patch';
    const packages = shared.packages.concat(['docs']);
    const dir = packagesRegex(packages);
    dutil.logMessage('bumpVersion',
      `Bumping package.json versions for ${packages.length} packages`
    );

    return gulp
      .src([`./packages/${dir}/package.json`])
      .pipe(bump({ type: bumpType }))
      .pipe(gulp.dest('./packages/'));
  });
};
