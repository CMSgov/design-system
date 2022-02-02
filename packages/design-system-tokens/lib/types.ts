export type HexValue = `#${string}`;
export type RGBValue = `rgb(${number},${number},${number})`;
export type PxValue = `${number}px`;

export type SpacingToken = {
  readonly [key: `spacer-${string}`]: PxValue;
};

export type HexColorToken = {
  readonly [key: string]: HexValue;
};

export type Theme = {
  readonly name: string;
  readonly tokens: ThemeTokens;
};

export type ThemeTokens = {
  readonly color: HexColorToken;
  readonly spacing: SpacingToken;
};
