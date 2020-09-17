const count = require('gulp-count');
const changedInPlace = require('gulp-changed-in-place');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const path = require('path');
const streamPromise = require('./common/streamPromise');
const { logTask } = require('./common/logUtil');

/**
 *  The CMSDS lint script is built to allow the user to have full control,
 *  both the linter versions and config files are to be specified by the user, and any of the 3 linters can be disabled
 *  The only guidance we provide is the `eslint-config-design-system` and `stylelint-config-design-system` packages
 *  and the peer dependencies in the CMSDS scripts package.json
 */

// Depending on if the user disabled any of these linters/formatters, we will dynamically require these dependencies
let eslint;
let stylelint;
let prettier;

// Rather than individually configure eslint, stylelint, and prettier to ignore paths,
// Dynamically add ignore patterns to the src glob for each linter
// This approach will also make gulp-count more accurate
const getSrcGlob = (glob, dir, ignorePatterns) => [
  ...glob,
  ...ignorePatterns.map((ignore) => path.join(`!${dir}`, ignore)),
];

// Format files using prettier
async function runPrettier(dir, ignorePatterns, failAfterError) {
  const src = [path.join(dir, '**/*.{js,jsx,ts,tsx,scss,html,md,mdx,json}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## Files formatted with Prettier`))
      .pipe(gulpIf(!failAfterError, prettier()))
      .pipe(gulpIf(failAfterError, prettier.check()))
      .pipe(gulp.dest(dir))
  );
}

// Lint Sass files using stylelint
async function runStylelint(dir, fix, ignorePatterns, failAfterError) {
  const src = [path.join(dir, '**/*.scss'), path.join(`!${dir}`, '**/*.docs.scss')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(count(`## Sass files linted`))
      .pipe(
        stylelint({
          fix,
          failAfterError,
          reporters: [{ formatter: 'string', console: true }],
          syntax: 'scss',
        })
      )
      .pipe(gulp.dest(dir))
  );
}

// Lint JS files using eslint
async function runEslint(dir, fix, ignorePatterns, failAfterError) {
  const src = [path.join(dir, '**/*.{js,jsx,ts,tsx}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## JS files linted`))
      .pipe(eslint({ fix }))
      .pipe(eslint.format())
      .pipe(gulpIf(failAfterError, eslint.failAfterError()))
      .pipe(gulp.dest(dir))
  );
}

module.exports = {
  async lintDirectory(directory, fix, ignorePatterns, failAfterError, disable) {
    logTask(
      '🔎 ',
      `Linting files in: ${directory} and ignoring paths: ${ignorePatterns.join(', ')}`
    );

    if (!disable.disablePrettier) {
      prettier = require('gulp-prettier');
      await runPrettier(directory, ignorePatterns, failAfterError);
    }
    if (!disable.disableStylelint) {
      stylelint = require('gulp-stylelint');
      await runStylelint(directory, fix, ignorePatterns, failAfterError);
    }
    if (!disable.disableEslint) {
      eslint = require('gulp-eslint');
      await runEslint(directory, fix, ignorePatterns, failAfterError);
    }
  },
};
