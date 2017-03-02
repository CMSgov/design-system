'use strict';

const count = require('gulp-count');
const cssnano = require('cssnano');
const del = require('del');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');

const config = {
  vendorSrc: 'packages/core/src/vendor'
};

module.exports = (gulp, shared) => {
  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function processSass(cwd) {
    const sassCompiler = sass({
      outputStyle: 'expanded',
      includePaths: [`${cwd}node_modules`]
    });

    const postcssPlugins = [
      postcssImport(), // inline imports
      autoprefixer(),  // add any necessary vendor prefixes
      cssnano()        // minify css
    ];

    return gulp
      .src(`${cwd}src/**/*.scss`)
      .pipe(sassCompiler)
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
