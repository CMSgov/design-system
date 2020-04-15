const gulp = require('gulp');
const streamPromise = require('./streamPromise');

module.exports = function copyDir(srcDir, destDir) {
  return streamPromise(gulp.src(`${srcDir}/**/*`).pipe(gulp.dest(destDir)));
};
