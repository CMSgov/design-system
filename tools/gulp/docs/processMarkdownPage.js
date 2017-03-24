const fm = require('front-matter');
const marked = require('marked');
const renderer = require('./markdownRenderer');

marked.setOptions({ renderer: renderer });

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
    referenceURI: referenceURI,
    weight: parseInt(parts.attributes.weight || 0)
  };
}

module.exports = processMarkdownPage;
