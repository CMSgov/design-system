const defaultHandlers = require('react-docgen').defaultHandlers;
const marked = require('marked');
const replaceTemplateTags = require('../../common/replaceTemplateTags');

/**
 * @param {String} rootPath - Root docs site path
 */
function markdownHandler(rootPath) {
  /**
   * @param {Documentation} doc - react-docgen Documentation instance
   */
  return function (doc) {
    const docObject = doc.toObject();

    if (docObject.props) {
      Object.keys(docObject.props).forEach((propName) => {
        const propDescriptor = doc.getPropDescriptor(propName);

        if (propDescriptor.description !== '') {
          propDescriptor.description = marked(
            replaceTemplateTags(propDescriptor.description, rootPath)
          );
        }
      });
    }
  };
}

/**
 * Add our custom handlers to react-docgen's default list of handlers
 * @param {String} rootPath - Root docs site path
 * @return {Array}
 */
module.exports = (rootPath) => {
  return defaultHandlers.concat([markdownHandler(rootPath)]);
};
