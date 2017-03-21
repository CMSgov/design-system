const fm = require('front-matter');
const marked = require('marked');
const Prism = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-scss');

// Format code blocks with Prism and ensure HTML is formatted
// in a way that Prism's CSS will be appplied
const renderer = new marked.Renderer();
renderer.code = function(code, lang) {
  lang = lang === 'html' ? 'markup' : lang;
  code = highlightCode(code, lang);
  return `<pre class="language-${lang}"><code>${code}</code></pre>`;
};

marked.setOptions({ renderer: renderer });

Prism.languages.bash['function'].pattern = /(^|\s|;|\||&)(?:npm|yarn|install)(?=$|\s|;|\||&)/;

function highlightCode(code, lang) {
  lang = lang === 'html' ? 'markup' : lang;
  const language = Prism.languages[lang];

  if (language) {
    return Prism.highlight(code, language);
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
