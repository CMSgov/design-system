'use strict';

const autoprefixer = require('autoprefixer');
const getDocsDistPath = require('./common/getDocsDistPath');
const changed = require('gulp-changed');
const count = require('gulp-count');
const cssnano = require('cssnano');
const dutil = require('./common/log-util');
const path = require('path');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssInliner = require('postcss-image-inliner');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('gulp4-run-sequence');

module.exports = (gulp, shared) => {
  const { env, browserSync, sourcePackageDir, docsPath, rootPath } = shared;

  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function processSass(dir) {
    const src = path.join(dir, 'src');
    const srcFiles = path.join(src, '**', '*.scss');
    const dest = path.join(dir, 'dist');

    const createSourcemaps = env === 'development';
    const sassCompiler = sass({
      outputStyle: 'expanded',
      includePaths: [path.resolve('dir', 'node_modules'), src]
    }).on('error', function(err) {
      dutil.logError('sass', 'Error transpiling Sass!');
      dutil.logData(err.messageFormatted);
      this.emit('end');
    });

    const postcssPlugins = [
      postcssImport(), // inline imports
      autoprefixer() // add any necessary vendor prefixes
    ];

    if (env !== 'development') {
      postcssPlugins.push(cssnano()); // minify css
    }

    if (!dir.match(/\/docs\//)) {
      // inline/base64 images
      postcssPlugins.push(
        postcssInliner({
          assetPaths: [path.resolve(dir, 'images')],
          strict: true
        })
      );
    }

    let stream = gulp
      .src(srcFiles)
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
      .pipe(
        count({
          message: `## Sass files processed in ${dir}`,
          logger: message => dutil.logMessage('👓 ', message)
        })
      );

    if (browserSync) {
      // Auto-inject into docs
      stream = stream.pipe(
        browserSync,
        browserSync.stream({ match: '**/public/styles/*.css' })
      );
    }

    return stream;
  }

  gulp.task('sass:src', () => processSass(sourcePackageDir));

  gulp.task('sass:docs', () =>
    processSass('packages/docs/', getDocsDistPath(docsPath, rootPath, '/public'))
  );

  gulp.task('sass', done => {
    runSequence('sass:src', 'sass:docs', done);
  });
};
