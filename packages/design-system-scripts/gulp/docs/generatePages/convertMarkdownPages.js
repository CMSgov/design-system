/**
 * Markdown files are documentation pages that aren't tied to a CSS or JS file.
 * These live in a src/pages directory. This method converts those Markdown
 * pages to HTML, and formats them into an array of JSON objects that can later
 * be passed to the generatePage method.
 */
const fs = require('mz/fs');
const glob = require('glob');
const path = require('path');
const processMarkdownPage = require('./processMarkdownPage');

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

  return fs
    .readFile(filePath, 'utf8')
    .then(data => processMarkdownPage(dir, filePath, data, rootPath));
}

/**
 * Reads and transforms all Markdown pages in the docs directory,
 * and creates a JSON representation of each page.
 * @param {String} rootPath - Root docs site path
 * @param {Array} dir - Directory containing the src directory where we will find markdown files
 * @return {Promise<Object[]>} Resolves with an array of JSON pages
 */
async function convertMarkdownPages(rootPath, dir) {
  const pages = [];
  const filenames = glob.sync('src/**/*.md', { cwd: dir });

  await Promise.all(
    filenames.map(filename =>
      createPageObject(rootPath, dir, filename).then(data => {
        pages.push(data);
      })
    )
  );

  return pages;
}

module.exports = convertMarkdownPages;
