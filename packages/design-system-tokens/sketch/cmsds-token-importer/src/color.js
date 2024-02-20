import sketch from 'sketch';

export function updateSwatchesFromTheme(doc, themeTokens) {
  const newSwatches = [];

  // Add theme colors
  for (const [key, value] of Object.entries(themeTokens.color)) {
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
