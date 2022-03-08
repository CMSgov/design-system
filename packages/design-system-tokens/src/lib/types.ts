export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;
export type PxValue = `${number}px`;
export type ExValue = `${string}ex`;
export type PercentageValue = `${string}%`;

export type AllTokenValues = SpacingTokens | HexColorTokens | PxValue;

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

export type HexColorTokens = {
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
  readonly color: HexColorTokens;
  readonly spacer: SpacingTokens;
  readonly components: AllTokenValues;
  readonly shadow: ShadowTokens;
}

export const makeTheme = <T extends ThemeTokens>(value: T) => {
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
