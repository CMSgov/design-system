/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const copyAssets = require('../common/copyAssets');
const copyDir = require('../common/copyDir');
const cleanDist = require('../common/cleanDist');
const generatePages = require('./generatePages');
const getSourcePattern = require('../common/getSourcePattern');
const gulp = require('gulp');
const path = require('path');
const merge = require('gulp-merge-json');
const parseReactFile = require('./parseReactFile');
const streamPromise = require('../common/streamPromise');
const { compileDocsSass } = require('../sass');
const { getSourceDirs, getDocsDirs } = require('../common/getDirsToProcess');
const { logTask, log } = require('../common/logUtil');
const { REACT_DATA_FILENAME, REACT_DATA_DIR } = require('../common/constants');
const { runWebpackStatically } = require('./webpack');

/**
 * Parses JSX files for prop documentation and example files and stores it for
 * our other tasks to read later
 */
async function extractReactDocs(sourceDir, docsDir, options) {
  logTask('🌪  ', 'Generating React propType documentation and grabbing raw example code');

  const sources = await getSourceDirs(sourceDir);
  const sourcesGlob = getSourcePattern(sources, 'src');
  const docs = await getDocsDirs(docsDir);
  const docsGlob = getSourcePattern(docs, 'src');

  return streamPromise(
    gulp
      .src([
        `${sourcesGlob}/**/*.jsx`,
        `!${sourcesGlob}/**/*.test.jsx`,
        `${docsGlob}/**/*.example.jsx`,
      ])
      .pipe(parseReactFile(options.rootPath, options.githubUrl))
      .pipe(merge({ fileName: REACT_DATA_FILENAME }))
      .pipe(gulp.dest(REACT_DATA_DIR))
  );
}

/**
 * Copies all the fonts and images from the source package and the core design system package
 * In the case of a child DS, the source dir will already contain assets from the core npm package
 * from the `buildSrc` task that preceded `buildDocs`
 */
function copySourceAssets(sourceDir, docsDir) {
  logTask('🏞  ', `Copying fonts and images from source package into ${path.join(docsDir, 'dist')}`);
  // Handle rootPath when copying
  return copyDir(path.join(sourceDir, 'dist'), path.join(docsDir, 'dist'));
}

/**
 * Copies all the fonts and images from our docs packages
 * Usually there will only be images in the docs package
 */
function copyDocsAssets(docsDir) {
  logTask('🏞  ', `Copying fonts and images from docs packages into ${path.join(docsDir, 'dist')}`);
  // Handle rootPath when copying
  return copyAssets(docsDir);
}

module.exports = {
  /**
   * Builds the docs site
   *
   * Note that the source package must be built before this in order to ensure
   * that the documentation reflects the most recent version of the source.
   */
  async buildDocs(sourceDir, docsDir, options) {
    let message = 'Starting the documentation site generation task';
    if (options.rootPath !== '') {
      message += ` with a root path of ${options.rootPath}`;
    }
    logTask('🏃 ', message);

    await cleanDist(docsDir);
    await extractReactDocs(sourceDir, docsDir, options);
    await generatePages(sourceDir, docsDir, options);
    await copySourceAssets(sourceDir, docsDir);
    await copyDocsAssets(docsDir);
    await runWebpackStatically(sourceDir, docsDir, options);
    await compileDocsSass(docsDir, options);
    logTask('✅ ', 'Docs generation succeeded');
    log('');
  },
  extractReactDocs,
  generatePages,
  copySourceAssets,
  copyDocsAssets,
};
