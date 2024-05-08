export function parseBooleanAttr(attr?: string) {
  // If it's defined but has no value, we count that as `true`.
  return attr !== undefined && attr !== 'false';
}

export function parseIntegerAttr(attr?: string): number | undefined {
  if (attr !== undefined) return parseInt(attr);
}
