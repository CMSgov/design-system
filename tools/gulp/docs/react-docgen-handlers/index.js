/**
 * Add our custom handlers to react-docgen's default list of handlers
 */
const defaultHandlers = require('react-docgen').defaultHandlers;
const displayNameHandler = require('./markdownHandler');
const markdownHandler = require('./markdownHandler');

module.exports = defaultHandlers.concat([
  displayNameHandler,
  markdownHandler
]);
