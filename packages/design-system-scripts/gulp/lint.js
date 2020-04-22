const _ = require('lodash');
const count = require('gulp-count');
const changedInPlace = require('gulp-changed-in-place');
const eslint = require('gulp-eslint');
const eslintConfig = require('../eslint.config');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const path = require('path');
const prettier = require('gulp-prettier');
const prettierConfig = require('../prettier.config');
const stylelint = require('gulp-stylelint');
const stylelintConfig = require('../stylelint.config');
const getPackageName = require('./common/getPackageName');
const streamPromise = require('./common/streamPromise');
const { logTask } = require('./common/logUtil');
const { CORE_SOURCE_PACKAGE } = require('./common/constants');

// Helper function for dynamically updating a linter config based off the package.json
const getLinterConfig = async (dir, originalConfig, additionalCoreRules) => {
  const config = _.cloneDeep(originalConfig);

  // Add addition linting rules for core DS
  const name = await getPackageName(dir);
  if (name === CORE_SOURCE_PACKAGE) {
    _.set(config, 'rules', { ...config.rules, ...additionalCoreRules });
  }
  return config;
};

// Rather than individually configure eslint, stylelint, and prettier to ignore paths,
// Dynamically add ignore patterns to the src glob for each linter
// This approach will also make gulp-count more accurate
const getSrcGlob = (glob, dir, ignorePatterns) => {
  const test = [...glob, ...ignorePatterns.map((ignore) => path.join(`!${dir}`, ignore))];
  console.log(test);
  return test;
};

async function runPrettier(dir, ignorePatterns) {
  const src = [path.join(dir, '**/*.{js,jsx,scss,html,md,mdx,json}')];

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(count(`## Files formatted with Prettier in ${dir}`))
      .pipe(gulpIf(process.env.NODE_ENV !== 'test', prettier({ ...prettierConfig })))
      .pipe(gulpIf(process.env.NODE_ENV === 'test', prettier.check({ ...prettierConfig })))
      .pipe(gulp.dest(dir))
  );
}

/**
 * Class naming pattern for the core design system
 * ~~~~~~~~~~~~~~~~~~~~
 * Names:    ds-
 * Prefixes: l- c- u-
 * Pattern:  [NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]
 * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
 */
const coreStyleLintRules = {
  'selector-class-pattern': /^(ds-)(l|c|u|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/,
};

// Lint Sass files using stylelint
async function lintSass(dir, fix, ignorePatterns) {
  const src = [path.join(dir, '**/*.scss'), path.join(`!${dir}`, '**/*.docs.scss')];
  const config = await getLinterConfig(dir, stylelintConfig, coreStyleLintRules);
  const configBasedir = path.resolve(__dirname, '../node_modules');

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(changedInPlace({ firstPass: true }))
      .pipe(count(`## Sass files linted in ${dir}`))
      .pipe(
        stylelint({
          config,
          configBasedir,
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

// Additional eslint rules for the core design system
const coreEsLintRules = {
  // Avoid exploits. If you need dangerouslySetInnerHTML, then temporarily
  // disable this rule in the script rather than removing it from here.
  'react/no-danger': 'error',
};

// Lint JS files using eslint
async function lintJS(dir, fix, ignorePatterns) {
  const src = [path.join(dir, '**/*.{js,jsx}')];
  const config = await getLinterConfig(dir, eslintConfig, coreEsLintRules);

  return streamPromise(
    gulp
      .src(getSrcGlob(src, dir, ignorePatterns))
      .pipe(count(`## JS files linted in ${dir}`))
      .pipe(eslint({ ...{ fix }, ...config }))
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
        // For some reason, these promisified gulp tasks aren't playing nice together,
        // and this order is needed in order for all 3 tasks to run correctly
        // Eslint and stylelint are configured to not conflict with Prettier so the order shouldnt matter
        // TODO: Fix this eventually
        await lintSass(dir, fix, ignorePatterns);
        await runPrettier(dir, ignorePatterns);
        await lintJS(dir, fix, ignorePatterns);
      })
    );
  },
};
