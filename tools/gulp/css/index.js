'use strict';

const autoprefixer = require('autoprefixer');
const changed = require('gulp-changed');
const count = require('gulp-count');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const safe = require('postcss-safe-parser');
const exec = require('gulp-exec');
const stylelint = require('stylelint');
const stylefmt = require('stylefmt');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

module.exports = (gulp, shared) => {
  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function extractRules(cwd, dest) {
    const postcssPlugins = [
      stylelint({ fix: true }),
      stylefmt,
      autoprefixer() // add any necessary vendor prefixes
    ];

    if (shared.env !== 'development') {
      postcssPlugins.push(cssnano()); // minify css
    }

    return gulp
      .src(`${cwd}src/**/*.rules.js`)
      .pipe(
        changed(dest, {
          extension: '.css',
          // compare contents so files that import the updated file also get piped through
          hasChanged: changed.compareSha1Digest
        })
      )
      .pipe(
        exec('BABEL_ENV=node ./node_modules/.bin/babel-node <%= file.path %>', {
          pipeStdout: true
        })
      )
      .pipe(postcss(postcssPlugins, { parser: safe }))
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest(dest))
      .pipe(count(`## Rules files processed in ${cwd}`))
      .pipe(shared.browserSync.stream({ match: '**/public/styles/*.css' })); // Auto-inject into docs
  }

  // Form tasks for each package...
  const processPackageTasks = shared.packages.map(pkg => `css:process:${pkg}`);
  shared.packages.forEach((pkg, i) => {
    return gulp.task(processPackageTasks[i], () => {
      return extractRules(`packages/${pkg}/`, `packages/${pkg}/dist`);
    });
  });

  gulp.task('css', done => {
    runSequence(processPackageTasks, done);
  });
};
