/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const cleanDist = require('../common/cleanDist');
const generatePages = require('./generatePages');
const { copySourceAssets, copyDocsAssets, copyDownloadZip } = require('./assets');
const { compileDocsSass } = require('../sass');
const { extractReactData } = require('./extractReactData');
const { logTask, log } = require('../common/logUtil');
const { runWebpackStatically } = require('./webpack');

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
    await copySourceAssets(sourceDir, docsDir);
    await copyDocsAssets(docsDir);
    await copyDownloadZip(sourceDir, docsDir);
    await extractReactData(sourceDir, docsDir, options);
    await generatePages(sourceDir, docsDir, options);
    await compileDocsSass(docsDir, options);
    await runWebpackStatically(sourceDir, docsDir, options);
    logTask('✅ ', 'Docs generation succeeded');
    log('');
  },
  generatePages,
  copySourceAssets,
  copyDocsAssets,
};
