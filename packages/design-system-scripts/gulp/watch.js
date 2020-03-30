/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const { logTask } = require('./common/logUtil');
const { compileSass, compileDocsSass } = require('./sass');
const {
  extractReactDocs,
  generatePages,
  copySourcePackageAssets,
  copyDocsPackageAssets
} = require('./docs');
const { runWebpackServer } = require('./docs/webpack');

async function watchSourcePackage(sourcePackageDir, docsPackageDir, options, browserSync) {
  // Source package assets
  gulp.watch(`${sourcePackageDir}/src/{images,fonts}/*`, async () => {
    await copySourcePackageAssets(sourcePackageDir, docsPackageDir);
  });

  // Source package Sass files
  gulp.watch(`${sourcePackageDir}/src/**/*.scss`, async () => {
    await compileSass(sourcePackageDir, docsPackageDir, browserSync);
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });

  // Source package HTML/EJS examples
  gulp.watch(`${sourcePackageDir}/src/**/*.example.{ejs,html}`, async () => {
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });

  // Source package React components and examples
  gulp.watch(
    [`${sourcePackageDir}/src/**/*.{js,jsx}`, `!${sourcePackageDir}/src/**/*.test.{js,jsx}`],
    async () => {
      await extractReactDocs(sourcePackageDir, options.rootPath);
      await generatePages(sourcePackageDir, docsPackageDir, options);
    }
  );
}

async function watchDocsPackage(sourcePackageDir, docsPackageDir, options, browserSync) {
  // Docs assets
  gulp.watch(`${docsPackageDir}/src/{images,fonts}/*`, async () => {
    await copyDocsPackageAssets(docsPackageDir);
  });

  // Docs Sass files
  gulp.watch(`${docsPackageDir}/src/**/*.scss`, async () => {
    await compileDocsSass(docsPackageDir, options.rootPath, browserSync);
  });

  // Docs Markdown files
  gulp.watch(`${docsPackageDir}/src/pages/**/*.{md,mdx}`, async () => {
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
  }
};
