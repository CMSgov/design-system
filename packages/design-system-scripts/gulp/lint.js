const count = require('gulp-count');
const changedInPlace = require('gulp-changed-in-place');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const path = require('path');
const prettier = require('gulp-prettier');
const stylelint = require('gulp-stylelint');
const streamPromise = require('./common/streamPromise');
const { logTask } = require('./common/logUtil');

// Rather than individually configure eslint, stylelint, and prettier to ignore paths,
// Dynamically add ignore patterns to the src glob for each linter
// This approach will also make gulp-count more accurate
const getSrcGlob = (glob, dir, ignorePatterns) => [
  ...glob,
  ...ignorePatterns.map((ignore) => path.join(`!${dir}`, ignore)),
];

async function runPrettier(dir, ignorePatterns, failAfterError) {
  const src = [path.join(dir, '**/*.{js,jsx,ts,tsx,scss,html,md,mdx,json}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## Files formatted with Prettier in ${dir}`))
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
      .pipe(count(`## Sass files linted in ${dir}`))
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

// Taken from gulp-eslint example
// https://github.com/adametry/gulp-eslint/blob/master/example/fix.js
const isFixed = (file) => {
  return file.eslint != null && file.eslint.fixed;
};

// Lint JS files using eslint
async function runEslint(dir, fix, ignorePatterns, failAfterError) {
  const src = [path.join(dir, '**/*.{js,jsx,ts,tsx}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## JS files linted in ${dir}`))
      .pipe(eslint({ fix }))
      .pipe(eslint.format())
      .pipe(gulpIf(failAfterError, eslint.failAfterError()))
      .pipe(gulpIf(isFixed, gulp.dest(dir)))
  );
}

module.exports = {
  async lintDirectories(directories, fix, ignorePatterns, failAfterError, disable) {
    logTask(
      '🔎 ',
      `Linting files in: ${directories.join(', ')} and ignoring paths: ${ignorePatterns.join(', ')}`
    );

    await Promise.all(
      directories.map(async (dir) => {
        if (!disable.disablePrettier) {
          await runPrettier(dir, ignorePatterns, failAfterError);
        }
        if (!disable.disableStylelint) {
          await runStylelint(dir, fix, ignorePatterns, failAfterError);
        }
        if (!disable.disableEslint) {
          await runEslint(dir, fix, ignorePatterns, failAfterError);
        }
      })
    );
  },
};
