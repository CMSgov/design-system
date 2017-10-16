const defaultHandlers = require('react-docgen').defaultHandlers;
const markdownHandler = require('./markdownHandler');

/**
 * Add our custom handlers to react-docgen's default list of handlers
 * @param {String} rootPath - Root docs site path
 * @return {Array}
 */
module.exports = rootPath => {
  return defaultHandlers.concat([markdownHandler(rootPath)]);
};
