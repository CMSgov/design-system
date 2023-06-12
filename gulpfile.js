const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
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
const generateWebpackConfig = require('./webpack.config');

/*
 * command line arguments and global variables
 */
const args = require('yargs/yargs')(process.argv.slice(2)).argv;
const willMinifySvg = args.minifySvg ?? false;
const rootPath = args.package ?? path.join('packages', 'design-system');
const isCore = rootPath.includes('design-system') ?? false;

const corePackageFiles = path.join('packages', 'design-system', 'dist');
const distPath = path.join(rootPath, 'dist');
const distReactComponents = path.join(distPath, 'react-components');
const distPreactComponents = path.join(distPath, 'preact-components');
const distWebComponents = path.join(distPath, 'web-components');
const srcPath = path.join(rootPath, 'src');
const imageCorePath = path.join(corePackageFiles, 'images');
const sassCorePath = path.join(corePackageFiles, 'styles');
const fontsCorePath = path.join(corePackageFiles, 'fonts');

const nameTask = (fn, displayName) => {
  fn.displayName = displayName;
  return fn;
};

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
    .pipe(sass({ outputStyle: 'expanded' }))
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
compileSass.displayName = '🖍  compiling sass into css';

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
    .pipe(gulp.dest(path.join(distReactComponents, 'cjs')))
    .pipe(gulp.dest(path.join(distReactComponents, 'esm')))
    .pipe(gulp.dest(path.join(distReactComponents, 'types')))
    .pipe(gulp.dest(path.join(distPreactComponents, 'cjs')))
    .pipe(gulp.dest(path.join(distPreactComponents, 'esm')))
    .pipe(gulp.dest(path.join(distPreactComponents, 'types')))
    .on('end', cb);
};
copyJSON.displayName = '📎 copying json data to dist folder';

/*
 * jsSrcGlob used to create ts definitions and transpile to js, esnext
 */
const jsSrcGlob = [
  `${srcPath}/components/**/*.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/**/*{.test,.test.interaction,.spec,.d,.stories}.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/setupTests.{js,jsx,ts,tsx}`,
  `!${srcPath}/components/**/{__mocks__,__tests__}/**/*`,
];

const preactAliases = {
  react: 'preact/compat',
  'react-dom': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
};
const preactTsConfig = {
  paths: {
    react: [require.resolve('preact/compat')],
    'react-dom': [require.resolve('preact/compat')],
  },
};
const preactBabelConfig = { plugins: [['module-resolver', { alias: preactAliases }]] };

const esmBabelConfig = { presets: [['@babel/preset-env', { modules: false }]] };
const cjsBabelConfig = { presets: [['@babel/preset-env', { modules: 'commonjs' }]] };

/**
 * Helper function that returns the actual task function to compile our source
 * TypeScript into a target format and drop it at the specified location.
 */
const compileJs = (options) => (cb) => {
  gulp
    .src(jsSrcGlob, { base: path.join(srcPath, 'components') })
    .pipe(babel(options.babelConfig))
    .on('error', (error) => {
      log.error('there was an error transpiling: ' + error);
    })
    .pipe(gulp.dest(options.dest))
    .on('end', cb);
};

// More helper functions for compiling JS into spefific formats
const compileCjs = (dest, babelConfig = {}) =>
  nameTask(
    compileJs({ dest, babelConfig: { ...cjsBabelConfig, ...babelConfig } }),
    `🔨 compiling typescript into cjs: ${path.relative(distPath, dest)}`
  );

const compileEsm = (dest, babelConfig = {}) =>
  nameTask(
    compileJs({
      dest,
      babelConfig: { ...esmBabelConfig, ...babelConfig },
    }),
    `🔨 compiling typescript into esm: ${path.relative(distPath, dest)}`
  );

/*
 *  create typescript definition files for the package
 */
const compileTypescriptDefs = (tsConfig = {}) =>
  nameTask((cb) => {
    const tsProject = ts.createProject('tsconfig.json', {
      declaration: true,
      allowJs: true,
      ...tsConfig,
    });

    gulp
      .src(jsSrcGlob, { base: path.join(srcPath, 'components') })
      .pipe(tsProject())
      // They put the definitions-file stream in a "dts" property
      .dts.pipe(gulp.dest(path.join(distReactComponents, 'types')))
      .on('finish', cb);
  }, '📖 generating typescript definition files');

/**
 * Helper function that returns the actual task function that bundles our
 * TypeScript source for distribution on the CDN
 */
const bundleJs = (options) => (cb) => {
  gulp
    .src(options.entryPath)
    .pipe(webpack(generateWebpackConfig(options)))
    .pipe(gulp.dest(options.dest))
    .on('end', cb);
};

const bundleReactComponents = bundleJs({
  entryPath: path.resolve(distReactComponents, 'esm', 'index.js'),
  dest: path.join(distReactComponents, 'bundle'),
});
bundleReactComponents.displayName = '📦 bundling react components for cdn distribution';

const bundlePreactComponents = bundleJs({
  entryPath: path.resolve(distPreactComponents, 'esm', 'index.js'),
  dest: path.join(distPreactComponents, 'bundle'),
  preact: true,
});
bundlePreactComponents.displayName = '📦 bundling preact components for cdn distribution';

const bundleWebComponents = bundleJs({
  entryPath: path.resolve(distPreactComponents, 'esm', 'web-components', 'index.js'),
  dest: path.join(distWebComponents, 'bundle'),
  preact: true,
  webComponents: true,
});
bundleWebComponents.displayName = '📦 bundling web components for cdn distribution';

const compileReactComponents = gulp.series(
  compileCjs(path.join(distReactComponents, 'cjs')),
  compileEsm(path.join(distReactComponents, 'esm')),
  compileTypescriptDefs(),
  bundleReactComponents
);

const compilePreactComponents = gulp.series(
  compileCjs(path.join(distPreactComponents, 'cjs'), preactBabelConfig),
  compileEsm(path.join(distPreactComponents, 'esm'), preactBabelConfig),
  // TODO: Re-enable when all components are functional components. TypeScript
  // is throwing 121 errors when we try to replace react with preact/compat,
  // and the components that are throwing the errors are all class components.
  // compileTypescriptDefs(preactTsConfig),
  bundlePreactComponents,
  bundleWebComponents
);

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
  gulp.parallel(compileSass, compileReactComponents, compilePreactComponents)
);

exports.preact = gulp.series(
  compileEsm(path.join(distPreactComponents, 'esm'), preactBabelConfig),
  bundleWebComponents
);

/*
 * command line help
 */
exports.default = displayHelp;
