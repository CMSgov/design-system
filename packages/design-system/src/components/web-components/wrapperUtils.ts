export function parseBooleanAttr(attr?: string) {
  // If it's defined but has no value, we count that as `true`.
  return attr !== undefined && attr !== 'false';
}

export function parseDateAttr(attr?: string): Date | undefined {
  return attr ? new Date(attr) : undefined;
}

export function parseIntegerAttr(attr?: string): number | undefined {
  if (attr !== undefined) return parseInt(attr);
}

export function parseJsonAttr(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON attribute:', e);
    return [];
  }
}
