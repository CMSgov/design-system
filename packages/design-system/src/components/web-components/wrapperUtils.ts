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

export function parseJsonAttr(attr?: string): any | string | undefined {
  const isJsonString = (str?: string): boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  return isJsonString(attr) ? JSON.parse(attr) : attr;
}
