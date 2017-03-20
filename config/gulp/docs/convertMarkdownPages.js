/**
 * Markdown files are documentation pages that aren't tied to a CSS or JS file.
 * These live in the packages/docs/src/pages directory. This method converts
 * those Markdown pages to HTML, and formats them into an array of JSON objects
 * that can later be passed to the generatePage method.
 */
const fs = require('mz/fs');
const path = require('path');
const processMarkdownPage = require('./processMarkdownPage');
const pagesDir = path.resolve(__dirname, '../../../packages/docs/src/pages');

function convertPage(pages, filename, rootPath) {
  return fs.readFile(path.join(pagesDir, filename), 'utf8')
    .then(data => {
      pages.push(processMarkdownPage(filename, data, rootPath));
    });
}

function convertMarkdownPages(rootPath) {
  let pages = [];

  // Loop through files in the pages directory. If we wanted to support nested
  // pages in the future, this will need recursive support added.
  return fs.readdir(pagesDir)
    .then(filenames => {
      return Promise.all(
        filenames.map(page => convertPage(pages, page, rootPath))
      );
    })
    .then(() => pages);
}

module.exports = convertMarkdownPages;
