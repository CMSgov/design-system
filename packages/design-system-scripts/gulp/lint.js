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

async function runPrettier(dir, ignorePatterns) {
  const src = [path.join(dir, '**/*.{js,jsx,scss,html,md,mdx,json}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## Files formatted with Prettier in ${dir}`))
      .pipe(gulpIf(process.env.NODE_ENV !== 'test', prettier()))
      .pipe(gulpIf(process.env.NODE_ENV === 'test', prettier.check()))
      .pipe(gulp.dest(dir))
  );
}

// Lint Sass files using stylelint
async function runStylelint(dir, fix, ignorePatterns) {
  const src = [path.join(dir, '**/*.scss'), path.join(`!${dir}`, '**/*.docs.scss')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(count(`## Sass files linted in ${dir}`))
      .pipe(
        stylelint({
          fix,
          failAfterError: process.env.NODE_ENV === 'test',
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
async function runEslint(dir, fix, ignorePatterns) {
  const src = [path.join(dir, '**/*.{js,jsx}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## JS files linted in ${dir}`))
      .pipe(eslint({ fix }))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest(dir)))
      .pipe(gulpIf(process.env.NODE_ENV === 'test', eslint.failAfterError()))
  );
}

module.exports = {
  async lintDirectories(directories, fix, ignorePatterns) {
    logTask(
      '🔎 ',
      `Linting files in: ${directories.join(', ')} and ignoring paths: ${ignorePatterns.join(', ')}`
    );

    await Promise.all(
      directories.map(async (dir) => {
        await runPrettier(dir, ignorePatterns);
        await runStylelint(dir, fix, ignorePatterns);
        await runEslint(dir, fix, ignorePatterns);
      })
    );
  },
};
