const fm = require('front-matter');
const marked = require('marked');
const Prism = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-scss');

marked.setOptions({ highlight: highlightCode });

function highlightCode(code, lang) {
  let language = {
    css: 'css',
    bash: 'bash',
    html: 'markup',
    jsx: 'jsx',
    scss: 'scss'
  }[lang];

  if (language) {
    return Prism.highlight(code, Prism.languages[language]);
  }

  return code;
}

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
