export const to = <T extends object>() => {
  return <U extends T>(val: U) => val;
};

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

interface Token<T> {
  readonly [key: string | symbol]: T;
}

export type AnimationTokens = Token<string | number>;
export type BorderRadiusTokens = Token<PercentageValue | PxValue>;
export type ColorTokens = Token<HexValue | RGBValue | RGBAValue | 'transparent' | 'inherit'>;
export type FontTokens = Token<string | number>;
export type MeasureTokens = Token<MeasureValues>;
export type MediaWidthTokens = Token<PxValue>;
export type SpacerTokens = Token<PxValue>;
export type ShadowTokens = Token<string>;
export type TimeTokens = Token<number>;
export type zIndexTokens = Token<number>;

export type AllTokenValues =
  | AnimationTokens
  | FontTokens
  | MediaWidthTokens
  | ShadowTokens
  | TimeTokens
  | SpacerTokens
  | ColorTokens
  | PxValue
  | BorderRadiusTokens
  | zIndexTokens;

export interface ThemeTokens {
  animation: AnimationTokens;
  color: ColorTokens;
  components: AllTokenValues;
  description: string;
  font: FontTokens;
  globals?: Token<any>;
  measure: MeasureTokens;
  media: MediaWidthTokens;
  radius: BorderRadiusTokens;
  shadow: ShadowTokens;
  spacer: SpacerTokens;
  z: zIndexTokens;
}

export interface FileDescriptor {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
}
