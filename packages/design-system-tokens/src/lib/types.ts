export type HexValue = `#${string}`;
export type MeasureValues =
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}%`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;
export type PxValue = `${number}px`;
export type ExValue = `${string}ex`;
export type PercentageValue = `${string}%`;

export type AllTokenValues = SpacerTokens | ColorTokens | PxValue;

export type AnimationTokens = {
  readonly [key: string]: string | number;
};

export type BorderRadiusTokens = {
  readonly [key: `radius-${string}`]: PercentageValue | PxValue;
};

export type MeasureTokens = {
  readonly [key: string | symbol]: MeasureValues;
};

export type MediaWidthTokens = {
  readonly [key: `width-${string}`]: PxValue;
};

export type ColorTokens = {
  readonly [key: string | symbol]: HexValue | RGBValue | RGBAValue;
};

export type SpacerTokens = {
  readonly [key: string | symbol]: PxValue;
};

export type ShadowTokens = {
  readonly [key: string | symbol]: string;
};

export type TimeTokens = {
  readonly [key: string | symbol]: number;
};

export type FontTokens = {
  readonly [key: string]: string | number;
};

export type zIndexTokens = {
  readonly [key: `${string}`]: number;
};

export interface ThemeTokens {
  readonly animation?: AnimationTokens;
  readonly color: ColorTokens;
  readonly components?: AllTokenValues;
  readonly description: string;
  readonly font?: FontTokens;
  readonly measure?: MeasureTokens;
  readonly shadow?: ShadowTokens;
  readonly spacer?: SpacerTokens;
}

export const to = <T extends object>() => {
  return <U extends T>(val: U) => val;
};

export interface FileDescriptor {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
}
