import sketch from 'sketch';
import { updateSharedStyleReferences } from './updateSharedStyleReferences';

function parseFontSize(tokenValue) {
  if (typeof tokenValue === 'string') {
    let parsed;
    if (tokenValue.includes('rem')) {
      parsed = parseFloat(tokenValue) * 16;
    } else {
      parsed = parseFloat(tokenValue);
    }

    if (!isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
}

function parseLineHeight(tokenValue, fontSizePixels) {
  if (typeof tokenValue === 'number') {
    return tokenValue * fontSizePixels;
  }

  const parsed = parseInt(tokenValue, 10);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return null;
}

function parseFontWeight(tokenValue) {
  if (tokenValue === 'inherit') {
    return null;
  }

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
  if (tokenValue === 'inherit') {
    return null;
  }

  // Only return the first one, and remove all quotes
  return tokenValue.split(',')[0].replaceAll('"', '').replaceAll("'", '').trim();
}

function parseKerning(tokenValue) {
  return parseFontSize(tokenValue);
}

function parseTextTransform(tokenValue) {
  switch (tokenValue) {
    case 'none':
    case 'uppercase':
    case 'lowercase':
      return tokenValue;
  }

  return null;
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
  const fontFamily = parseFontFamily(themeTokens.components['typography-body']['__font-family']);

  return new sketch.Style({
    fontFamily,
    fontSize,
    fontWeight,
    textColor: themeTokens.color.base,
    lineHeight,
    kerning: 0,
    textTransform: 'none',
  });
}

const tokenNamePatterns = {
  textColor: /^(.*)__color(.*)$/,
  fontSize: /^(.*)__font-size(.*)$/,
  fontWeight: /^(.*)__font-weight(.*)$/,
  fontFamily: /^(.*)__font-family(.*)$/,
  lineHeight: /^(.*)__line-height(.*)$/,
  kerning: /^(.*)__letter-spacing(.*)$/,
  textTransform: /^(.*)__text-transform(.*)$/,
};

/**
 * Expects the token keys to be the full names of the tokens
 */
function updateComponentTextStyles(
  doc,
  { componentName, componentTokens, defaultTextStyle, folder }
) {
  const rawTextStyles = {};

  // Go through each token and put it into a bucket based on information stored in its key
  for (const tokenName in componentTokens) {
    const fullTokenName = `${componentName}${tokenName}`;

    for (const propertyName in tokenNamePatterns) {
      const matchResults = fullTokenName.match(tokenNamePatterns[propertyName]);
      if (matchResults) {
        const [prefix, suffix] = matchResults.slice(1);
        // Leave out the particular property name when coming up with the name for
        // the text style, which is a group of properties.
        const textStyleName = `${prefix}${suffix}`;

        if (!rawTextStyles[textStyleName]) {
          let parentStyleName;
          if (suffix) {
            parentStyleName = prefix;
          } else if (prefix !== componentName) {
            parentStyleName = componentName;
          }

          rawTextStyles[textStyleName] = {
            parentStyleName,
          };
        }

        rawTextStyles[textStyleName][propertyName] = componentTokens[tokenName];
      }
    }
  }

  // Recursive function that will climb up the inheritance tree for a particular
  // style property and return the first valid value it finds, defaulting to the
  // defaultTextStyle if nothing else is found.
  const getProperty = (textStyleName, propertyName, parseFn) => {
    const rawTextStyle = rawTextStyles[textStyleName];
    if (rawTextStyle) {
      const rawValue = rawTextStyle[propertyName];
      if (rawValue !== undefined) {
        const parsedValue = parseFn(rawValue);
        // Sometimes the value is "inherit" or "currentColor" or something else that can't
        // be parsed; in those cases, we want to fall back on the parent's value, so check
        // that it's valid before returning. If the parse functions return anything other
        // than null or undefined, it's a valid value.
        if (parsedValue != null) {
          return parsedValue;
        }
      }

      if (rawTextStyle.parentStyleName) {
        return getProperty(rawTextStyle.parentStyleName, propertyName, parseFn);
      }
    }

    return defaultTextStyle[propertyName];
  };

  for (const textStyleName in rawTextStyles) {
    const fontFamily = getProperty(textStyleName, 'fontFamily', parseFontFamily);
    const fontSize = getProperty(textStyleName, 'fontSize', parseFontSize);
    const fontWeight = getProperty(textStyleName, 'fontWeight', parseFontWeight);
    const textColor = getProperty(textStyleName, 'textColor', parseFontFamily);
    const lineHeight = getProperty(textStyleName, 'lineHeight', (v) =>
      parseLineHeight(v, fontSize)
    );
    const kerning = getProperty(textStyleName, 'kerning', parseKerning);
    const textTransform = getProperty(textStyleName, 'textTransform', parseTextTransform);

    const style = new sketch.Style({
      fontFamily,
      fontSize,
      fontWeight,
      textColor,
      lineHeight,
      kerning,
      textTransform,
    });

    const name = `${folder}/${textStyleName}`;

    updateSharedStyleReferences(doc, name, style);
  }
}

export function updateTextStylesFromTheme(doc, themeTokens) {
  // Default text style is used to fill in missing values in other text styles
  // that come from the tokens
  const defaultTextStyle = createBaseStyle(themeTokens);
  updateSharedStyleReferences(doc, 'base', defaultTextStyle);

  const {
    'typography-heading': heading,
    'typography-body': body,
    link,
    ...components
  } = themeTokens.components;

  updateComponentTextStyles(doc, {
    componentName: 'typography-heading',
    componentTokens: heading,
    defaultTextStyle,
    folder: 'typography/heading',
  });
  updateComponentTextStyles(doc, {
    componentName: 'typography-body',
    componentTokens: body,
    defaultTextStyle,
    folder: 'typography/body',
  });
  updateComponentTextStyles(doc, {
    componentName: 'link',
    componentTokens: link,
    defaultTextStyle,
    folder: 'typography/link',
  });

  for (const [componentName, componentTokens] of Object.entries(components)) {
    updateComponentTextStyles(doc, {
      componentName,
      componentTokens,
      defaultTextStyle,
      folder: `components/${componentName}`,
    });
  }
}
