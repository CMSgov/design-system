import Prism from 'prismjs';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import prettier from 'prettier';

export function highlightHtmlSyntax(code) {
  const prettyHtml = prettier.format(code, {
    htmlWhitespaceSensitivity: 'ignore',
    parser: 'html',
    plugins: [parserHtml],
  });
  return Prism.highlight(prettyHtml, Prism.languages.html);
}

export function highlightJsxSyntax(code) {
  const prettyJsx = prettier.format(code, {
    htmlWhitespaceSensitivity: 'ignore',
    parser: 'babel',
    plugins: [parserBabel],
  });
  return Prism.highlight(prettyJsx, Prism.languages.jsx);
}
