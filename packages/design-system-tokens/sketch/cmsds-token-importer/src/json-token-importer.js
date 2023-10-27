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

const tokensByTheme = {
  core: { themeColors: coreTheme.color, components: coreComponents },
  healthcare: { themeColors: healthcareTheme.color, components: healthcareComponents },
  medicare: { themeColors: medicareTheme.color, components: medicareComponents },
  cmsgov: { themeColors: cmsgovTheme.color, components: cmsgovComponents },
};

function updateSwatchesFromTheme(doc, themeTokens) {
  const newSwatches = [];

  // Add theme colors
  for (const [key, value] of Object.entries(themeTokens.themeColors)) {
    // The name of the color is what comes before the first hyphen (if there's a hyphen)
    const colorName = key.split('-')[0];
    const swatchName = `theme colors/${colorName}/${key}`;
    newSwatches.push(
      sketch.Swatch.from({
        name: swatchName,
        color: value,
      })
    );
  }

  // Add component colors
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  for (const [componentName, componentTokens] of Object.entries(themeTokens.components)) {
    for (const [tokenName, tokenValue] of Object.entries(componentTokens)) {
      if (hexRegex.test(tokenValue)) {
        const swatchName = `components/${componentName}/${componentName}${tokenName}`;
        newSwatches.push(
          sketch.Swatch.from({
            name: swatchName,
            color: tokenValue,
          })
        );
      }
    }
  }

  // Update the document with new swatches
  const oldSwatchMap = doc.swatches.reduce((map, swatch) => {
    map[swatch.name] = swatch;
    return map;
  }, {});
  for (const newSwatch of newSwatches) {
    if (oldSwatchMap[newSwatch.name]) {
      oldSwatchMap[newSwatch.name].sketchObject.updateWithColor(newSwatch.referencingColor);
    } else {
      doc.swatches.push(newSwatch);
    }
  }

  // Update all references to the swatches in the doc
  const swatchContainer = doc.sketchObject.documentData().sharedSwatches();
  doc.swatches.forEach((swatch) => {
    swatchContainer.updateReferencesToSwatch(swatch.sketchObject);
  });
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
  const themeTokens = tokensByTheme[themeKey];

  const doc = sketch.getSelectedDocument();
  updateSwatchesFromTheme(doc, themeTokens);

  sketch.UI.message(`Switched to ${themeName}`);
}
