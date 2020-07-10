const getSourcePattern = require('../../common/getSourcePattern');
const gulp = require('gulp');
const merge = require('gulp-merge-json');
const streamPromise = require('../../common/streamPromise');
const { getSourceDirs, getDocsDirs } = require('../../common/getDirsToProcess');
const { parseReactProps, parseReactExample } = require('./parseReactFile');
const { logTask } = require('../../common/logUtil');
const {
  REACT_PROP_DATA_FILENAME,
  REACT_EXAMPLE_DATA_FILENAME,
  REACT_DATA_DIR,
} = require('../../common/constants');

async function extractReactProps(sourceDir, options) {
  const sources = await getSourceDirs(sourceDir);
  const sourcesGlob = getSourcePattern(sources, 'src');

  return streamPromise(
    gulp
      .src([
        `${sourcesGlob}/**/*.{jsx,tsx}`, // React props
        `!${sourcesGlob}/**/*{.test,.spec}.{js,jsx,ts,tsx}`,
      ])
      .pipe(parseReactProps(options))
      .pipe(merge({ fileName: REACT_PROP_DATA_FILENAME }))
      .pipe(gulp.dest(REACT_DATA_DIR))
  );
}

async function extractReactExamples(docsDir, options) {
  const docs = await getDocsDirs(docsDir);
  const docsGlob = getSourcePattern(docs, 'src');

  return streamPromise(
    gulp
      .src([
        `${docsGlob}/**/*.example.{jsx,tsx}`, // React examples
      ])
      .pipe(parseReactExample(options))
      .pipe(merge({ fileName: REACT_EXAMPLE_DATA_FILENAME }))
      .pipe(gulp.dest(REACT_DATA_DIR))
  );
}

/**
 * Parses JSX files for prop documentation and example files and stores it for
 * our other tasks to read later
 */
async function extractReactData(sourceDir, docsDir, options) {
  logTask('🌪  ', 'Generating React propType documentation and grabbing raw example code');

  await extractReactProps(sourceDir, options);
  await extractReactExamples(docsDir, options);
}

module.exports = {
  extractReactData,
  extractReactProps,
  extractReactExamples,
};
