const { lighten } = require('colorutilities');

const darken = (color, amount) => lighten(color, -amount);

const variables = {};

variables.borderRadius = '3px';

variables.multiple = 8;

variables.breakpoints = {
  sm: '544px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

variables.lineHeights = {
  reset: '1',
  base: '1.5',
  heading: '1.3',
  lead: '1.7',
  input: '1.3'
};

variables.serifFont =
  "'Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif";

variables.sansSerifFont =
  "'Source Sans Pro', 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif";

const fontSizes = {};
variables.fontSizes = fontSizes;

fontSizes.base = '16px';
fontSizes.small = '14px';
fontSizes.lead = '18px';
fontSizes.display = '60px';
fontSizes.title = '48px';
fontSizes.h1 = '36px';
fontSizes.h2 = '24px';
fontSizes.h3 = '21px';
fontSizes.h4 = '18px';
fontSizes.h5 = fontSizes.base;
fontSizes.h6 = fontSizes.small;
fontSizes.h1Mobile = '30px';

variables.fontWeights = {
  normal: '400',
  semibold: '600',
  bold: '700'
};

variables.fontStyles = {
  normal: 'normal',
  italic: 'italic'
};

const colors = {};
variables.colors = colors;

colors.primary = '#0071bc';
colors.primaryDarker = '#205493';
colors.primaryDarkest = '#112e51';
colors.primaryAlt = '#02bfe7';
colors.primaryAltDark = '#00a6d2';
colors.primaryAltDarkest = '#046b99';
colors.primaryAltLight = '#9bdaf1'; // lighten($color-primaryAlt, 60%)
colors.primaryAltLightest = '#e1f3f8'; // lighten($color-primaryAlt, 90%)

colors.secondary = '#e31c3d';
colors.secondaryDark = '#cd2026';
colors.secondaryDarkest = '#981b1e';
colors.secondaryLight = '#e59393'; // lighten($color-secondary, 60%)
colors.secondaryLightest = '#f9dede'; // lighten($color-secondary, 90%)

colors.white = '#ffffff';
colors.base = '#212121';
colors.black = '#000000';

colors.gray = '#5b616b'; // lighten($color-grayDark, 20%)
colors.grayDark = '#323a45';
colors.grayMedium = '#757575'; // lightest gray that passes color contrast
colors.grayLight = '#aeb0b5'; // lighten($color-grayDark, 60%)
colors.grayLighter = '#d6d7d9'; // lighten($color-grayDark, 80%)
colors.grayLightest = '#f1f1f1'; // lighten($color-grayDark, 91%)
colors.grayWarmDark = '#494440';
colors.grayWarmLight = '#e4e2e0'; // lighten($color-grayWarmDark, 90%)
colors.grayCoolLight = '#dce4ef'; // lighten($color-primary, 90%)

colors.gold = '#fdb81e';
colors.goldLight = '#f9c642'; //  lighten($color-gold, 20%)
colors.goldLighter = '#fad980'; //  lighten($color-gold, 60%)
colors.goldLightest = '#fff1d2'; //  lighten($color-gold, 83%)

colors.green = '#2e8540';
colors.greenLight = '#4aa564'; // lighten($color-green, 20%)
colors.greenLighter = '#94bfa2'; // lighten($color-green, 60%)
colors.greenLightest = '#e7f4e4'; // lighten($color-green, 60%)

colors.coolBlue = '#205493';
colors.coolBlueLight = '#4773aa'; // lighten($colorCoolBlue, 20%)
colors.coolBlueLighter = '#8ba6ca'; // lighten($colorCoolBlue, 60%)
colors.coolBlueLightest = '#dce4ef'; // lighten($colorCoolBlue, 90%)

colors.focus = '#3e94cf';
colors.visited = '#4c2c92';
colors.muted = colors.gray;
colors.baseInverse = colors.white;
colors.mutedInverse = '#bac5cf';
colors.transparent = 'transparent';

colors.borderColor = colors.grayLighter;
colors.borderColorDark = colors.grayDark;
colors.borderColorInverse = colors.white;

colors.error = colors.secondary;
colors.errorDark = colors.secondaryDark;
colors.errorDarkest = colors.secondaryDarkest;
colors.errorLight = colors.secondaryLight;
colors.errorLighter = colors.secondaryLighter;
colors.errorLightest = colors.secondaryLightest;

colors.warn = colors.gold;
colors.warnLight = colors.goldLight;
colors.warnLighter = colors.goldLighter;
colors.warnLightest = colors.goldLightest;

colors.success = colors.green;
colors.successDark = darken(colors.green, 0.03);
colors.successDarker = darken(colors.green, 0.06);
colors.successLight = colors.greenLight;
colors.successLighter = colors.greenLighter;
colors.successLightest = colors.greenLightest;

colors.background = colors.white;
colors.backgroundInverse = colors.primaryDarkest;
colors.backgroundDialogMask = 'rgba(0, 0, 0, 0.5)';
colors.backgroundDialog = colors.white;

module.exports = variables;
