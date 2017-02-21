'use strict';

const cssnano = require('cssnano');
const del = require('del');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const runSequence = require('run-sequence');

const config = {
  vendorSrc: 'src/styles/vendor'
};

module.exports = (gulp) => {
  gulp.task('sass:clean-vendor', () => {
    return del(config.vendorSrc);
  });

  // Copy 3rd-party Sass dependencies into a "vendor" subdirectory
  gulp.task('sass:copy-vendor', () => {
    var packages = [
      './node_modules/bourbon/app/assets/stylesheets/**/_font-stacks.scss',
      './node_modules/uswds/src/stylesheets/**/_variables.scss',
    ];

    return gulp
      .src(packages)
      .pipe(gulp.dest(file => {
        const packageName = file.path.match(/node_modules\/([a-zA-Z_]*)\//)[1];
        return `${config.vendorSrc}/${packageName}`;
      }));
  });

  // Lint Sass files using stylelint. Further configuration for CSS linting
  // can be handled in stylelint.config.js
  gulp.task('sass:lint', () => {
    return gulp
      .src('src/styles/**/*.scss')
      .pipe(stylelint({
        failAfterError: false,
        reporters: [
          { formatter: 'string', console: true },
        ],
        syntax: 'scss',
      }));
  });

  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  gulp.task('sass:process', () => {
    const sassCompiler = sass({
      outputStyle: 'expanded'
    });

    const postcssPlugins = [
      postcssImport(), // inline imports
      autoprefixer(),  // add any necessary vendor prefixes
      cssnano()        // minify css
    ];

    return gulp
      .src('src/styles/**/*.scss')
      .pipe(sassCompiler)
      .pipe(postcss(postcssPlugins))
      .pipe(gulp.dest('dist/styles'));
  });

  // Run all of the above tasks in a sequence
  gulp.task('sass', done => {
    runSequence(
      'sass:clean-vendor',
      'sass:copy-vendor',
      [
        'sass:lint',
        'sass:process'
      ],
      done
    );
  });
};
