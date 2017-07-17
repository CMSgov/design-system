const camelCase = require('lodash/camelCase');
const fm = require('front-matter');
const marked = require('marked');
const processMarkup = require('./processMarkup');
const renderer = require('./markdownRenderer');

marked.setOptions({ renderer: renderer });

/**
 * Take any attributes that aren't yet present on the page object, and add them
 * to the page object with camel-cased names.
 * @param {Object} page
 * @param {Object} attributes
 * @return {Object}
 */
function setFlags(page, attributes) {
  page = Object.assign({}, page);

  Object.keys(attributes).filter(key =>
    Object.keys(page).indexOf(key) === -1
  ).forEach(key => {
    page[camelCase(key)] = attributes[key];
  });

  return page;
}

/**
 * Breaks the various parts of the Markdown page into the expected page props
 * that will later get passed into the React app.
 * @param {String} filePath - Absolute path to Markdown file
 * @param {String} body - Markdown file contents
 * @param {String} rootPath - Root docs site path
 * @return {Promise<Object>} Resolves with the page object
 */
function processMarkdownPage(filePath, body, rootPath = '') {
  const parts = fm(body); // parse page properties from top of file
  let referenceURI = filePath.match(/src\/pages\/([a-z0-9-/]+)/i)[1];

  if (referenceURI === 'index') {
    referenceURI = '';
  }

  const reference = referenceURI.replace('/', '.');

  if (rootPath !== '') {
    referenceURI = `${rootPath}/${referenceURI}`;
  }

  parts.body = parts.body.replace(
    /{{root}}/g,
    (rootPath ? `/${rootPath}` : '')
  );

  let page = {
    header: parts.attributes.title || 'Untitled',
    description: marked(parts.body),
    markup: parts.attributes.markup || '',
    reference: reference,
    referenceURI: referenceURI,
    source: {
      path: filePath.match(/packages\/[a-zA-Z.\-_/]+/)[0] // relative to project directory
    },
    weight: parseInt(parts.attributes.weight || 0)
  };

  // Remove the title attribute before setting any flags
  delete parts.attributes.title;
  page = setFlags(page, parts.attributes);

  return processMarkup(page);
}

module.exports = processMarkdownPage;
