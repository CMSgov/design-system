require('./mockEmotion');
const { color } = require('./colors');
const { variationRules } = require('./rules');

const css = variationRules(
  [
    'primary',
    'primaryDarker',
    'primaryDarkest',
    'gray',
    'muted',
    'error',
    'errorDark',
    'errorLight',
    'success',
    'base',
    'baseInverse',
    'mutedInverse',
    'black',
    'white',
    'inherit'
  ],
  (variation, colorKey) => `.ds-u-color--${variation} { ${color[colorKey]} }`
);

console.log(css);
