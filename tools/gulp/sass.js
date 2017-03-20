'use strict';

const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const count = require('gulp-count');
const cssnano = require('cssnano');
const del = require('del');
const dutil = require('./doc-util');
const path = require('path');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssInliner = require('postcss-image-inliner');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');

const config = {
  vendorSrc: 'packages/core/src/vendor'
};

module.exports = (gulp, shared) => {
  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function processSass(cwd) {
    const createSourcemaps = false;//argv.env === 'development';
    const sassCompiler = sass({
      outputStyle: 'expanded',
      includePaths: [`${cwd}node_modules`]
    }).on('error', function(err) {
      dutil.logError('sass', 'Error transpiling Sass!');
      dutil.logData(err.messageFormatted);
      this.emit('end');
    });

    const postcssPlugins = [
      postcssImport(), // inline imports
      autoprefixer()  // add any necessary vendor prefixes
    ];

    if (argv.env !== 'development') {
      // minify css
      postcssPlugins.push(cssnano());
    }

    if (!cwd.match(/\/docs\//)) {
      // inline/base64 images
      postcssPlugins.push(postcssInliner({
        assetPaths: [path.resolve(__dirname, `../../${cwd}/src/`)],
        strict: true
      }));
    }

    return gulp
      .src(`${cwd}src/**/*.scss`)
      .pipe(gulpIf(createSourcemaps, sourcemaps.init()))
      .pipe(sassCompiler)
      .pipe(gulpIf(createSourcemaps, sourcemaps.write()))
      .pipe(postcss(postcssPlugins))
      .pipe(gulp.dest(`${cwd}dist`))
      .pipe(count('## Sass files processed'))
      .pipe(shared.browserSync.stream({match: '**/*.css'})); // Auto-inject into docs
  }

  // Prune the vendor directory
  gulp.task('sass:clean-vendor', () => {
    return del(config.vendorSrc);
  });

  // Copy 3rd-party Sass dependencies into a "vendor" subdirectory
  gulp.task('sass:copy-vendor', () => {
    var packages = [
      './packages/core/node_modules/bourbon/app/assets/stylesheets/**/_font-stacks.scss',
      './packages/core/node_modules/uswds/src/stylesheets/**/_variables.scss',
    ];

    return gulp
      .src(packages)
      .pipe(gulp.dest(file => {
        const packageName = file.path.match(/node_modules\/([a-zA-Z_]*)\//)[1];
        return `${config.vendorSrc}/${packageName}`;
      }));
  });

  gulp.task('sass:process-assets', () => processSass('packages/core/'));
  gulp.task('sass:process-docs', () => processSass('packages/docs/'));

  gulp.task('sass', done => {
    runSequence(
      'sass:clean-vendor',
      'sass:copy-vendor',
      [
        'sass:process-assets',
        'sass:process-docs'
      ],
      done
    );
  });
};
