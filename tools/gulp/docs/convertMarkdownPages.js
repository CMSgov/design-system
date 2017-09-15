/**
 * Markdown files are documentation pages that aren't tied to a CSS or JS file.
 * These live in the packages/docs/src/pages directory. This method converts
 * those Markdown pages to HTML, and formats them into an array of JSON objects
 * that can later be passed to the generatePage method.
 */
const fs = require('mz/fs');
const glob = require('glob');
const path = require('path');
const processMarkdownPage = require('./processMarkdownPage');
const pagesSrcDir = path.resolve(__dirname, '../../../packages/docs/src');

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

  return fs.readFile(filePath, 'utf8')
    .then(data => processMarkdownPage(filePath, data, rootPath));
}

/**
 * Reads all Markdown pages, transforms markdown, and creates a JSON
 * representation of each page
 * @param {String} rootPath - Root docs site path
 * @param {String} dir - Directory path
 * @return {Promise<Object[]>} Resolves with an array of JSON pages
 */
function convertMarkdownPages(rootPath, dir) {
  if (!dir) dir = pagesSrcDir;
  const pages = [];
  const filenames = glob.sync('pages/**/*.md', { cwd: dir });

  return Promise.all(
    filenames.map(filename =>
      createPageObject(rootPath, dir, filename)
        .then(data => {
          pages.push(data);
        })
    )
  ).then(() => pages);
}

module.exports = convertMarkdownPages;
