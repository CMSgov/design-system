const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const rename = require('gulp-rename');
const sass = gulpSass(dartSass);
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const filter = require('gulp-filter');
const log = require('fancy-log');
const svgmin = require('gulp-svgmin');
const webpack = require('webpack-stream');
const { ProvidePlugin } = require('webpack');

/*
 * command line arguments and global variables
 */
const args = require('yargs/yargs')(process.argv.slice(2)).argv;
const willMinifySvg = args.minifySvg ?? false;
const rootPath = args.package ?? 'packages/design-system';
const isCore = rootPath.includes('design-system') ?? false;

const corePackageFiles = 'packages/design-system/dist';
const distPath = path.join(rootPath, 'dist');
const srcPath = path.join(rootPath, 'src');
const imageCorePath = path.join(corePackageFiles, 'images');
const sassCorePath = path.join(corePackageFiles, 'styles');
const fontsCorePath = path.join(corePackageFiles, 'fonts');

/**
 * clean up dist folder if it exists
 */
const cleanDist = (cb) => {
  if (fs.existsSync(distPath)) {
    fs.readdirSync(distPath, (err, files) => {
      files.forEach((f) => {
        // don't clean out the scss folder that was just created
        if (f !== 'scss') fs.rm(f, { recursive: true });
      });
    });
  }
  cb();
};
cleanDist.displayName = '🧹 cleaning up dist path';

/**
 * Copy theme files from styles/themes to dist
 */
const copyThemes = (cb) => {
  const themeFiles = `${srcPath}/styles/*-theme.css`;

  gulp
    .src(themeFiles)
    .pipe(gulp.dest(path.join(distPath, 'css')))
    .on('end', cb);
};

copyThemes.displayName = '📎 copying themes to dist/css folder';
/**
 * compile sass assets to css, copy to /dist/css folder
 */
const compileSass = (cb) => {
  const envDev = process.env.NODE_ENV === 'development';

  const sassSourcePaths = isCore
    ? `${srcPath}/styles/**/*.scss`
    : [`${sassCorePath}/**/*.scss`, `${srcPath}/styles/**/*.scss`];

  gulp
    .src(sassSourcePaths)
    .pipe(gulpif(envDev, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(gulpif(envDev, sourcemaps.write()))
    .pipe(
      postcss([
        postcssImport(), // inline imports
        autoprefixer(), // add any necessary vendor prefixes
        ...(!envDev ? [cssnano()] : []), // minify css
      ])
    )
    .pipe(gulp.dest(path.join(distPath, 'css')))
    .on('end', cb);
};
compileSass.displayName = '🖍  compiling sass assets in dist to dist/css';

/**
 * copy image assets, minify svg files if necessary
 */
const copyImages = (cb) => {
  // non-core packages get core image assets as well
  const imageSourcePaths = isCore
    ? `${srcPath}/images/**/*`
    : [`${imageCorePath}/**/*`, `${srcPath}/images/**/*`];
  const filtered = filter(`**/*.svg`, { restore: true });

  gulp
    .src(imageSourcePaths)
    .pipe(filtered) // we filter out svgs and minify if necessary
    .pipe(
      gulpif(
        willMinifySvg,
        svgmin({
          plugins: [
            { cleanupIDs: false },
            { removeTitle: false },
            { removeDesc: false },
            { removeHiddenElems: false },
            { removeUnknownsAndDefaults: { keepRoleAttr: true } },
          ],
        })
      )
    )
    .pipe(filtered.restore) // then restore full glob for copying
    .pipe(gulp.dest(path.join(distPath, 'images')))
    .on('end', cb);
};
copyImages.displayName = '🖼  copying images to dist folder with optional minification';

/**
 * copy font files to dist folder
 */
const copyFonts = (cb) => {
  // non-core packages get core font assets as well
  const fontSourcePaths = isCore
    ? `${srcPath}/fonts/**/*`
    : [`${srcPath}/fonts/**/*`, `${fontsCorePath}/**/*`];

  gulp
    .src(fontSourcePaths)
    .pipe(gulp.dest(path.join(distPath, 'fonts')))
    .on('end', cb);
};
copyFonts.displayName = '📎 copying fonts to dist folder';

/**
 * copy json files (internationalization) to dist/components, dist/esnext & dist/types
 */
const copyJSON = (cb) => {
  gulp
    .src(`${srcPath}/components/**/*.json`)
    .pipe(gulp.dest(path.join(distPath, 'components')))
    .pipe(gulp.dest(path.join(distPath, 'esnext')))
    .pipe(gulp.dest(path.join(distPath, 'types')))
    .on('end', cb);
};
copyJSON.displayName = '📎 copying JSON data to dist folder';

/*
 * jsSrcGlob used to create ts definitions and transpile to js, esnext
 */
const jsSrcGlob = [
  `${srcPath}/components/**/*.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/**/*{.test,.spec,.d,.stories}.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/setupTests.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/**/{__mocks__,__tests__}/**/*`,
];

/**
 * compiles typescript and javascript and copies to dist
 */
const compileJs = (cb) => {
  gulp
    .src(jsSrcGlob, { base: `${srcPath}/components` })
    .pipe(babel())
    .on('error', (error) => {
      log.error('there was an error transpiling: ' + error);
    })
    .pipe(gulp.dest(path.join(distPath, 'components')))
    .on('end', cb);
};
compileJs.displayName = '🔧 compiling and copying js/ts assets to dist folder';

/*
 * compiles typescript and javascript to esm modules and copies to dist
 */
const compileEsmJs = (cb) => {
  gulp
    .src(jsSrcGlob, { base: `${srcPath}/components` })
    .pipe(
      babel({
        presets: [['@babel/preset-env', { modules: false }]],
      })
    )
    .on('error', (error) => {
      log.error('there was an error transpiling to esm: ' + error);
    })
    .pipe(
      rename((path) => {
        if (path.dirname === '.' && path.basename === 'index') {
          // Renames `component/index.js` to `esnext/index.esm.js`
          path.extname = '.esm.js';
        }
      })
    )
    .pipe(gulp.dest(path.join(distPath, 'esnext')))
    .on('end', cb);
};
compileEsmJs.displayName = '🔨 compiling esm modules';

/*
 *  create typescript definition files for the package
 */
const compileTypescriptDefs = (cb) => {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    allowJs: true,
  });

  const tsResult = gulp.src(jsSrcGlob, { base: `${srcPath}/components` }).pipe(tsProject());

  tsResult.dts.pipe(gulp.dest(path.join(distPath, 'types'))).on('finish', cb);
};
compileTypescriptDefs.displayName = '⛓  generating typescript definition files';

/*
 * bundle javascript for CDN
 */
const bundleJs = (cb) => {
  const entry = path.resolve(distPath, 'esnext', 'web-components', 'index.js');
  gulp
    .src(entry)
    .pipe(
      webpack({
        output: {
          filename: 'bundle.js',
          // Expose all the index file's exports as a "DesignSystem" global object
          library: 'DesignSystem',
        },
        mode: process.env.NODE_ENV || 'production',
        // Don't bundle preact because our customers need to interact with it directly
        // in order to use our components, and we don't expose it in our code. They
        // should instead load the preact umd module before loading our bundle.
        // externals: {
        //   preact: 'preact',
        // },
        plugins: [
          new ProvidePlugin({
            h: ['preact', 'h'],
            Fragment: ['preact', 'Fragment'],
          }),
        ],
        resolve: {
          alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat', // Must be below test-utils
            'react/jsx-runtime': 'preact/jsx-runtime',
          },
        },
      })
    )
    .pipe(gulp.dest(`${distPath}/js`))
    .on('end', cb);
};
bundleJs.displayName = '💼 bundling cmsds for cdn with webpack';

/*
 * copies react bundles currently installed into cdn dist folder
 */
const copyReactToDist = (cb) => {
  const nodeModules = path.resolve(srcPath, '../../../node_modules');

  gulp
    .src([
      // `${nodeModules}/react/umd/react.production.min.js`,
      // `${nodeModules}/react-dom/umd/react-dom.production.min.js`,
      `${nodeModules}/preact/dist/preact.min.umd.js`,
      `${nodeModules}/preact/dist/preact.umd.js`,
      `${nodeModules}/preact/dist/preact.umd.js.map`,
    ])
    .pipe(gulp.dest(`${distPath}/js`))
    .on('end', cb);
};
copyReactToDist.displayName = '📦 copying react bundles to cdn dist folder';

/*
 * displays help if run without any options
 */
const displayHelp = (cb) => {
  log();
  log('usage:');
  log('yarn gulp build <params>');
  log('  --package <cmsds system/child system path> // i.e. packages/ds-healthcare-gov');
  log('  --minifySvg // will enable svg minification during image asset copying');
  log();
  cb();
};

/*
 * build command which runs compilation process
 */
log('🪴 building the cmsds');
exports.build = gulp.series(
  cleanDist,
  gulp.parallel(copyThemes, copyImages, copyFonts, copyJSON),
  gulp.parallel(compileSass, compileJs, compileEsmJs, compileTypescriptDefs),
  gulp.parallel(bundleJs, copyReactToDist)
);

/*
 * command line help
 */
exports.default = displayHelp;
