import findKey from 'lodash/findKey';
import systemTokens from 'design-system-tokens/src/tokens/System.Value.json';
import coreTokens from 'design-system-tokens/src/tokens/Theme.core.json';
import cmsgovTokens from 'design-system-tokens/src/tokens/Theme.cmsgov.json';
import healthcareTokens from 'design-system-tokens/src/tokens/Theme.healthcare.json';
import medicareTokens from 'design-system-tokens/src/tokens/Theme.medicare.json';
import themes from '../../../../themes.json';
import {
  FlattenedTokensByFile,
  Token,
  flattenTokens,
  isAlias,
  resolveTokenAlias,
} from 'design-system-tokens/src/lib/tokens';
import { tokenNameToVarName, tokenToCssValue } from 'design-system-tokens/src/css/translate';
import { capitalize } from './capitalize';
import { HexValue, luminanceFromHex } from 'design-system-tokens/src/lib/colorUtils';

export type ThemeName = keyof typeof themes;

function filenameFromTheme(themeName: ThemeName): string {
  return `Theme.${themeName}.json`;
}

const tokensByFile: FlattenedTokensByFile = {
  'System.Value.json': flattenTokens(systemTokens as any),
  [filenameFromTheme('core')]: flattenTokens(coreTokens as any),
  [filenameFromTheme('cmsgov')]: flattenTokens(cmsgovTokens as any),
  [filenameFromTheme('healthcare')]: flattenTokens(healthcareTokens as any),
  [filenameFromTheme('medicare')]: flattenTokens(medicareTokens as any),
};

const tokensByTheme = {
  core: coreTokens,
  cmsgov: cmsgovTokens,
  healthcare: healthcareTokens,
  medicare: medicareTokens,
};

export function getThemeColorValue(themeName: ThemeName, colorName: string): string {
  const filename = filenameFromTheme(themeName);
  let colorToken = tokensByFile[filename][`theme.color.${colorName}`];
  if (isAlias(colorToken.$value.toString())) {
    colorToken = resolveTokenAlias(colorToken, tokensByFile, filename);
  }
  return String(colorToken.$value);
}

export function getThemeColorName(themeName: ThemeName, colorValue: string): string | undefined {
  const colors = tokensByTheme[themeName].theme.color;
  return findKey(colors, (value) => String(value) === colorValue);
}

export function getComponentVariables(
  themeName: ThemeName,
  componentName: string
): Array<{
  token: Token;
  variableName: string;
  value: string;
  resolvedValue: string;
  resolvedToken: Token;
}> {
  const filename = filenameFromTheme(themeName);
  const tokenKeys = Object.keys(tokensByFile[filename]).filter((key) =>
    key.startsWith(`component.${componentName}.`)
  );
  const valueRenderConfig = {
    themeTokens: tokensByFile[filename],
    systemTokens: tokensByFile['System.Value.json'],
    renderVariableAlias: (name: string) => `--${tokenNameToVarName(name)}`,
  };
  return tokenKeys
    .map((tokenKey) => {
      const token = tokensByFile[filename][tokenKey];
      const resolvedToken = isAlias(token.$value.toString())
        ? resolveTokenAlias(token, tokensByFile, filename)
        : token;
      if (resolvedToken.$type === 'boolean') return null;
      return {
        token,
        variableName: valueRenderConfig.renderVariableAlias(tokenKey),
        value: tokenToCssValue(token, valueRenderConfig),
        resolvedValue: tokenToCssValue(resolvedToken, valueRenderConfig),
        resolvedToken,
      };
    })
    .filter((data) => data);
}

export function getSystemColorTokenFromValue(colorValue: string): string {
  const tokenKey = findKey(
    tokensByFile['System.Value.json'],
    ({ $value }) => String($value) === colorValue
  );
  return tokenKey.split('color.')[1];
}

export function getSystemColorsByCategoryAndTheme({
  colorCategories,
  themeName,
}: {
  colorCategories: string[];
  themeName: ThemeName;
}) {
  return colorCategories.map((colorName) => {
    const colorValue = getThemeColorValue(themeName, colorName);
    const systemColorToken = getSystemColorTokenFromValue(colorValue);
    return systemColorToken.split('.')[0];
  });
}

type ColorAttributes = {
  css: string;
  hex: string;
  figma: string;
  componentUsage?: string[];
};

type ColorCategoryUsage = {
  name: string;
  attributes: {
    key: string;
    label: string;
    value: string;
  }[];
};

const formatters = {
  css: (value: string) => {
    return `--color-${value.split('theme.color.')[1]}`;
  },
  hex: (colorToken: Token, tokensByFile: FlattenedTokensByFile, filename: string) => {
    const token = isAlias(colorToken.$value.toString())
      ? resolveTokenAlias(colorToken, tokensByFile, filename)
      : colorToken;
    return token.$value.toString();
  },
  figma: (value: string) => {
    const systemColorToken = getSystemColorTokenFromValue(value);
    return capitalize(systemColorToken).split('.').join(' ');
  },
  token: (value: string) => {
    return value.toLowerCase().split(' ').join('.');
  },
  attributes: (value: string | string[]) => {
    return typeof value === 'string' ? value : value.join(', ');
  },
  colors: (colors: ColorAttributes[]): ColorCategoryUsage[] => {
    return colors.map((color) => {
      const attributes = Object.entries(color).map(([key, value]) => {
        const labelLookup = {
          css: 'CSS:',
          hex: 'Hex:',
          figma: 'Figma:',
          componentUsage: 'Used in:',
        };

        return {
          key,
          label: labelLookup[key] as string,
          value: formatters.attributes(value),
        };
      });
      const systemToken = formatters.token(color.figma);
      return {
        name: systemToken,
        attributes,
      };
    });
  },
};

const sortByLuminance = (a: ColorAttributes, b: ColorAttributes) => {
  const aLuminance = luminanceFromHex(a.hex as HexValue);
  const bLuminance = luminanceFromHex(b.hex as HexValue);
  return bLuminance - aLuminance;
};

const determineComponentUsage = ({
  color,
  flattenedComponents,
}: {
  color: string;
  flattenedComponents: [string, Token][];
}) => {
  return flattenedComponents
    .filter(([, value]) => value.$value === `{${color}}`)
    .reduce((acc, [key]) => {
      // sample keys: `component.button-primary-text-color` or `component.usa-banner.security-icon.color`
      let componentName = key.split('.')[1];
      if (componentName.startsWith('button')) {
        componentName = 'Button';
      } else {
        componentName = componentName.split('-').map(capitalize).join(' ');
      }

      // If the component name is already in the list, don't add it again
      if (acc.find((component) => component === componentName)) {
        return acc;
      } else {
        return [...acc, componentName];
      }
    }, [] as string[]);
};

const getHexCodesByColorNames = (colorNames: string[]) => {
  return colorNames
    .map((colorName) => {
      const systemColorToken: Token = systemTokens.color[colorName];
      const systemHexCodes = Object.entries(systemColorToken)
        .filter(([key]) => !key.includes('alpha'))
        .map(([, token]) => ({
          hex: token.$value.toString() as string,
        }));

      return systemHexCodes;
    })
    .flat();
};

const includeNamedColorsInfo = ({
  namedColors,
  hexCodes,
}: {
  namedColors: ColorAttributes[];
  hexCodes: {
    hex: string;
  }[];
}): ColorAttributes[] => {
  return hexCodes.map(({ hex }) => {
    // namedColors potentially contains the component usage and css for each hex code
    const match = namedColors.find((color) => color.hex === hex);
    return {
      ...match,
      hex,
    };
  });
};

const filterHexCodesByComponentUsageAndColor = ({
  hexCodes,
  namedColors,
}: {
  hexCodes: ColorAttributes[];
  namedColors: ColorAttributes[];
}) => {
  return hexCodes.filter(({ hex }) => {
    // If the hex code is used in a component, don't include it in the list of available colors
    const matchByColorAndIsUsed = namedColors.some(({ hex: namedColorHex, componentUsage }) => {
      const matchedByColor = hex === namedColorHex;
      const isUsed = Boolean(componentUsage.length);
      return matchedByColor && isUsed;
    });
    return !matchByColorAndIsUsed;
  });
};

const matchAgainstColorCategories = ({
  hexCodes,
  colorCategories,
}: {
  hexCodes: ColorAttributes[];
  colorCategories: string[];
}) => {
  // only return the values where the css variable overlaps with color categories
  return hexCodes.filter(({ css }) => {
    return colorCategories.some((category) => css.includes(category));
  });
};

export function determineColorCategoryUsageByTheme({
  colorCategory,
  themeName,
  exactMatch = false,
}: {
  colorCategory: string | string[];
  themeName: ThemeName;
  exactMatch?: boolean;
}): { activeColors: ColorCategoryUsage[]; availableColors: ColorCategoryUsage[] } {
  const filename = filenameFromTheme(themeName);
  const flattenedThemeTokens = Object.entries(tokensByFile[filename]);
  const flattenedComponents = flattenedThemeTokens.filter(([key]) => key.includes(`component.`));
  const colorCategories = typeof colorCategory === 'string' ? [colorCategory] : colorCategory;

  const namedColors: ColorAttributes[] = flattenedThemeTokens
    .filter(([colorToken]) => {
      const filterByCategory = colorCategories.some((category) => {
        const colorCategoryKey = `theme.color.${category}`;
        return exactMatch ? colorToken === colorCategoryKey : colorToken.includes(colorCategoryKey);
      });
      return filterByCategory;
    })
    .map(([color, colorToken]) => {
      const hex = formatters.hex(colorToken, tokensByFile, filename);
      return {
        css: formatters.css(color),
        hex,
        figma: formatters.figma(hex),
        componentUsage: determineComponentUsage({ color, flattenedComponents }),
      };
    })
    .sort(sortByLuminance);

  const usedColors = namedColors.filter(({ componentUsage }) => Boolean(componentUsage.length));
  // sample colors are "sapphire, granite, persimmon, etc."
  const systemColors = getSystemColorsByCategoryAndTheme({ colorCategories, themeName });
  const systemColorHexCodes = getHexCodesByColorNames(systemColors);

  const systemHexCodesWithMoreInfo = includeNamedColorsInfo({
    hexCodes: systemColorHexCodes,
    namedColors,
  });

  const filteredHexCodes = filterHexCodesByComponentUsageAndColor({
    hexCodes: systemHexCodesWithMoreInfo,
    namedColors,
  });

  const formattedHexCodes = filteredHexCodes.map(({ hex, css }) => ({
    css: css ?? 'No CSS token',
    hex,
    figma: formatters.figma(hex),
  }));

  const unusedColors = exactMatch
    ? matchAgainstColorCategories({
        hexCodes: formattedHexCodes,
        colorCategories,
      })
    : formattedHexCodes;

  return {
    activeColors: formatters.colors(usedColors),
    availableColors: formatters.colors(unusedColors),
  };
}
