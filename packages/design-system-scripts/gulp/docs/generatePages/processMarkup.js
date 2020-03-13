const ejs = require('ejs');
const fs = require('mz/fs');
const replaceTemplateTags = require('../replaceTemplateTags');
const path = require('path');
const { logData, logError } = require('../../common/logUtil');

/**
 * Take the raw markup value and convert or retrieve the markup to be displayed
 * to the user.
 * @param {Object} page
 * @param {rootPath}
 * @return {Promise<Object>} page updated `markup` property
 */
function processMarkup(page, rootPath) {
  let markup = page.markup;

  if (markup && markup !== '') {
    if (markup.search(/^[^\n]+\.(html|ejs)$/) >= 0) {
      return loadMarkup(page).then(markup => {
        page.markup = markup;
        return processMarkup(page, rootPath);
      });
    }

    markup = replaceTemplateTags(markup, rootPath);

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
  const src = `../../../${dir}/${page.markup}`;
  return fs.readFile(path.resolve(__dirname, src), 'utf8').catch(e => {
    logError('markup error', e.message);
    return '';
  });
}

module.exports = processMarkup;
