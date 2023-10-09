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
  doc.swatches = Object.values(swatchMap);
  // From ChatGTP - the doc.sketchObject.saveDocument doesn't seem to be a thing, but
  // doc.save() doesn't work to update the colors either. I think ChatGPT is wrong, and
  // I can't just assign `swatchMap[name].color = color;`. Now that I fixed the typo in
  // that line, I see that I get an error that I can't reassign a readonly value.
  doc.sketchObject.reloadInspector(); // Refresh the Sketch inspector
  // doc.sketchObject.saveDocument(() => {}); // Save the document to apply changes
  // doc.save()
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

    // swatchMap[name].sketchObject.updateWithColor(MSColor.colorWithHex_alpha(color, 1));
    let swatchContainer = sketch.getSelectedDocument().sketchObject.documentData().sharedSwatches();
    swatchContainer.updateReferencesToSwatch(swatchMap[name].sketchObject);
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

  doc.pages.forEach((page) => {
    page.layers.forEach((layer) => {
      // Check if the layer has a fill or a border
      if (layer.style && (layer.style.fills || layer.style.borders)) {
        // Iterate through the fills and borders of the layer
        [...(layer.style.fills || []), ...(layer.style.borders || [])].forEach((style) => {
          // Check if the fill or border has a swatch with the oldSwatchName
          if (style.fillType === Swatch) {
            // Replace the swatch with the newSwatchName
            style.swatch = swatchMap[style.swatch.name];
          }
        });
      }
    });
  });

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
