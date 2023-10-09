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

function loadSwatchMap(doc) {
  return doc.swatches.reduce((map, swatch) => {
    map[swatch.name] = swatch;
    return map;
  }, {});
}

function saveSwatchMap(doc, swatchMap) {
  // Update all references to the swatches in the doc
  const swatchContainer = doc.sketchObject.documentData().sharedSwatches();
  doc.swatches.forEach((swatch) => {
    swatchContainer.updateReferencesToSwatch(swatch.sketchObject);
  });

  // For some reason, the above code isn't enough. I also need to find and replace all
  // swatch references in the doc. Only both of these solutions together seems to work
  // doc.pages.forEach((page) => {
  //   page.layers.forEach((layer) => {
  //     // Check if the layer has a fill or a border
  //     if (layer.style && (layer.style.fills || layer.style.borders)) {
  //       // Iterate through the fills and borders of the layer
  //       [...(layer.style.fills || []), ...(layer.style.borders || [])].forEach((style) => {
  //         // Check if the fill or border has a swatch with the oldSwatchName
  //         // console.log(style.fillType)
  //         // console.log(style)
  //         console.log('swatch', style.swatch);
  //         // The following code throws errors in the console, and yet without it the
  //         // swatches don't get updated
  //         if (style.fillType === Swatch) {
  //           // Replace the swatch with the newSwatchName
  //           style.swatch = swatchMap[style.swatch.name];
  //         }
  //       });
  //     }
  //   });
  // });

  // doc.swatches = Object.values(swatchMap);
  // doc.sketchObject.reloadInspector(); // Refresh the Sketch inspector
}

function updateOrAddSwatch(swatchMap, name, color) {
  const newSwatch = sketch.Swatch.from({ name, color });
  if (swatchMap[name]) {
    // The only other way I know to supply the Sketch's low-level `updateWithColor`
    // is with `MSColor.colorWithHex_alpha("#0094FF", 1)`, but the problem is that right
    // now all our color tokens are defined with the alpha channel in the hexadecimal,
    // and I don't want to bother with parsing it out, so I'm just going to create a new
    // swatch every time.
    swatchMap[name].sketchObject.updateWithColor(newSwatch.referencingColor);
  } else {
    swatchMap[name] = newSwatch;
  }
}

function updateSwatchesFromTheme(doc, themeTokens) {
  const swatchMap = loadSwatchMap(doc);

  for (const [key, value] of Object.entries(themeTokens.themeColors)) {
    // The name of the color is what comes before the first hyphen (if there's a hyphen)
    const colorName = key.split('-')[0];
    const swatchName = `theme colors/${colorName}/${key}`;
    updateOrAddSwatch(swatchMap, swatchName, value);
  }

  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  for (const [componentName, componentTokens] of Object.entries(themeTokens.components)) {
    for (const [tokenName, tokenValue] of Object.entries(componentTokens)) {
      if (hexRegex.test(tokenValue)) {
        const swatchName = `components/${componentName}/${componentName}${tokenName}`;
        updateOrAddSwatch(swatchMap, swatchName, tokenValue);
      }
    }
  }

  saveSwatchMap(doc, swatchMap);
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
