export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;
export type PxValue = `${number}px`;
export type ExValue = `${string}ex`;
export type PercentageValue = `${string}%`;

export type AllTokenValues = SpacingTokens | ColorTokens | PxValue;

export type AnimationTokens = {
  readonly [key: string]: string | number;
};

export type BorderRadiusTokens = {
  readonly [key: `radius-${string}`]: PercentageValue | PxValue;
};

export type MediaWidthTokens = {
  readonly [key: `width-${string}`]: PxValue;
};

export type SpacingTokens = {
  readonly [key: `spacer-${string}`]: PxValue;
};

export type ShadowTokens = {
  readonly [key: `shadow-${string}`]: string;
};

export type TimeTokens = {
  readonly [key: `duration-${string}`]: number;
};

export type ColorTokens = {
  readonly [key: string]: HexValue;
};

export interface FontTokens {
  readonly [key: string]: string | number;
}

export interface Theme {
  readonly name: string;
  readonly tokens: ThemeTokens;
}

export interface ThemeTokens {
  readonly description: string;
  readonly colors: ColorTokens;
  readonly spacers: SpacingTokens;
  readonly components: AllTokenValues;
  readonly shadows: ShadowTokens;
}

export const makeAnimationTypes = <T extends AnimationTokens>(value: T) => {
  return value;
};
export const makeColorTypes = <T extends ColorTokens>(value: T) => {
  return value;
};
export const makeFontTypes = <T extends FontTokens>(value: T) => {
  return value;
};
export const makeMediaTypes = <T extends MediaWidthTokens>(value: T) => {
  return value;
};
export const makeRadiusTypes = <T extends BorderRadiusTokens>(value: T) => {
  return value;
};
export const makeSpacingTypes = <T extends SpacingTokens>(value: T) => {
  return value;
};
export const makeTimeTypes = <T extends TimeTokens>(value: T) => {
  return value;
};
export const makeThemeTypes = <T extends ThemeTokens>(value: T) => {
  return value;
};
export const makeZindexTypes = <T extends zIndexTokens>(value: T) => {
  return value;
};

export interface FileDescriptor {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
}

export type zIndexTokens = {
  readonly [key: `z-${string}`]: number;
};
