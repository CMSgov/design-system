const ejs = require('ejs');
const fs = require('mz/fs');
const replaceTemplateTags = require('../../common/replaceTemplateTags');
const path = require('path');
const { logData, logError } = require('../../common/logUtil');

/**
 * Take the raw markup value and convert or retrieve the markup to be displayed
 * to the user.
 * @param {Object} page
 * @param {Object}
 * @return {Promise<Object>} page updated `markup` property
 */
function processMarkup(page, options) {
  let markup = page.markup;

  if (markup && markup !== '') {
    if (markup.search(/^[^\n]+\.(html|ejs)$/) >= 0) {
      return loadMarkup(page).then(({ markup, markupPath }) => {
        page.markup = markup;
        page.markupPath = markupPath;
        return processMarkup(page, options);
      });
    }

    markup = replaceTemplateTags(markup, options);

    // Render EJS
    try {
      markup = ejs.render(markup);
    } catch (e) {
      logError('ejs error', e.message);
      logData('ejs error', `${page.source.path}\n${markup}`);
    }
  }

  page.markup = markup;
  return Promise.resolve(page);
}

/**
 * Load the markup file relative to the CSS file
 * @param {Object} page
 * @return {Promise<String>} Resolves with the file's contents
 */
function loadMarkup(page) {
  const dir = path.parse(page.source.path).dir;
  const markupPath = path.resolve(dir, page.markup);
  return fs
    .readFile(markupPath, 'utf8')
    .then((markup) => {
      return { markup, markupPath };
    })
    .catch((e) => {
      logError('markup error', e.message);
      return {};
    });
}

module.exports = processMarkup;
