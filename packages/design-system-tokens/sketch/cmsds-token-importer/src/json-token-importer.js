import sketch from 'sketch';
import dialog from '@skpm/dialog';
import themes from '../../../../../themes.json';
import coreTheme from '../../../dist/core.tokens.json';
import coreComponents from '../../../dist/core-component.tokens.json';
import healthcareTheme from '../../../dist/healthcare.tokens.json';
import healthcareComponents from '../../../dist/healthcare-component.tokens.json';
import medicareTheme from '../../../dist/medicare.tokens.json';
import medicareComponents from '../../../dist/medicare-component.tokens.json';
import cmsgovTheme from '../../../dist/cmsgov.tokens.json';
import cmsgovComponents from '../../../dist/cmsgov-component.tokens.json';

const tokens = {
  core: { themeColors: coreTheme.color, components: coreComponents },
  healthcare: { themeColors: healthcareTheme.color, components: healthcareComponents },
  medicare: { themeColors: medicareTheme.color, components: medicareComponents },
  cmsgov: { themeColors: cmsgovTheme.color, components: cmsgovComponents },
};

/*
 * Split tokens into groups based on root name and store in category,
 * based on first word before '-'. Allows keys with up to 4 dash separators.
 *
 * @param colorTokens - An object which contains color name:value pairs
 * @returns An array of Swatch objects created by the Sketch API
 */
const makeColorSwatches = (colorTokens) => {
  const swatches = [];
  for (const [key, value] of Object.entries(colorTokens)) {
    let colorName = key.match(/(^[A-Za-z]*)-?[A-Za-z\d]*?-?[A-Za-z\d]*?-?[A-Za-z\d]*?$/);
    colorName = colorName === null ? (colorName = '') : colorName[1] + '/';
    let currentSwatch = sketch.Swatch.from({
      name: `theme colors/${colorName}/${key}`,
      color: value,
    });
    swatches.push(currentSwatch);
  }
  return swatches;
};

const makeComponentSwatches = (components) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const swatches = [];
  for (const [componentName, componentTokens] of Object.entries(components)) {
    for (const [tokenName, tokenValue] of Object.entries(componentTokens)) {
      if (hexRegex.test(tokenValue)) {
        swatches.push(
          sketch.Swatch.from({
            name: `components/${componentName}/${componentName}${tokenName}`,
            color: tokenValue,
          })
        );
      }
    }
  }
  return swatches;
};

function updateSwatches(oldSwatches, newSwatches) {
  const swatchMap = oldSwatches.reduce((map, swatch) => {
    map[swatch.name] = swatch;
    return map;
  }, {});

  for (const newSwatch of newSwatches) {
    swatchMap[newSwatch.name] = newSwatch;
  }

  return Object.values(swatchMap);
}

export default function () {
  const themeNames = Object.values(themes).map((theme) => theme.displayName);

  const themeIndex = dialog.showMessageBoxSync({
    title: 'Switch theme',
    message: 'Which theme?',
    buttons: themeNames,
  });

  const themeKey = Object.keys(themes)[themeIndex];
  const themeName = themes[themeKey].displayName;
  const themeTokens = tokens[themeKey];
  console.log(themeTokens);

  const doc = sketch.getSelectedDocument();

  doc.swatches = updateSwatches(doc.swatches, makeColorSwatches(themeTokens.themeColors));
  doc.swatches = updateSwatches(doc.swatches, makeComponentSwatches(themeTokens.components));

  sketch.UI.message(`Switched to ${themeName}`);
}
