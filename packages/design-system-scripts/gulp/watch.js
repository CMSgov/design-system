/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const browserSync = require('browser-sync');
const gulp = require('gulp');
const path = require('path');
const { logTask } = require('./common/logUtil');
const { compileSass, compileDocsSass } = require('./sass');
const { copyAll, compileJs } = require('./build');
const { extractReactDocs, generatePages, copySourceAssets, copyDocsAssets } = require('./docs');
const { runWebpackServer } = require('./docs/webpack');

async function watchSource(sourceDir, docsDir, options, browserSync) {
  const src = path.join(sourceDir, 'src');

  // Source package assets
  gulp.watch([`${src}/{images,fonts}/*`, `${src}/**/*.json`], async () => {
    await copyAll(sourceDir);
    await copySourceAssets(sourceDir, docsDir);
  });

  // Source package Sass files
  gulp.watch([`${src}/**/*.scss`, `!${src}/**/*.docs.scss`], async () => {
    await copyAll(sourceDir);
    await compileSass(sourceDir);
    await compileDocsSass(docsDir, options, browserSync);
  });

  // Source package React components and React props
  gulp.watch([`${src}/**/*.jsx`, `!${src}/**/*.test.{js,jsx}`], async () => {
    await compileJs(sourceDir);
    await extractReactDocs(sourceDir, docsDir, options);
    await generatePages(sourceDir, docsDir, options);
  });
}

async function watchDocs(sourceDir, docsDir, options, browserSync) {
  const src = path.join(docsDir, 'src');

  // Docs assets
  gulp.watch(`${src}/{images,fonts}/*`, async () => {
    await copyDocsAssets(docsDir);
  });

  // Docs Sass files
  gulp.watch(`${src}/**/*.scss`, async () => {
    await compileDocsSass(docsDir, options, browserSync);
  });

  // Docs Markdown files, KSS documentation files and HTML/React examples
  gulp.watch([`${src}/**/*.{md,mdx,docs.scss,html,jsx}`], async () => {
    await extractReactDocs(sourceDir, docsDir, options);
    await generatePages(sourceDir, docsDir, options);
  });
}

module.exports = {
  async watchDocs(sourceDir, docsDir, options) {
    logTask('👀 ', 'Transpiling + watching files for future changes');

    const sync = browserSync.create();
    await runWebpackServer(sourceDir, docsDir, options, sync);
    watchSource(sourceDir, docsDir, options, sync);
    watchDocs(sourceDir, docsDir, options, sync);
  },
};
