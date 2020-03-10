'use strict';

const autoprefixer = require('autoprefixer');
const buildPath = require('../common/buildPath');
const changed = require('gulp-changed');
const count = require('gulp-count');
const cssnano = require('cssnano');
const dutil = require('../common/log-util');
const path = require('path');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssInliner = require('postcss-image-inliner');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('gulp4-run-sequence');
const themeImporter = require('./themeImporter');

module.exports = (gulp, shared) => {
  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function processSass(cwd, dest) {
    const createSourcemaps = shared.env === 'development';
    const sassCompiler = sass({
      outputStyle: 'expanded',
      importer: themeImporter.bind(null, shared.packages),
      includePaths: [`${cwd}node_modules`, `packages/cmsds/src`]
    }).on('error', function(err) {
      dutil.logError('sass', 'Error transpiling Sass!');
      dutil.logData(err.messageFormatted);
      this.emit('end');
    });

    const postcssPlugins = [
      postcssImport(), // inline imports
      autoprefixer() // add any necessary vendor prefixes
    ];

    if (shared.env !== 'development') {
      postcssPlugins.push(cssnano()); // minify css
    }

    if (!cwd.match(/\/docs\//)) {
      // inline/base64 images
      postcssPlugins.push(
        postcssInliner({
          assetPaths: [
            path.resolve(__dirname, '../../../', cwd, 'images'),
            path.resolve(__dirname, '../../../', 'packages/cmsds/images')
          ],
          strict: true
        })
      );
    }

    return gulp
      .src(`${cwd}src/**/*.scss`)
      .pipe(
        changed(dest, {
          extension: '.css',
          // compare contents so files that import the updated file also get piped through
          hasChanged: changed.compareSha1Digest
        })
      )
      .pipe(gulpIf(createSourcemaps, sourcemaps.init()))
      .pipe(sassCompiler)
      .pipe(gulpIf(createSourcemaps, sourcemaps.write()))
      .pipe(postcss(postcssPlugins))
      .pipe(gulp.dest(dest))
      .pipe(count(`## Sass files processed in ${cwd}`))
      .pipe(shared.browserSync.stream({ match: '**/public/styles/*.css' })); // Auto-inject into docs
  }

  // Form tasks for each package...
  const processPackageTasks = shared.packages.map(pkg => `sass:process:${pkg}`);
  shared.packages.forEach((pkg, i) => {
    return gulp.task(processPackageTasks[i], () => {
      return processSass(`packages/${pkg}/`, `packages/${pkg}/dist`);
    });
  });

  gulp.task('sass:process:docs', () =>
    processSass('packages/docs/', buildPath(shared.docsPath, shared.rootPath, '/public'))
  );

  gulp.task('sass', done => {
    runSequence(processPackageTasks, 'sass:process:docs', done);
  });
};
