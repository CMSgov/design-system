import colorTokens from 'design-system-tokens/src/tokens/color';
import findKey from 'lodash/findKey';
import {
  CoreTheme,
  CoreComponentTheme,
  HealthcareTheme,
  HealthcareComponentTheme,
  MedicareTheme,
  MedicareComponentTheme,
  CmsgovTheme,
  CmsgovComponentTheme,
} from 'design-system-tokens/src/themes';

export const themeTokens = {
  core: { ...CoreTheme, components: CoreComponentTheme },
  healthcare: { ...HealthcareTheme, components: HealthcareComponentTheme },
  medicare: { ...MedicareTheme, components: MedicareComponentTheme },
  cmsgov: { ...CmsgovTheme, components: CmsgovComponentTheme },
};

export type ThemeName = keyof typeof themeTokens;

export function getThemeColorValue(themeName: ThemeName, colorName: string): string {
  return String(themeTokens[themeName].color[colorName]);
}

export function getThemeColorName(themeName: ThemeName, colorValue: string): string | undefined {
  return findKey(themeTokens[themeName].color, (value) => String(value) === colorValue);
}

export function getComponentVariables(themeName: ThemeName, componentName: string) {
  return themeTokens[themeName].components[componentName];
}

export function getSystemColorTokenFromValue(colorValue: string): string {
  return findKey(colorTokens, (value) => String(value) === colorValue);
}
