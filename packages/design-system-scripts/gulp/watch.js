/**
 * These watch tasks enable a powerful developer workflow where changes you
 * make to a component, a component's example code, or the documentation will
 * automatically be reflected in the browser when the changes are saved.
 */
const browserSync = require('browser-sync');
const gulp = require('gulp');
const path = require('path');
const { logTask } = require('./common/logUtil');
const { compileSourceSass, compileDocsSass } = require('./sass');
const { copyAll, compileJs } = require('./build');
const { generatePages, copySourceAssets, copyDocsAssets } = require('./docs');
const { extractReactProps, extractReactExamples } = require('./docs/extractReactData');
const { runWebpackServer } = require('./docs/webpack');

// Use chokidar instance under gulp.watch to expose `path` of changed files
// https://gulpjs.com/docs/en/api/watch/#chokidar-instance
function watch(globs, task) {
  const watcher = gulp.watch(globs);

  watcher.on('change', function (changedPath) {
    task(changedPath);
  });
  watcher.on('add', function (changedPath) {
    task(changedPath);
  });
  watcher.on('unlink', function (changedPath) {
    task(changedPath);
  });
}

async function watchSource(sourceDir, docsDir, options, browserSync) {
  const src = path.join(sourceDir, 'src');

  // Source package assets
  gulp.watch([`${src}/{images,fonts}/*`, `${src}/**/*.json`], async () => {
    await copyAll(sourceDir);
    await copySourceAssets(sourceDir, docsDir);
  });

  // Source package Sass files
  gulp.watch(`${src}/**/*.scss`, async () => {
    await copyAll(sourceDir);
    await compileSourceSass(sourceDir, options);
    await compileDocsSass(docsDir, options, browserSync);
  });

  watch(
    [`${src}/**/*.{jsx,tsx}`, `!${src}/**/*{.test,.spec}.{js,jsx,ts,tsx}`],
    async (changedPath) => {
      await compileJs(sourceDir, options, changedPath);
      await extractReactProps(sourceDir, options);
      await generatePages(sourceDir, docsDir, options, changedPath);
    }
  );
}

async function watchDocs(sourceDir, docsDir, options, browserSync) {
  const src = path.join(docsDir, 'src');

  // Docs assets
  gulp.watch(`${src}/{images,fonts}/*`, async () => {
    await copyDocsAssets(docsDir);
  });

  // Docs Sass files
  gulp.watch([`${src}/**/*.scss`, `!${src}/**/*.docs.scss`], async () => {
    await compileDocsSass(docsDir, options, browserSync);
  });

  // Docs Markdown files, KSS documentation files
  watch([`${src}/**/*.{md,mdx,docs.scss}`], async (changedPath) => {
    await generatePages(sourceDir, docsDir, options, changedPath);
  });

  // Docs HTML/React examples
  watch([`${src}/**/*.example.{html,jsx,tsx}`], async (changedPath) => {
    await extractReactExamples(docsDir, options);
    await generatePages(sourceDir, docsDir, options, changedPath);
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
