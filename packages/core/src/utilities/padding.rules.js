const mock = require('mock-require');
const postcss = require('postcss');
const safe = require('postcss-safe-parser');
const clean = require('postcss-clean');
const stylelint = require('stylelint');
const stylefmt = require('stylefmt');

const templateToString = (strings, ...values) =>
  strings.reduce((out, string, i) => out + string + (values[i] || ''), '');

mock('emotion', {
  css: templateToString
});
const { padding } = require('./padding');

const createRules = fn =>
  new Array(7)
    .fill(0)
    .map((_, i) => fn(i + 1))
    .join('');

const css = [
  createRules(i => `.ds-u-padding--${i} { ${padding(i)} }`),
  createRules(i => `.ds-u-padding-x--${i} { ${padding.x(i)} }`),
  createRules(i => `.ds-u-padding-y--${i} { ${padding.y(i)} }`),
  createRules(i => `.ds-u-padding-top--${i} { ${padding.top(i)} }`),
  createRules(i => `.ds-u-padding-right--${i} { ${padding.right(i)} }`),
  createRules(i => `.ds-u-padding-bottom--${i} { ${padding.bottom(i)} }`),
  createRules(i => `.ds-u-padding-left--${i} { ${padding.left(i)} }`)
].join('');

console.log(css);
