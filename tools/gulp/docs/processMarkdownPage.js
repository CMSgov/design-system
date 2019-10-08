const camelCase = require('lodash/camelCase');
const fm = require('front-matter');
const marked = require('marked');
const path = require('path');
const processMarkup = require('./processMarkup');
const renderer = require('./markdownRenderer');
const replaceTemplateTags = require('./replaceTemplateTags');

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

  Object.keys(attributes)
    .filter(key => Object.keys(page).indexOf(key) === -1)
    .forEach(key => {
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
  const description = parts.attributes.usage || parts.body;
  let referenceURI = filePath.match(/src\/pages\/([a-z0-9-/]+)/i)[1];
  const depth = referenceURI.split('/').length;

  if (referenceURI === 'index') {
    referenceURI = '';
  }

  const reference = referenceURI.replace('/', '.');

  if (rootPath !== '') {
    referenceURI = path.join(rootPath, referenceURI);
  }

  const header = parts.attributes.title || 'Untitled';
  let page = {
    depth: depth,
    label: parts.attributes.label || header,
    header,
    description: formatText(description, rootPath),
    markup: parts.attributes.markup || '',
    reference: reference,
    referenceURI: referenceURI,
    source: {
      path: filePath.match(/packages\/[a-z0-9.\-_/]+/i)[0] // relative to project directory
    },
    weight: parseInt(parts.attributes.weight || 0)
  };

  if (parts.attributes.usage) {
    // This page has tabs. The `usage` property is set as the top-level
    // description, so we make the page's body nested under the guidance section
    // We do it this way since formatting the guidance section as a front-matter
    // field is a pain, since you have to indent each line.
    page.sections = [
      {
        depth: depth + 1,
        header: '---',
        description: formatText(parts.body, rootPath),
        reference: `${reference}.guidance`,
        referenceURI: path.join(referenceURI, 'guidance')
      }
    ];

    delete parts.attributes.usage;
  }

  // Remove the title attribute before setting any flags
  delete parts.attributes.title;
  page = setFlags(page, parts.attributes);

  return processMarkup(page);
}

/**
 * @param {String} text
 * @param {String} rootPath
 * @return {String}
 */
function formatText(text, rootPath) {
  return marked(replaceTemplateTags(text, rootPath));
}

module.exports = processMarkdownPage;
