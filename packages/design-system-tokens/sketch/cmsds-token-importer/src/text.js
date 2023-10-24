import sketch from 'sketch';

function parseFontSize(tokenValue) {
  if (typeof tokenValue === 'string') {
    if (tokenValue.includes('rem')) {
      return parseFloat(tokenValue) * 16;
    } else {
      return parseInt(tokenValue, 10);
    }
  }

  return tokenValue;
}

function parseLineHeight(tokenValue, fontSizePixels) {
  if (typeof tokenValue === 'number') {
    return tokenValue * fontSizePixels;
  } else {
    return parseInt(tokenValue, 10);
  }
}

function parseFontWeight(tokenValue) {
  switch (tokenValue) {
    case 100: // Thin
      return 0;
    case 200: // Extra-Light
      return 1;
    case 300: // Light
      return 3;
    case 400: // Normal/Regular
      return 6;
    case 500: // Medium
      return 7;
    case 600: // Semi-Bold
      return 9;
    case 700: // Bold
      return 10;
    case 800: // Extra-Bold
      return 11;
    case 900: // Black
      return 12;
    default:
      return 6;
  }
}

function parseFontFamily(tokenValue) {
  // Only return the first one, and remove all quotes
  return tokenValue.split(',')[0].replaceAll('"', '').replaceAll("'", '').trim();
}

function updateLayerTextStyleReferences(layer, sharedTextStyle) {
  if (layer.sharedStyleId === sharedTextStyle.id) {
    layer.sharedStyle = sharedTextStyle;
    layer.style = sharedTextStyle.style;
  }

  if (layer.layers) {
    for (const childLayer of layer.layers) {
      updateLayerTextStyleReferences(childLayer, sharedTextStyle);
    }
  }
}

function updateTextStyleReferences(doc, sharedTextStyle) {
  for (const page of doc.pages) {
    updateLayerTextStyleReferences(page, sharedTextStyle);
  }
}

export function updateTextStylesFromTheme(doc, themeTokens) {
  const fontSize = parseFontSize(themeTokens.font['size-base']);
  const lineHeight = parseLineHeight(themeTokens.font['line-height-base'], fontSize);
  const fontWeight = parseFontWeight(themeTokens.font['weight-normal']);
  const fontFamily = parseFontFamily(themeTokens.components.typography['-body__font-family']);

  const name = '_test/base';
  const defaultTextStyle = new sketch.Style({
    fontFamily,
    fontSize,
    fontWeight,
    textColor: themeTokens.color.base,
    lineHeight,
  });

  const existingStyle = doc.sharedTextStyles.find((style) => style.name === name);
  if (existingStyle) {
    existingStyle.style = defaultTextStyle;
    updateTextStyleReferences(doc, existingStyle);
  } else {
    doc.sharedTextStyles.push({
      name,
      style: defaultTextStyle,
    });
  }
}
