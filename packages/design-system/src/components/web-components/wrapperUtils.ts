export function parseBooleanAttr(attr?: string) {
  // If it's defined but has no value, we count that as `true`.
  return attr !== undefined && attr !== 'false';
}

export function parseIntegerAttr(attr?: string) {
  return attr !== undefined && parseInt(attr);
}
