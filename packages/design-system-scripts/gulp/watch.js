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
const {
  extractReactDocs,
  generatePages,
  copySourcePackageAssets,
  copyDocsPackageAssets,
} = require('./docs');
const { runWebpackServer } = require('./docs/webpack');

async function watchSourcePackage(sourcePackageDir, docsPackageDir, options, browserSync) {
  const src = path.join(sourcePackageDir, 'src');

  // Source package assets
  gulp.watch([`${src}/{images,fonts}/*`, `${src}/**/*.json`], async () => {
    await copyAll(sourcePackageDir);
    await copySourcePackageAssets(sourcePackageDir, docsPackageDir);
  });

  // Source package Sass files
  gulp.watch([`${src}/**/*.scss`, `!${src}/**/*.docs.scss`], async () => {
    await copyAll(sourcePackageDir);
    await compileSass(sourcePackageDir);
    await compileDocsSass(docsPackageDir, options, browserSync);
  });

  // Source package HTML/React examples and KSS documentation files
  gulp.watch([`${src}/**/*.example.{ejs,html,jsx}`, `${src}/**/*.docs.scss`], async () => {
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });

  // Source package React components and examples
  gulp.watch([`${src}/**/*.jsx`, `!${src}/**/*.test.{js,jsx}`], async () => {
    await extractReactDocs(sourcePackageDir, options);
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });
}

async function watchDocsPackage(sourcePackageDir, docsPackageDir, options, browserSync) {
  const src = path.join(docsPackageDir, 'src');

  // Docs assets
  gulp.watch(`${src}/{images,fonts}/*`, async () => {
    await copyDocsPackageAssets(docsPackageDir);
  });

  // Docs components
  gulp.watch(`${src}/scripts/**/.{js|jsx}`, async () => {
    // Rebuild the doc pages when the docs site js source is updated
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });

  // Docs Sass files
  gulp.watch(`${src}/**/*.scss`, async () => {
    await compileDocsSass(docsPackageDir, options, browserSync);
  });

  // Docs Markdown files
  gulp.watch([`${src}/pages/**/*.{md,mdx}`, `${src}/pages/**/*.docs.scss`], async () => {
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });
}

module.exports = {
  async watchDocs(sourcePackageDir, docsPackageDir, options) {
    logTask('👀 ', 'Transpiling + watching files for future changes');

    const sync = browserSync.create();
    await runWebpackServer(sourcePackageDir, docsPackageDir, options, sync);
    watchSourcePackage(sourcePackageDir, docsPackageDir, options, sync);
    watchDocsPackage(sourcePackageDir, docsPackageDir, options, sync);
  },
};
