export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;
export type PxValue = `${number}px`;
export type ExValue = `${string}ex`;
export type PercentageValue = `${string}%`;

export type AllTokenValues = SpacingTokens | HexColorTokens | PxValue;

export type AnimationTokens = {
  readonly [key: string]: string | number;
}

export interface BorderRadiusTokens {
  readonly [key: `radius-${string}`]: PercentageValue | PxValue;
}

export interface SpacingTokens {
  readonly [key: `spacer-${string}`]: PxValue;
};

export interface ShadowTokens {
  readonly [key: `shadow-${string}`]: string;
}

export type TimeTokens = {
  readonly [key: `duration-${string}`]: number;
}

export interface HexColorTokens {
  readonly [key: string]: HexValue;
};

export interface FontTokens {
  readonly family: { [key: string]: string };
  readonly size: { [key: string]: PxValue };
  readonly lineHeight: { [key: string]: `${number}` };
  readonly weight: { [key: string]: `${number}` };
  readonly measure: { [key: string]: ExValue };
};

export interface Theme {
  readonly name: string;
  readonly tokens: ThemeTokens;
};

export interface ThemeTokens {
  readonly description: string;
  readonly color: HexColorTokens;
  readonly spacing: SpacingTokens;
  readonly components: AllTokenValues;
  shadows: ShadowTokens;
};

export interface FileDescriptor {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
};
