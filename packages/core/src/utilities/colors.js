import { css } from 'emotion';
// import { lighten } from 'colorutilities';

// const darken = (color, amount) => lighten(color, -amount);

export const colors = {};

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
colors.grayDark = '#323a45';
colors.gray = '#5b616b'; // lighten($color-grayDark, 20%)
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

function createUtility(cssFunction) {
  return Object.keys(colors).reduce((utility, colorName) => {
    const color = colors[colorName];
    utility[colorName] = cssFunction(color);
    return utility;
  }, {});
}

export const fill = createUtility(
  color =>
    css`
      background-color: ${color} !important;
    `
);
export const color = createUtility(
  color =>
    css`
      color: ${color} !important;
    `
);
