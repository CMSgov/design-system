/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const copyAssets = require('../common/copyAssets');
const cleanDist = require('../common/cleanDist');
const generatePages = require('./generatePages');
const path = require('path');
const { compileDocsSass } = require('../sass');
const { extractReactData } = require('./extractReactData');
const { getDocsDirs } = require('../common/getDirsToProcess');
const { logTask, log } = require('../common/logUtil');
const { runWebpackStatically, runWebpackServer } = require('./webpack');

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

module.exports = {
  /**
   * Builds the docs site
   *
   * Note that the source package must be built before this in order to ensure
   * that the documentation reflects the most recent version of the source.
   */
  async buildDocs(sourceDir, docsDir, options, sync) {
    let message = 'Starting the documentation site generation task';
    if (options.rootPath !== '') {
      message += ` with a root path of ${options.rootPath}`;
    }
    logTask('🏃 ', message);

    await cleanDist(docsDir);
    await copySourceAssets(sourceDir, docsDir);
    await copyDocsAssets(docsDir);
    await extractReactData(sourceDir, docsDir, options);
    await generatePages(sourceDir, docsDir, options);
    await runWebpackStatically(sourceDir, docsDir, options);
    if (process.env.NODE_ENV === 'development' && sync) {
      // Use a webpack server for rebuilding files in development
      await runWebpackServer(sourceDir, docsDir, options, sync);
    }
    await compileDocsSass(docsDir, options, sync);
    logTask('✅ ', 'Docs generation succeeded');
    log('');
  },
  generatePages,
  copySourceAssets,
  copyDocsAssets,
};
