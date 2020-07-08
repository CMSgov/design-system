const copyAssets = require('../common/copyAssets');
const del = require('del');
const gulp = require('gulp');
const path = require('path');
const rename = require('gulp-rename');
const streamPromise = require('../common/streamPromise');
const util = require('util');
const { getDocsDirs } = require('../common/getDirsToProcess');
const { logTask } = require('../common/logUtil');

/**
 * Copies all the fonts and images from the source package and the core design system package
 * In the case of a child DS, the source dir will already contain assets from the core npm package
 * from the `buildSrc` task that preceded `buildDocs`
 */
function copySourceAssets(sourceDir, docsDir) {
  logTask('🏞  ', `Copying fonts and images from source package into ${path.join(docsDir, 'dist')}`);
  // Handle rootPath when copying
  return copyAssets(path.join(sourceDir, 'dist'), path.join(docsDir, 'dist'));
}

/**
 * Copies all the fonts and images from our docs packages
 * Usually there will only be images in the docs package
 */
async function copyDocsAssets(docsDir) {
  logTask('🏞  ', `Copying fonts and images from docs packages into ${path.join(docsDir, 'dist')}`);
  // Handle rootPath when copying
  const docs = await getDocsDirs(docsDir);
  return Promise.all([
    docs.map((doc) => copyAssets(path.join(doc, 'src'), path.join(docsDir, 'dist'))),
  ]);
}

async function copyDownloadZip(sourceDir, docsDir) {
  logTask('📦 ', `Creating download zip for the source package`);

  // Run `npm pack` to create the download zip
  const exec = util.promisify(require('child_process').exec);
  await exec(`npm pack ${sourceDir}`);

  return streamPromise(
    gulp
      .src('./*.tgz')
      .pipe(
        rename((path) => {
          // Rename it to `download.tgz`
          path.basename = 'download';
        })
      )
      .pipe(gulp.dest(path.join(docsDir, 'dist')))
  ).then(() => {
    // Delete the original file
    del('./*.tgz');
  });
}

module.exports = {
  copySourceAssets,
  copyDocsAssets,
  copyDownloadZip,
};
