'use strict';

const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const clean = require('postcss-clean');
const count = require('gulp-count');
const cssnano = require('cssnano');
const del = require('del');
const dutil = require('../common/log-util');
const path = require('path');
const packageVersions = require('../common/packageVersions');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssInliner = require('postcss-image-inliner');
const gulpEval = require('gulp-eval');
const gulpIf = require('gulp-if');
const safe = require('postcss-safe-parser');
const stylelint = require('stylelint');
const stylefmt = require('stylefmt');
const tap = require('gulp-tap');
const through = require('through2');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const packagesRegex = require('../common/packagesRegex');

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

    return (
      gulp
        .src(`${cwd}src/**/*.rules.js`)
        .pipe(
          changed(dest, {
            extension: '.css',
            // compare contents so files that import the updated file also get piped through
            hasChanged: changed.compareSha1Digest
          })
        )
        .pipe(
          tap(function(file) {
            file.contents = new Buffer(require(file.path));
          })
        )
        // .pipe(
        //   babel({
        //     presets: ['env'],
        //     plugins: ['rewire']
        //   })
        // )
        // .pipe(gulpEval())
        // .pipe(
        //   through.obj(function(file, env, next) {
        //     console.log('data: ', file.data);
        //     file.contents = new Buffer(file.data);
        //     next(null, file);
        //   })
        // )
        .pipe(postcss(postcssPlugins, { parser: safe }))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(dest))
        .pipe(count(`## Rules files processed in ${cwd}`))
        .pipe(shared.browserSync.stream({ match: '**/public/styles/*.css' }))
    ); // Auto-inject into docs
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
