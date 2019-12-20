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

  return fs.readFile(filePath, 'utf8').then(data => processMarkdownPage(filePath, data, rootPath));
}

/**
 * @param {String} rootPath - Root docs site path
 * @param {String} dir - Source files directory
 * @return {Promise<Object[]>}
 */
function createPages(rootPath, dir) {
  const pages = [];
  const filenames = glob.sync('src/pages/**/*.md', { cwd: dir });

  return Promise.all(
    filenames.map(filename =>
      createPageObject(rootPath, dir, filename).then(data => {
        pages.push(data);
      })
    )
  ).then(() => pages);
}

/**
 * Reads all Markdown pages in the docs and (optionally) theme directory,
 * transforms markdown, and creates a JSON representation of each page.
 * @param {String} rootPath - Root docs site path
 * @param {Array} packages - Design system and theme package directory names
 * @return {Promise<Object[]>} Resolves with an array of JSON pages
 */
function convertMarkdownPages(rootPath, packages) {
  const packagesDir = path.join(__dirname, '../../../packages');
  const docsSrc = path.join(packagesDir, 'docs');
  const themePackages = packages.filter(name => name.match(/^themes\//));
  const docsPages = createPages(rootPath, docsSrc);

  if (themePackages.length) {
    const themeSrc = path.join(packagesDir, themePackages[0]);

    return docsPages.then(pages =>
      createPages(rootPath, themeSrc).then(themePages => pages.concat(themePages))
    );
  }

  return docsPages;
}

module.exports = convertMarkdownPages;
