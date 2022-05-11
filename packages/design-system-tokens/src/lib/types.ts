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
  | `${number}px`
  | `${number}%`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;

interface Token<T> {
  [key: string | symbol]: T;
}

export type AnimationTokens = Token<string | number>;
export type BorderRadiusTokens = Token<MeasureValues>;
export type ColorTokens = Token<object | HexValue | RGBValue | RGBAValue | 'transparent' | 'inherit'>;
export type FontTokens = Token<string | number>;
export type MeasureTokens = Token<MeasureValues>;
export type MediaWidthTokens = Token<MeasureValues>;
export type ShadowTokens = Token<string>;
export type SpacerTokens = Token<MeasureValues>;
export type TimeTokens = Token<number>;
export type zIndexTokens = Token<number>;

export type AllTokenValues =
  | AnimationTokens
  | BorderRadiusTokens
  | ColorTokens
  | FontTokens
  | MeasureTokens
  | MediaWidthTokens
  | ShadowTokens
  | SpacerTokens
  | TimeTokens
  | zIndexTokens;

export interface ThemeTokens {
  animation: AnimationTokens;
  color: ColorTokens;
  components: AllTokenValues;
  description: string;
  font: FontTokens;
  globals?: AllTokenValues;
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
