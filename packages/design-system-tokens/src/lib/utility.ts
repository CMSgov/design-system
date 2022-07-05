/*
 * Token utilities that do not require any outside dependencies (node, npm, etc..)
 */

import { HexValue } from './types';

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
 * Converts a hex string '#F3G1AA' to an rgb value array [142, 24, 89]
 *
 * @param hex - The hex value string to evaluate
 * @returns An array in the format [R: number, G: number, B: number] or null if there was an error
 */
export const hexToRgbArray = (hex: HexValue): number[] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return [r, g, b];
  } else {
    return null;
  }
};

/**
 * Flattens an object into a single dimension by reducing into initialObject recursively
 *
 * @param obj - The object to be flattened
 * @param initialObject - The initial object to append to
 * @returns The initial object and subobjects as an object with no subobjects
 */
export const flatten = (
  obj: Record<string, any>,
  initialObject: Record<string, any> = {}
): Record<string, any> => {
  Object.entries(obj).reduce((accumulator, [key, val]) => {
    if (typeof val === 'object') {
      flatten(val, accumulator);
    } else {
      initialObject[key] = val;
    }
    return accumulator;
  }, initialObject);

  return initialObject;
};
