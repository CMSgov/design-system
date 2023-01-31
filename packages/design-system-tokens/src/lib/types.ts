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
// This is still not comprehensive
export type BorderRadiusValue =
  | MeasureValues
  | `${MeasureValues} ${MeasureValues}`
  | `${MeasureValues} ${MeasureValues} ${MeasureValues} ${MeasureValues}`;

export type Token<T> = {
  [key: string]: T | Token<T>;
};

export type AnimationTokens = Token<string | number>;
export type BorderRadiusTokens = Token<BorderRadiusValue>;
export type ColorTokens = Token<HexValue | RGBValue | RGBAValue | 'transparent' | 'inherit'>;
export type FontTokens = Token<string | number>;
export type MeasureTokens = Token<MeasureValues>;
export type MediaWidthTokens = Token<MeasureValues>;
export type ShadowTokens = Token<string>;
export type SpacerTokens = Token<MeasureValues>;
export type TimeTokens = Token<number>;
export type zIndexTokens = Token<number>;

export type AnyTokenValues = Token<any>;

export interface ThemeTokens {
  animation: AnimationTokens;
  color: ColorTokens;
  font: FontTokens;
  global?: AnyTokenValues;
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
  baseName: string;
}
