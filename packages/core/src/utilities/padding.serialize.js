const rewire = require('rewire');
const postcss = require('postcss');
const safe = require('postcss-safe-parser');
const clean = require('postcss-clean');
const stylelint = require('stylelint');
const stylefmt = require('stylefmt');
const paddingModule = rewire('./padding');

const templateToString = (strings, ...values) =>
  strings.reduce((out, string, i) => out + string + (values[i] || ''), '');

const createRules = fn =>
  new Array(7)
    .fill(0)
    .map((_, i) => fn(i + 1))
    .join('');

paddingModule.__set__('css', templateToString);
const { padding } = paddingModule;

// console.log(templateToString`hey ${'you'} ${'guys'}`);
// console.log(padding(1, 2));
const css = [
  createRules(i => `.ds-u-padding--${i} { ${padding(i)} }`),
  createRules(i => `.ds-u-padding-x--${i} { ${padding.x(i)} }`),
  createRules(i => `.ds-u-padding-y--${i} { ${padding.y(i)} }`),
  createRules(i => `.ds-u-padding-top--${i} { ${padding.top(i)} }`),
  createRules(i => `.ds-u-padding-right--${i} { ${padding.right(i)} }`),
  createRules(i => `.ds-u-padding-bottom--${i} { ${padding.bottom(i)} }`),
  createRules(i => `.ds-u-padding-left--${i} { ${padding.left(i)} }`)
].join('');

postcss([clean(), stylelint({ fix: true }), stylefmt])
  .process(css, { parser: safe })
  .then(result => {
    console.log(result.css);
  });
