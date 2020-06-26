const gulp = require('gulp');
const streamPromise = require('./streamPromise');

function copyDir(srcDir, destDir) {
  return streamPromise(gulp.src(`${srcDir}/**/*`).pipe(gulp.dest(destDir)));
}

/**
 * Copy all fonts and images from one directory to another
 */
module.exports = async function copyAssets(srcDir, destDir) {
  await Promise.all([
    copyDir(`${srcDir}/fonts`, `${destDir}/fonts`),
    copyDir(`${srcDir}/images`, `${destDir}/images`),
  ]);
};
