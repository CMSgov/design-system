const fm = require('front-matter');
const marked = require('marked');

function processMarkdownPage(filename, body, rootPath = '') {
  const parts = fm(body); // parses front-matter from top of file
  let referenceURI = filename.replace(/.md$/, '');

  if (referenceURI === 'index') {
    referenceURI = '';
  }

  if (rootPath !== '') {
    referenceURI = `${rootPath}/${referenceURI}`;
  }

  return {
    header: parts.attributes.title || 'Untitled',
    description: marked(parts.body),
    referenceURI: referenceURI
  };
}

module.exports = processMarkdownPage;
