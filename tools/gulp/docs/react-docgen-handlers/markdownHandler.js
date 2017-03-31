/**
 * Convert Markdown, in main description and prop descriptions, to HTML.
 *
 * TODO(sawyer): Separate this out into its own package. We'll need to ensure
 * there's a note in the README that specifies the handler should be APPENDED
 * to the default handlers, because the prop descriptions need set before
 * we can parse any Markdown from them.
 */
const marked = require('marked');

function markdownHandler(doc) {
  const desc = doc.get('description');
  const docObject = doc.toObject();

  Object.keys(docObject.props).forEach(propName => {
    let propDescriptor = doc.getPropDescriptor(propName);

    if (propDescriptor.description !== '') {
      propDescriptor.description = marked(propDescriptor.description);
    }
  });

  if (desc !== '') {
    doc.set('description', marked(desc));
  }
}

module.exports = markdownHandler;
