const camelCase = require('lodash/camelCase');
const fm = require('front-matter');
const marked = require('marked');
const path = require('path');
const processMarkup = require('./processMarkup');
const renderer = require('./markdownRenderer');
const replaceTemplateTags = require('../../common/replaceTemplateTags');

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
    .filter((key) => Object.keys(page).indexOf(key) === -1)
    .forEach((key) => {
      page[camelCase(key)] = attributes[key];
    });

  return page;
}

/**
 * Breaks the various parts of the Markdown page into the expected page props
 * that will later get passed into the React app.
 * @param {String} filePath - Absolute path to Markdown file
 * @param {String} body - Markdown file contents
 * @param {Object} options
 * @return {Promise<Object>} Resolves with the page object
 */
function processMarkdownPage(filePath, body, options) {
  const parts = fm(body); // parse page properties from top of file
  const description = parts.attributes.usage || parts.body;

  let referenceURI;
  let reference;
  let depth;

  if (parts.attributes.path) {
    // Page structure determined by frontmatter attribute named 'path'
    referenceURI = parts.attributes.path;
    reference = referenceURI.replace('/', '.');
    depth = referenceURI.split('/').length;
  } else {
    // Temporarily keep filepath based legacy logic
    // Both forward and back slashes are required for this to build on windows
    referenceURI = filePath.match(/src[\\\/]pages[\\\/]([a-z0-9-/\\]+)/i)[1];
    depth = referenceURI.split('/').length;

    if (referenceURI === 'index') {
      referenceURI = '';
    }

    reference = referenceURI.replace('/', '.');
  }

  referenceURI = referenceURI.replace('index', '');

  const header = parts.attributes.title || 'Untitled';
  let page = {
    depth: depth,
    label: parts.attributes.label || header,
    header,
    description: formatText(description, options),
    markup: parts.attributes.markup || '',
    reference: reference,
    referenceURI: referenceURI,
    source: {
      path: filePath,
    },
    weight: parseInt(parts.attributes.weight || 0),
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
        description: formatText(parts.body, options),
        reference: `${reference}.guidance`,
        referenceURI: path.join(referenceURI, 'guidance'),
      },
    ];

    delete parts.attributes.usage;
  }

  // Remove the title attribute before setting any flags
  delete parts.attributes.title;
  page = setFlags(page, parts.attributes);

  return processMarkup(page, options);
}

/**
 * @param {String} text
 * @param {String} rootPath
 * @return {String}
 */
function formatText(text, options) {
  return marked.parse(replaceTemplateTags(text, options));
}

module.exports = processMarkdownPage;
