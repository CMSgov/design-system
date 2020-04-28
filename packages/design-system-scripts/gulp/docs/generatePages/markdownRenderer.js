/*
  Create our own Marked Renderer so we can customize the format
  of the rendered HTML — adding our own classes and parsing.
*/
const marked = require('marked');
const Prism = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-scss');

const markdownRenderer = new marked.Renderer();

Prism.languages.bash['function'].pattern = /(^|\s|;|\||&)(?:npm|yarn|install)(?=$|\s|;|\||&)/;

function highlightCode(code, lang) {
  lang = lang === 'html' ? 'markup' : lang;
  const language = Prism.languages[lang];

  if (language) {
    return Prism.highlight(code, language);
  }

  return code;
}

// Format code blocks with Prism and ensure HTML is formatted
// in a way that Prism's CSS will be appplied
markdownRenderer.code = function(code, lang) {
  lang = lang === 'html' ? 'markup' : lang;
  let attrs = '';

  if (lang) {
    code = highlightCode(code, lang);
    attrs = `class="language-${lang}"`;
  }

  return `<pre ${attrs}><code>${code}</code></pre>`;
};

// Apply design system classes to base HTML elements
markdownRenderer.table = function(header, body) {
  return (
    '<table class="ds-c-table">\n' +
    '<thead>\n' +
    header +
    '</thead>\n' +
    '<tbody>\n' +
    body +
    '</tbody>\n' +
    '</table>\n'
  );
};

module.exports = markdownRenderer;
