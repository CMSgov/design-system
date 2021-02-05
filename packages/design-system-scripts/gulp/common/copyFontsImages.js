const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const streamPromise = require('./streamPromise');

function copyDir(srcGlob, dest) {
  return streamPromise(gulp.src(srcGlob).pipe(gulp.dest(dest)));
}

function minimizeSvg(srcGlob, dest) {
  return streamPromise(
    gulp
      .src(srcGlob)
      .pipe(
        svgmin({
          plugins: [
            {
              cleanupIDs: false,
            },
            {
              removeTitle: false,
            },
            {
              removeDesc: false,
            },
            {
              removeHiddenElems: false,
            },
            {
              removeUnknownsAndDefaults: {
                keepRoleAttr: true,
              },
            },
          ],
        })
      )
      .pipe(gulp.dest(dest))
  );
}

/**
 * Copy all fonts and images from one directory to another
 */
module.exports = async function copyFontsImages(srcDir, destDir, minifySvg = false) {
  const svgTask = minifySvg
    ? minimizeSvg(`${srcDir}/images/**/*.svg`, `${destDir}/images`)
    : copyDir([`${srcDir}/images/**/*.svg`], `${destDir}/images`);

  await Promise.all([
    copyDir(`${srcDir}/fonts/**/*`, `${destDir}/fonts`),
    copyDir([`${srcDir}/images/**/*`, `!${srcDir}/images/**/*.svg`], `${destDir}/images`),
    svgTask,
  ]);
};
