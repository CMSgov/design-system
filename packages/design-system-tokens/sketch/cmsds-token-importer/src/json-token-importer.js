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
  core: { ...coreTheme, components: coreComponents },
  healthcare: { ...healthcareTheme, components: healthcareComponents },
  medicare: { ...medicareTheme, components: medicareComponents },
  cmsgov: { ...cmsgovTheme, components: cmsgovComponents },
};

function updateSwatchesFromTheme(doc, themeTokens) {
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

function updateTextStylesFromTheme(doc, themeTokens) {
  let fontSize = themeTokens.font['size-base'];
  if (typeof fontSize === 'string') {
    if (fontSize.includes('rem')) {
      fontSize = parseFloat(fontSize) * 16;
    } else {
      fontSize = parseInt(fontSize, 10);
    }
  }

  let lineHeight = themeTokens.font['line-height-base'];
  if (typeof lineHeight === 'number') {
    lineHeight = lineHeight * fontSize;
  } else {
    lineHeight = parseInt(lineHeight, 10);
  }

  let fontWeight = themeTokens.font['weight-normal'];
  switch (fontWeight) {
    case 100: // Thin
      fontWeight = 0;
      break;
    case 200: // Extra-Light
      fontWeight = 1;
      break;
    case 300: // Light
      fontWeight = 3;
      break;
    case 400: // Normal/Regular
      fontWeight = 6;
      break;
    case 500: // Medium
      fontWeight = 7;
      break;
    case 600: // Semi-Bold
      fontWeight = 9;
      break;
    case 700: // Bold
      fontWeight = 10;
      break;
    case 800: // Extra-Bold
      fontWeight = 11;
      break;
    case 900: // Black
      fontWeight = 12;
      break;
    default:
      fontWeight = 6;
      break;
  }

  const fontFamily = themeTokens.components.typography['-body__font-family']
    .split(',')[0]
    .replaceAll('"', '')
    .replaceAll("'", '')
    .trim();

  const name = '_test/base';
  const defaultTextStyle = new sketch.Style({
    fontFamily,
    fontSize,
    fontWeight,
    textColor: themeTokens.color.base,
    lineHeight,
  });

  const existingStyle = doc.sharedTextStyles.find((style) => style.name === name);
  console.log(existingStyle.id);
  if (existingStyle) {
    // const oldFontFamily = existingStyle.style.fontFamily; // just for debugging purposes
    existingStyle.style = defaultTextStyle;
    // console.log(existingStyle);
    // existingStyle.style.fontFamily = defaultTextStyle.fontFamily;
    // existingStyle.style.fontSize = defaultTextStyle.fontSize;
    // existingStyle.style.fontWeight = defaultTextStyle.fontWeight;
    // existingStyle.style.textColor = defaultTextStyle.textColor;
    // existingStyle.style.lineHeight = defaultTextStyle.lineHeight;

    // let x = 0;
    console.log('----');
    // const updateId = existingStyle.style.id;
    doc.pages.forEach((page) => {
      page.layers.forEach((layer) => {
        (layer.layers || []).forEach((l) => {
          if (l.sharedStyleId === existingStyle.id) {
            console.log('found one!!');
            // l.style = existingStyle.style;
            // l.sharedStyleId = existingStyle.id;
            l.sharedStyle = existingStyle;
            l.style = existingStyle.style;
            console.log(l);
          }
        });
        // if (layer.style && layer.style.fontFamily === oldFontFamily) {
        //   console.log(layer, layer.style);
        // }
        // if (layer.style && layer.style.id === existingStyle.id) {
        //   console.log('found it!!')
        // }
        // if (layer.style && layer.style.id === updateId) {
        //   console.log(layer.style.id)
        //   // console.log(layer)
        //   layer.style = existingStyle.style;
        // }
        // if (x > 10) return;
        // // Check if the layer has a fill or a border
        // if (layer.style) {
        //   console.log(layer.style);
        //   x++;
        // }
      });
    });
  } else {
    doc.sharedTextStyles.push({
      name,
      style: defaultTextStyle,
    });
  }
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
  updateTextStylesFromTheme(doc, themeTokens);

  sketch.UI.message(`Switched to ${themeName}`);
}
