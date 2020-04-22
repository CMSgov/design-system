const marked = require('marked');
const replaceTemplateTags = require('../replaceTemplateTags');

/**
 * Convert Markdown, in main description and prop descriptions, to HTML.
 *
 * TODO(sawyer): Separate this out into its own package. We'll need to ensure
 * there's a note in the README that specifies the handler should be APPENDED
 * to the default handlers, because the prop descriptions need set before
 * we can parse any Markdown from them.
 *
 * @param {String} rootPath - Root docs site path
 */
function markdownHandler(rootPath) {
  /**
   * @param {Documentation} doc - react-docgen Documentation instance
   */
  return function (doc) {
    const desc = doc.get('description');
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

    if (desc !== '') {
      doc.set('description', marked(desc));
    }
  };
}

module.exports = markdownHandler;
