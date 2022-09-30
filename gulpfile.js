#!/usr/bin/env node

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
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const filter = require('gulp-filter');
const log = require('fancy-log');
const svgmin = require('gulp-svgmin');

// const createCdnWebpackConfig = require('./createCdnWebpackConfig');
// const ts = require('gulp-typescript');
// const util = require('util');
// const webpack = require('webpack');

const args = require('yargs/yargs')(process.argv.slice(2)).argv;

const corePackageFiles = 'packages/design-system/dist';
const willMinifySvg = args.minifySvg ?? false;
const rootPath = args.package ?? 'packages/design-system';
const isCore = rootPath.includes('design-system') ?? false;

const distPath = path.join(rootPath, 'dist');
const srcPath = path.join(rootPath, 'src');
const imageCorePath = path.join(corePackageFiles, 'images');
const sassCorePath = path.join(corePackageFiles, 'styles');
const fontsCorePath = path.join(corePackageFiles, 'fonts');

// const getSrcGlob = (src, changedPath) =>
//   changedPath
//     ? [changedPath]
//     : [
//         `${src}/**/*.{js,jsx,ts,tsx}`,
//         `!${src}/**/*{.test,.spec,.d,.stories}.{js,jsx,ts,tsx}`,
//         `!${src}/setupTests.{js,jsx,ts,tsx}`,
//         `!${src}/**/{__mocks__,__tests__}/**/*`,
//       ];

// /**
//  * Because we use babel to compile ts files, we have to compile twice to get definition files.
//  * This is necessary because the core CMSDS uses babel, but also needs definition files.
//  * TODO: Figure out how to use gulp-typescript for ts compilation as well
//  */
// async function generateTypeDefinitions(dir, changedPath) {
//   const src = path.join(dir, 'src', 'components');
//   const srcGlob = changedPath
//     ? [changedPath]
//     : [
//         `${src}/**/*.{ts,tsx}`,
//         `!${src}/**/*.{js,jsx}`,
//         `!${src}/setupTests.{js,jsx,ts,tsx}`,
//         `!${src}/**/*{.test,.spec,.d,.stories}.{js,jsx,ts,tsx}`,
//         `!${src}/**/{__mocks__,__tests__,helpers}/**/*`,
//       ];

//   const tsProject = ts.createProject('tsconfig.json', {
//     declaration: true,
//     allowJs: true,
//   });

//   const tsResult = gulp.src(srcGlob, { base: src }).pipe(tsProject());

//   return streamPromise(
//     tsResult.dts.pipe(gulp.dest(path.join(dir, 'dist', 'types'))).on('finish', function () {
//       logTask('📜 ', 'Typescript definition files generated');
//     })
//   );
// }

// /**
//  * Similar to compileJS but babel is configured for esmodules, only used in the core DS
//  */
// async function compileEsmJs(dir, changedPath) {
//   const src = path.join(dir, 'src', 'components');
//   const srcGlob = getSrcGlob(src, changedPath);

//   return streamPromise(
//     gulp
//       .src(srcGlob, { base: src })
//       .pipe(
//         babel({
//           presets: [
//             [
//               '@babel/preset-env',
//               {
//                 modules: false,
//               },
//             ],
//           ],
//         })
//       )
//       .on('error', (error) => {
//         logError('compileEsmJs', error);
//       })
//       .pipe(
//         rename((path) => {
//           if (path.dirname === '.' && path.basename === 'index') {
//             // Renames `component/index.js` to `esnext/index.esm.js`
//             path.extname = '.esm.js';
//           }
//         })
//       )
//       .pipe(gulp.dest(path.join(dir, 'dist', 'esnext')))
//       .on('finish', function () {
//         logTask('📜 ', 'ES module JS files processed');
//       })
//   );
// }

//     .then(() => {
//       // Compile ESM version of code
//       return compileEsmJs(dir, changedPath);
//     })
//     .then(() => {
//       // If design system is using typescript, use tsc to generate definition files for tsx files
//       const unknownOrTypescriptPath = !changedPath || changedPath.match(/\.(ts|tsx)$/);
//       if (options.typescript && unknownOrTypescriptPath) {
//         return generateTypeDefinitions(dir, changedPath);
//       }
//     });
// }

// async function bundleJs(dir) {
//   log('🚜 Running Webpack statically');
//   try {
//     const config = createCdnWebpackConfig(dir);
//     const stats = await util.promisify(webpack)(config); // Promisify webpack so the task will wait on the compilation to finish

//     // Log out any errors or warnings
//     log(stats.toString());
//   } catch (err) {
//     logError('webpack static', err.stack || err);
//     if (err.details) {
//       logError('webpack static', err.details);
//     }
//   }
// }

log('🏃 Starting design system build task');

/**
 * clean up dist folder if it exists
 */
const cleanDist = (cb) => {
  fs.rm(distPath, { recursive: true }, () => {
    cb();
  });
};
cleanDist.displayName = 'cleansing dist path';

/**
 * copy Sass files from src to dist, rename folder to 'scss'
 */
const copySass = (cb) => {
  const sassSourcePaths = isCore
    ? `${srcPath}/styles/**/*.scss`
    : [`${sassCorePath}/**/*.scss`, `${srcPath}/styles/**/*.scss`];
  gulp
    .src(sassSourcePaths)
    .pipe(gulp.dest(path.join(distPath, 'scss')))
    .on('end', cb);
};
copySass.displayName = 'copying scss assets and compiling sass in dist folder';

/**
 * compile sass assets to css, copy to /dist/css folder
 */

const compileSass = (cb) => {
  const envDev = process.env.NODE_ENV === 'development';

  const sassSourcePaths = isCore
    ? `${srcPath}/styles/**/*.scss`
    : [`${sassCorePath}/**/*.scss`, `${srcPath}/styles/**/*.scss`];
  const sassIncludePaths = !isCore ? [path.resolve(srcPath, '../../../node_modules')] : [];

  gulp
    .src(sassSourcePaths)
    .pipe(gulpif(envDev, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'expanded',
        includePaths: sassIncludePaths,
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
compileSass.displayName = 'compiling sass assets in dist to dist/css';

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
copyImages.displayName = 'copying images to dist folder with optional minification';

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
copyFonts.displayName = 'copying fonts to dist folder';

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
copyJSON.displayName = 'copying JSON data to dist folder';

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
    .src(jsSrcGlob, { base: srcPath })
    .pipe(babel())
    .on('error', (error) => {
      log.error('there was an error transpiling: ' + error);
    })
    .pipe(gulp.dest(distPath))
    .on('end', cb);
  // .then(() => {
  //   // If design system is using typescript, use tsc to generate definition files for tsx files
  //   const unknownOrTypescriptPath = !changedPath || changedPath.match(/\.(ts|tsx)$/);
  //   if (options.typescript && unknownOrTypescriptPath) {
  //     return generateTypeDefinitions(dir, changedPath);
  //   }
  // });
};
compileJs.displayName = 'compiling and copying js/ts assets to dist folder';

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

exports.build = gulp.series(
  cleanDist,
  gulp.parallel(copySass, copyImages, copyFonts, copyJSON),
  gulp.parallel(compileSass, compileJs, compileEsmJs)
);

//   async buildSrc(sourceDir, options) {
//     await compileJs(sourceDir, options);
//     await bundleJs(sourceDir);
//     if (process.env.NODE_ENV === 'production') {
//       await printStats(sourceDir, options);
//     }
//     logTask('✅ ', 'Build succeeded', true);
//     log('');
//   },
//   copyAssets,
//   copySass,
//   compileJs,
// };
