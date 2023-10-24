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

/**
 * Recursive function that looks through a layer and its children to find
 * references to a particular shared text style and updates that layer's style
 */
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

/**
 * Updates a shared text style by name. Shared text styles are named styles
 * that exist in a special place in the Sketch UI, similar to color swatches.
 * Shared text styles wrap a `style` object, so they can't be used directly
 * in the document. We have to go find the places where the layers reference
 * the shared text style by id and then update their `style` property.
 */
function updateSharedTextStyle(doc, name, newStyle) {
  // Find and update the existing style or add a new one
  const existingSharedStyle = doc.sharedTextStyles.find((style) => style.name === name);
  if (existingSharedStyle) {
    // Update the existing style with our new style info
    existingSharedStyle.style = newStyle;

    // And update references to it in the doc
    for (const page of doc.pages) {
      updateLayerTextStyleReferences(page, existingSharedStyle);
    }
  } else {
    doc.sharedTextStyles.push({
      name,
      style: newStyle,
    });
  }
}

/**
 * Creates the equivalent of the CSS reset styles for text to be used in all
 * the places where more specific text styles do not exist. Can be used in
 * whole or in part.
 */
function createBaseStyle(themeTokens) {
  const fontSize = parseFontSize(themeTokens.font['size-base']);
  const lineHeight = parseLineHeight(themeTokens.font['line-height-base'], fontSize);
  const fontWeight = parseFontWeight(themeTokens.font['weight-normal']);
  const fontFamily = parseFontFamily(themeTokens.components.typography['-body__font-family']);

  return new sketch.Style({
    fontFamily,
    fontSize,
    fontWeight,
    textColor: themeTokens.color.base,
    lineHeight,
  });
}

const tokenNamePatterns = {
  textColor: /^(.*)__color(.*)$/,
  fontSize: /^(.*)__font-size(.*)$/,
  fontWeight: /^(.*)__font-weight(.*)$/,
  fontFamily: /^(.*)__font-family(.*)$/,
  lineHeight: /^(.*)__line-height(.*)$/,
};

/**
 * Expects the token keys to be the full names of the tokens
 */
function updateComponentTextStyles(doc, componentName, componentTokens, defaultTextStyle) {
  const rawTextStyles = {};

  for (const tokenName in componentTokens) {
    const fullTokenName = `${componentName}${tokenName}`;

    for (const propertyName in tokenNamePatterns) {
      const matchResults = fullTokenName.match(tokenNamePatterns[propertyName]);
      if (matchResults) {
        // Combine the categories before with the qualifiers after. For example, the text
        // "vertical-nav-label__color--current" --> "vertical-nav-label--current"
        const textStyleName = matchResults.slice(1).join('');

        if (!rawTextStyles[textStyleName]) {
          rawTextStyles[textStyleName] = {};
        }

        rawTextStyles[textStyleName][propertyName] = componentTokens[tokenName];
      }
    }
  }

  const namePrefix = `_test/${componentName}/`;
  console.log(rawTextStyles);
}

export function updateTextStylesFromTheme(doc, themeTokens) {
  // Default text style is used to fill in missing values in other text styles
  // that come from the tokens
  const defaultTextStyle = createBaseStyle(themeTokens);

  updateSharedTextStyle(doc, '_test/base', defaultTextStyle);

  for (const [componentName, componentTokens] of Object.entries(themeTokens.components)) {
    updateComponentTextStyles(doc, componentName, componentTokens, defaultTextStyle);
  }
}
