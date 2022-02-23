export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type RGBAValue = `rgba(${number},${number},${number},${number})`;
export type PxValue = `${number}px`;

export type SpacingTokens = {
  readonly [key: `spacer-${string}`]: PxValue;
};

export type HexColorTokens = {
  readonly [key: string]: HexValue;
};

export type AllTokenValues = SpacingTokens | HexColorTokens;

export type Theme = {
  readonly name: string;
  readonly tokens: ThemeTokens;
};

export type Component = {
  readonly [key: string]: AllTokenValues;
};

export type ThemeTokens = {
  readonly description: string;
  readonly color: HexColorTokens;
  readonly spacing: SpacingTokens;
  readonly components: Component[];
};

export type FileDescriptor = {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
};
