export function parseBooleanAttr(attr?: string): boolean {
  return parseOptionalBooleanAttr(attr) ?? false;
}

/**
 * Like `parseBooleanAttr`, but tells an absent attribute apart from one set to `false`.
 * Use it for props where `undefined` means something other than `false` — an analytics
 * prop that defers to the config, or a `checked` prop that leaves the component
 * uncontrolled.
 */
export function parseOptionalBooleanAttr(attr?: string): boolean | undefined {
  if (attr === undefined) return undefined;

  // If it's defined but has no value, we count that as `true`.
  return attr !== 'false';
}

export function parseDateAttr(attr?: string): Date | undefined {
  return attr ? new Date(attr) : undefined;
}

export function parseIntegerAttr(attr?: string): number | undefined {
  if (attr !== undefined) return parseInt(attr);
}

export function parseJsonAttr(attr?: string): any | string | undefined {
  if (attr === undefined) return undefined;

  const isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  return isJsonString(attr) ? JSON.parse(attr) : attr;
}
