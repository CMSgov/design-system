'use strict';

const autoprefixer = require('autoprefixer');
const buildPath = require('./common/buildPath');
const changed = require('gulp-changed');
const count = require('gulp-count');
const cssnano = require('cssnano');
const del = require('del');
const dutil = require('./common/log-util');
const path = require('path');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssInliner = require('postcss-image-inliner');
const postcssUrl = require('postcss-url');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stringReplace = require('gulp-string-replace');
const runSequence = require('run-sequence');
const packagesRegex = require('./common/packagesRegex');

const config = {
  vendorSrc: 'packages/support/src/vendor'
};

module.exports = (gulp, shared) => {
  // The bulk of our Sass task. Transforms our Sass into CSS, then runs through
  // a variety of postcss processes (inlining, prefixing, minifying, etc).
  function processSass(cwd, dest) {
    const createSourcemaps = shared.env === 'development';
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

    if (shared.env !== 'development') {
      postcssPlugins.push(cssnano()); // minify css
    }

    if (cwd.match(/\/docs\//)) {
      // Update url() values to be relative to our rootPath
      if (shared.rootPath !== '') {
        postcssPlugins.push(postcssUrl({
          url: asset => `/${shared.rootPath}${asset.url}`
        }));
      }
    } else {
      // inline/base64 images
      postcssPlugins.push(postcssInliner({
        assetPaths: [path.resolve(__dirname, `../../${cwd}/src/`)],
        strict: true
      }));
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
      .pipe(shared.browserSync.stream({match: '**/public/styles/*.css'})); // Auto-inject into docs
  }

  // Empty the vendor directory to ensure unused files aren't kept around
  gulp.task('sass:clean-vendor', () => {
    return del(config.vendorSrc);
  });

  // Copy 3rd-party Sass dependencies into a "vendor" subdirectory so we can
  // distribute them along with our Sass files
  gulp.task('sass:copy-vendor', () => {
    var packages = [
      './packages/support/node_modules/uswds/src/stylesheets/**/_variables.scss'
    ];

    return gulp
      .src(packages)
      .pipe(gulp.dest(file => {
        const packageName = file.path.match(/node_modules\/([a-zA-Z_]*)\//)[1];
        return `${config.vendorSrc}/${packageName}`;
      }));
  });

  // Form tasks for each package...
  const processPackageTasks = shared.packages.map(pkg => `sass:process:${pkg}`);
  shared.packages.forEach((pkg, i) => {
    return gulp.task(processPackageTasks[i], () => {
      return processSass(
        `packages/${pkg}/`,
        `packages/${pkg}/dist`
      );
    });
  });

  gulp.task('sass:process:docs', () => processSass(
    'packages/docs/',
    buildPath(shared.rootPath, '/public')
  ));

  gulp.task('sass:add-version', () => {
    const packages = packagesRegex(shared.packages);

    return gulp
      .src(`./packages/${packages}/dist/index.css`)
      .pipe(stringReplace(/{{version}}/, shared.version))
      .pipe(gulp.dest('./packages/'));
  });

  gulp.task('sass', done => {
    runSequence(
      'sass:clean-vendor',
      'sass:copy-vendor',
      processPackageTasks,
      'sass:process:docs',
      'sass:add-version',
      done
    );
  });
};
