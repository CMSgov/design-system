const fm = require('front-matter');
const marked = require('marked');
const renderer = require('./markdownRenderer');

marked.setOptions({ renderer: renderer });

/**
 * Breaks the various parts of the Markdown page into the expected props that
 * will later get passed into the React app.
 * @param {String} filePath
 * @param {String} body - Markdown file contents
 * @param {String} rootPath - Root docs site path
 * @return {Object}
 */
function processMarkdownPage(filePath, body, rootPath = '') {
  const parts = fm(body); // parses front-matter from top of file
  let referenceURI = filePath.match(/src\/pages\/([a-z0-9-/]+)/i)[1];

  if (referenceURI === 'index') {
    referenceURI = '';
  }

  if (rootPath !== '') {
    referenceURI = `${rootPath}/${referenceURI}`;
  }

  parts.body = parts.body.replace(/{{root}}/g, `/${rootPath}`);

  return {
    header: parts.attributes.title || 'Untitled',
    description: marked(parts.body),
    referenceURI: referenceURI,
    weight: parseInt(parts.attributes.weight || 0)
  };
}

module.exports = processMarkdownPage;
