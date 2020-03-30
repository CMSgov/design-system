/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const { logTask } = require('./common/logUtil');
const { compileSass, compileDocsSass } = require('./sass');
const { copyAll, compileJs } = require('./build');
const {
  extractReactDocs,
  generatePages,
  copySourcePackageAssets,
  copyDocsPackageAssets
} = require('./docs');
const { runWebpackServer } = require('./docs/webpack');

async function watchSourcePackage(sourcePackageDir, docsPackageDir, options, browserSync) {
  // Source package assets
  gulp.watch([`${sourcePackageDir}/src/{images,fonts}/*`, `${sourcePackageDir}/src/**/*.json`], async () => {
    await copyAll(sourcePackageDir);
    await copySourcePackageAssets(sourcePackageDir, docsPackageDir);
  });

  // Source package Sass files
  gulp.watch([`${sourcePackageDir}/src/**/*.scss`, `!${sourcePackageDir}/src/**/*.docs.scss`], async () => {
    await copyAll(sourcePackageDir);
    await compileSass(sourcePackageDir);
    await compileDocsSass(docsPackageDir, options, browserSync);
  });

  // Source package HTML/React examples and KSS documentation files
  gulp.watch([`${sourcePackageDir}/src/**/*.example.{ejs,html,jsx}`, `${sourcePackageDir}/src/**/*.docs.scss`], async () => {
    await generatePages(sourcePackageDir, docsPackageDir, options);
  });
  
  // Source package React components and examples
  gulp.watch(
    [`${sourcePackageDir}/src/**/*.jsx`, `!${sourcePackageDir}/src/**/*.test.{js,jsx}`],
    async () => {
      await compileJs(sourcePackageDir)
      await extractReactDocs(sourcePackageDir, options);
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
    await compileDocsSass(docsPackageDir, options, browserSync);
  });

  // Docs Markdown files
  gulp.watch([`${docsPackageDir}/src/pages/**/*.{md,mdx}`, `${docsPackageDir}/src/pages/**/*.docs.scss`], async () => {
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
