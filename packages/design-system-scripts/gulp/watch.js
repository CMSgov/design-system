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
const { copyAll } = require('./build');
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

  // Source package HTML/React examples and KSS documentation files
  gulp.watch([`${src}/**/*.example.{ejs,html,jsx}`, `${src}/**/*.docs.scss`], async () => {
    await generatePages(sourceDir, docsDir, options);
  });

  // Source package React components and examples
  gulp.watch([`${src}/**/*.jsx`, `!${src}/**/*.test.{js,jsx}`], async () => {
    await extractReactDocs(sourceDir, options);
    await generatePages(sourceDir, docsDir, options);
  });
}

async function watchDocs(sourceDir, docsDir, options, browserSync) {
  const src = path.join(docsDir, 'src');

  // Docs assets
  gulp.watch(`${src}/{images,fonts}/*`, async () => {
    await copyDocsAssets(docsDir);
  });

  // Docs components
  gulp.watch(`${src}/scripts/**/.{js|jsx}`, async () => {
    // Rebuild the doc pages when the docs site js source is updated
    await generatePages(sourceDir, docsDir, options);
  });

  // Docs Sass files
  gulp.watch(`${src}/**/*.scss`, async () => {
    await compileDocsSass(docsDir, options, browserSync);
  });

  // Docs Markdown files
  gulp.watch([`${src}/pages/**/*.{md,mdx}`, `${src}/pages/**/*.docs.scss`], async () => {
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
