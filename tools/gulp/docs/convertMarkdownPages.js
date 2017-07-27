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

/**
 * Reads a path, and creates a JSON representation of the Markdown file. If
 * the path points to a directory, it creates objects for every child file.
 * @param {String} rootPath - Root docs site path
 * @param {String} dir - Directory path
 * @param {String} filename
 * @return {Promise<Object[]|Object>} Can resolve with a single page object
 *   or an array of page objects
 */
function createPageObject(rootPath, dir, filename) {
  const filePath = path.join(dir, filename);

  return fs.stat(filePath)
    .then(stats => {
      if (stats.isFile()) {
        return fs.readFile(filePath, 'utf8')
          .then(data => processMarkdownPage(filePath, data, rootPath));
      }

      // This is a directory, so return its pages instead
      return convertMarkdownPages(rootPath, filePath);
    });
}

/**
 * Reads all Markdown pages, transforms markdown, and creates a JSON
 * representation of each page
 * @param {String} rootPath - Root docs site path
 * @param {String} dir - Directory path
 * @return {Promise<Object[]>} Resolves with an array of JSON pages
 */
function convertMarkdownPages(rootPath, dir) {
  if (!dir) dir = pagesDir;
  let pages = [];

  return fs.readdir(dir)
    .then(filenames =>
      Promise.all(
        filenames.filter(filename =>
          // File is a Markdown file or directory
          filename.match(/\.md$/) || !filename.match(/\.([a-z]+)$/)
        ).map(filename =>
          createPageObject(rootPath, dir, filename)
            .then(data => {
              if (data.length) {
                // An array of a directory's pages
                pages = pages.concat(data);
              } else if (data) {
                // A single page object
                pages.push(data);
              }
            })
        )
      )
    )
    .then(() => pages);
}

module.exports = convertMarkdownPages;
