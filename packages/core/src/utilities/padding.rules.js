require('./mockEmotion');
const { padding } = require('./padding');
const { multipleRules, breakpointRules } = require('./rules');

const css = [
  multipleRules(m => `.ds-u-padding--${m} { ${padding(m)} }`),
  multipleRules(m => `.ds-u-padding-x--${m} { ${padding.x(m)} }`),
  multipleRules(m => `.ds-u-padding-y--${m} { ${padding.y(m)} }`),
  multipleRules(m => `.ds-u-padding-top--${m} { ${padding.top(m)} }`),
  multipleRules(m => `.ds-u-padding-right--${m} { ${padding.right(m)} }`),
  multipleRules(m => `.ds-u-padding-bottom--${m} { ${padding.bottom(m)} }`),
  multipleRules(m => `.ds-u-padding-left--${m} { ${padding.left(m)} }`),
  breakpointRules([
    (bp, m) => `.ds-u-${bp}-padding--${m} { ${padding(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-x--${m} { ${padding.x(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-y--${m} { ${padding.y(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-top--${m} { ${padding.top(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-right--${m} { ${padding.right(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-bottom--${m} { ${padding.bottom(m)} }`,
    (bp, m) => `.ds-u-${bp}-padding-left--${m} { ${padding.left(m)} }`
  ])
].join('');

console.log(css);
