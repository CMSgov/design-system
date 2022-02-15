export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type PxValue = `${number}px`;

export type SpacingTokens = {
  readonly [key: `spacer-${string}`]: PxValue;
};

export type HexColorTokens = {
  readonly [key: string]: HexValue;
};

export type Theme = {
  readonly name: string;
  readonly tokens: ThemeTokens;
};

export type ThemeTokens = {
  readonly color: HexColorTokens;
  readonly spacing: SpacingTokens;
};

export type FileDescriptor = {
  moduleImportName: string;
  parentDirectoryName: string;
  fileBaseName: string;
  exportFileName: string;
};
