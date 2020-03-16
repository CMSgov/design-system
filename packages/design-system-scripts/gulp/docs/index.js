/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const copyAssets = require('./common/copyAssets');
const copyDir = require('./common/copyDir');
const cleanDist = require('./common/cleanDist');
const del = require('del');
const generatePages = require('./generatePages');
const getDocsDistPath = require('../common/getDocsDistPath');
const getPackageName = require('./common/getPackageName');
const merge = require('gulp-merge-json');
const parseReactFile = require('./parseReactFile');
const path = require('path');
const streamPromise = require('../common/streamPromise');
const { CORE_PACKAGE_NAME } = require('./common/constants');
const { last } = require('lodash');
const { logTask } = require('../common/logUtil');

const reactDataDirectory = `tmp/data`;
const reactDataFilename = 'react-doc.json';
const reactDataPath = path.resolve(reactDataDirectory, reactDataFilename);

/**
 * Parses our JSX files for relevant documentation information and stores it for
 * our other tasks to read later
 */
async function extractReactDocs(sourcePackageDir, rootPath) {
  logTask('🌪 ', 'Generating React propType documentation and grabbing raw example code');

  const sources = [`${sourcePackageDir}/src`];
  const packageName = await getPackageName(sourcePackageDir);
  if (packageName !== CORE_PACKAGE_NAME) {
    sources.push(`node_modules/${CORE_PACKAGE_NAME}/src`);
  }
  const sourcesGlob = `{${sources.join(',')}}`;

  return gulp
    .src([`${sourcesGlob}/**/*.jsx`, `!${sourcesGlob}/**/*.test.jsx`])
    .pipe(parseReactFile(rootPath))
    .pipe(merge({ fileName: reactDataFilename }))
    .pipe(gulp.dest(reactDataDirectory));
}

/**
 * Copies all the fonts and images from the source package and the core design system package
 */
function copySourcePackageAssets(sourcePackageDir, docsPackageDir) {
  logTask('🏞 ', `Copying fonts and images from source package into ${docsPackageDir}/dist`);
  return copyAssets(sourcePackageDir, docsPackageDir);
}

/**
 * Copies all the images from our docs packages
 */
async function copyDocsImages(docsPackageDirs) {
  const docsPackageDir = last(docsPackageDirs);
  logTask('🏞 ', `Copying images from docs packages into ${docsPackageDir}/dist`);
  const dest = `${docsPackageDir}/dist/images`;
  for (const pkgDir of docsPackageDirs) {
    await copyDir(`${pkgDir}/src/images`, dest);
  }
}

module.exports = {
  async buildDocs(sourcePackageDir, docsPackageDirs, rootPath) {
    let message = 'Starting the documentation generation task';
    if (rootPath !== '') {
      message += ` with a root path of ${rootPath}`;
    }
    logTask('🏃 ', message);

    // This is the docs package that we will receive the output dist folder.
    const docsPackageDir = last(docsPackageDirs);

    await cleanDist(`${docsPackageDir}/dist`);
    await extractReactDocs(sourcePackageDir, rootPath);
    await generatePages(sourcePackageDir, docsPackageDirs, rootPath);
    await copySourcePackageAssets(sourcePackageDir, docsPackageDir);
    await copyDocsImages(docsPackageDirs);
  }
};
