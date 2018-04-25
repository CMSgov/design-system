require('./mockEmotion');
const { fill } = require('./colors');
const { variationRules } = require('./rules');

const css = variationRules(
  [
    'primary',
    'primaryDarker',
    'primaryDarkest',
    'primaryAlt',
    'primaryAltDark',
    'primaryAltDarkest',
    'primaryAltLight',
    'primaryAltLightest',
    'gray',
    'grayDark',
    'grayLight',
    'grayLighter',
    'grayLightest',
    'gold',
    'goldLight',
    'goldLighter',
    'goldLightest',
    'warn',
    'warnLight',
    'warnLighter',
    'warnLightest',
    'green',
    'greenLight',
    'greenLighter',
    'greenLightest',
    'success',
    'successLight',
    'successLighter',
    'successLightest',
    'secondary',
    'secondaryDark',
    'secondaryDarkest',
    'secondaryLight',
    'secondaryLightest',
    'error',
    'errorDark',
    'errorDarkest',
    'errorLight',
    'errorLighter',
    'errorLightest',
    'base',
    'white',
    'background',
    'backgroundInverse',
    'transparent'
  ],
  (variation, colorKey) => `.ds-u-fill--${variation} { ${fill[colorKey]} }`
);

console.log(css);
