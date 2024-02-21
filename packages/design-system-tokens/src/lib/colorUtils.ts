/*
 * Token utilities that do not require any outside dependencies (node, npm, etc..)
 */

import { HexValue } from './types';

export interface RgbaObject {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export function rgbToHex({ r, g, b, a = 1 }: RgbaObject) {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join('');
  return `#${hex}` + (a !== 1 ? toHex(a) : '');
}

const hexRegex = /^#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2}){0,1}$/;
const hexShorthandRegex = /^#([A-Fa-f0-9]{3})([A-Fa-f0-9]){0,1}$/;

export function isHex(color: string): color is HexValue {
  return hexRegex.test(color) || hexShorthandRegex.test(color);
}

export function hexToRgba(color: string): RgbaObject {
  color = color.trim();

  if (!(hexRegex.test(color) || hexShorthandRegex.test(color))) {
    throw new Error('Invalid color format');
  }

  const hexValue = color.substring(1);
  const expandedHex =
    hexValue.length === 3 || hexValue.length === 4
      ? hexValue
          .split('')
          .map((char) => char + char)
          .join('')
      : hexValue;

  const alphaValue = expandedHex.length === 8 ? expandedHex.slice(6, 8) : undefined;

  return {
    r: parseInt(expandedHex.slice(0, 2), 16) / 255,
    g: parseInt(expandedHex.slice(2, 4), 16) / 255,
    b: parseInt(expandedHex.slice(4, 6), 16) / 255,
    ...(alphaValue ? { a: parseInt(alphaValue, 16) / 255 } : {}),
  };
}

/**
 * Transforms a 6 char hex value to an 8 char hex value with opacity
 *
 * @param hexVal - The hex value to be converted
 * @param opacity - The opacity as a float value from 0 to 1
 * @returns An 8 character hex value which includes opacity
 */
export const hexOpacity = (hexVal: HexValue | any, opacity: number): HexValue => {
  const percent = Math.max(0, Math.min(100, opacity * 100));
  const intVal = Math.round((percent / 100) * 255);
  const hexOpacity = intVal.toString(16).padStart(2, '0');
  return `${hexVal}${hexOpacity}` as HexValue;
};

/**
 * Returns whether a hex value has an alpha (transparency) channel
 *
 * @param hex - The hex value string to evaluate
 * @returns boolean
 */
export const hexHasTransparency = (hex: HexValue): boolean => {
  const alpha = hexToRgba(hex)?.a ?? null;
  return alpha != null && Number.isInteger(alpha);
};

/*
 * Returns the calculated relative luminance based on a WCAG 2.x algorithm
 * (https://www.w3.org/WAI/GL/wiki/Relative_luminance), which is outdated
 * now but is good enough.
 */
export const luminanceFromRgb = ({ r, g, b }: RgbaObject): number => {
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const luminanceFromHex = (hex: HexValue): number | null => {
  const rgba = hexToRgba(hex);
  if (rgba) {
    return luminanceFromRgb(rgba);
  } else {
    return null;
  }
};

export const pickTextColor = (background: HexValue, lightText: string, darkText: string) => {
  const luminance = luminanceFromHex(background);
  return luminance == null || luminance > 0.24 ? darkText : lightText;
};
