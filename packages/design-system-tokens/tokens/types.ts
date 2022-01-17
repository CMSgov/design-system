export type SpacingValues = {
  readonly [key: `spacer-${string}`]: `${number}px`
}

export type HexValues = {
  readonly [key: string]: `#${string}`
}

export type Theme = {
  readonly color: HexValues
  readonly spacing: SpacingValues
}
