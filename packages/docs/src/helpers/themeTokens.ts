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

export type ThemeName = keyof typeof themes;

function filenameFromTheme(themeName: ThemeName): string {
  return `Theme.${themeName}.json`;
}

const tokensByFile: FlattenedTokensByFile = {
  'System.value.json': flattenTokens(systemTokens as any),
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
  return tokenKeys.map((tokenKey) => {
    const token = tokensByFile[filename][tokenKey];
    const resolvedToken = isAlias(token.$value.toString())
      ? resolveTokenAlias(token, tokensByFile, filename)
      : token;
    return {
      token,
      variableName: valueRenderConfig.renderVariableAlias(tokenKey),
      value: tokenToCssValue(token, valueRenderConfig),
      resolvedValue: tokenToCssValue(resolvedToken, valueRenderConfig),
    };
  });
}

export function getSystemColorTokenFromValue(colorValue: string): string {
  const tokenKey = findKey(
    tokensByFile['System.Value.json'],
    ({ $value }) => String($value) === colorValue
  );
  return tokenKey.split('color.')[1];
}
