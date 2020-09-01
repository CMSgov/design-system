const defaultHandlers = require('react-docgen').defaultHandlers;
const marked = require('marked');
const replaceTemplateTags = require('../../common/replaceTemplateTags');

function markdownHandler(options) {
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
            replaceTemplateTags(propDescriptor.description, options)
          );
        }
      });
    }
  };
}

/**
 * Add our custom handlers to react-docgen's default list of handlers
 */
module.exports = (options) => {
  return defaultHandlers.concat([markdownHandler(options)]);
};
