/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const copyAssets = require('../common/copyAssets');
const cleanDist = require('../common/cleanDist');
const generatePages = require('./generatePages');
const getPackageJson = require('../common/getPackageJson');
const gulp = require('gulp');
const merge = require('gulp-merge-json');
const parseReactFile = require('./parseReactFile');
const streamPromise = require('../common/streamPromise');
const { compileDocsSass } = require ('../sass');
const { getSourceDirs } = require('../common/getPackageDirs');
const { logTask, log } = require('../common/logUtil');
const { REACT_DATA_FILENAME, REACT_DATA_DIR } = require('../common/constants');
const { last } = require('lodash');
const { runWebpackStatically } = require('./runWebpackStatically');

/**
 * Parses our JSX files for relevant documentation information and stores it for
 * our other tasks to read later
 */
async function extractReactDocs(sourcePackageDir, rootPath) {
  logTask('🌪  ', 'Generating React propType documentation and grabbing raw example code');

  const sources = await getSourceDirs(sourcePackageDir);
  const sourcesGlob = `{${sources.map(dir => `${dir}/src`).join(',')}}`;

  return streamPromise(
    gulp
      .src([`${sourcesGlob}/**/*.jsx`, `!${sourcesGlob}/**/*.test.jsx`])
      .pipe(parseReactFile(rootPath))
      .pipe(merge({ fileName: REACT_DATA_FILENAME }))
      .pipe(gulp.dest(REACT_DATA_DIR))
  );
}

/**
 * Copies all the fonts and images from the source package and the core design system package
 * In the case of a child DS, the source dir will already contain assets from the core npm package
 * from the `buildSrc` task that preceded `buildDocs`
 */
function copySourcePackageAssets(sourcePackageDir, docsPackageDir) {
  logTask('🏞  ', `Copying fonts and images from source package into ${docsPackageDir}/dist`);
  return copyAssets(sourcePackageDir, docsPackageDir);
}

/**
 * Copies all the fonts and images from our docs packages
 * Usually there will only be images in the docs package
 */
function copyDocsPackageAssets(docsPackageDir) {
  logTask('🏞  ', `Copying fonts and images from docs packages into ${docsPackageDir}/dist`);
  return copyAssets(docsPackageDir);
}

module.exports = {
  /**
   * Builds the docs site
   *
   * Note that the source package must be built before this in order to ensure
   * that the documentation reflects the most recent version of the source.
   */
  async buildDocs(sourcePackageDir, docsPackageDir, options) {
    let message = 'Starting the documentation site generation task';
    if (options.rootPath !== '') {
      message += ` with a root path of ${options.rootPath}`;
    }
    logTask('🏃 ', message);


    // TODO: handle this in other tasks too
    const pkg = await getPackageJson(sourcePackageDir);
    if (!options.githubUrl) {
      options.githubUrl = `https://github.com/${pkg.repository}`;
    }

    await cleanDist(docsPackageDir);
    await extractReactDocs(sourcePackageDir, options.rootPath);
    await generatePages(sourcePackageDir, docsPackageDir, options);
    await copySourcePackageAssets(sourcePackageDir, docsPackageDir);
    await copyDocsPackageAssets(docsPackageDir);
    await runWebpackStatically(sourcePackageDir, docsPackageDir, options.rootPath);
    await compileDocsSass(docsPackageDir, options.rootPath)
    logTask('✅ ', 'Docs generation succeeded');
    log('');
  },
  extractReactDocs,
  generatePages,
  copySourcePackageAssets,
  copyDocsPackageAssets,
};
