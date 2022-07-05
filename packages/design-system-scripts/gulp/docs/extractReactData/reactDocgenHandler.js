const defaultHandlers = require('react-docgen').defaultHandlers;
const marked = require('marked');
const replaceTemplateTags = require('../../common/replaceTemplateTags');

function processDocgenTemplates(doc, options) {
  if (doc.props) {
    Object.keys(doc.props).forEach((propName) => {
      const propObject = doc.getPropDescriptor
        ? doc.getPropDescriptor(propName)
        : doc.props[propName];
      if (propObject.description !== '') {
        propObject.description = marked.parse(replaceTemplateTags(propObject.description, options));
      }
    });
  }
}
function markdownHandler(options) {
  /**
   * @param {Documentation} doc - react-docgen Documentation instance
   */
  return function (doc) {
    const docObject = doc.toObject();
    processDocgenTemplates(docObject, options);
  };
}

/**
 * Add our custom handlers to react-docgen's default list of handlers
 */
module.exports = {
  reactDocgenHandler: (options) => defaultHandlers.concat([markdownHandler(options)]),
  processDocgenTemplates,
};
