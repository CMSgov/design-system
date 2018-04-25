require('./mockEmotion');
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
