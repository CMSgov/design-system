export type NumberType =
  | 'dimension_px'
  | 'dimension_ex'
  | 'dimension_rem'
  | 'dimension_%'
  | 'duration_ms'
  | 'number';

const PIXELS_PER_REM = 16;
const PIXELS_PER_EX = 8.5625;

export function pixelNumberToRem(pixels: number): string {
  return `${pixels / PIXELS_PER_REM}rem`;
}

export function pixelNumberToEx(pixels: number): string {
  return `${Math.round(pixels / PIXELS_PER_EX)}ex`;
}

export function dimensionToPixelNumber(tokenValue: string): number {
  if (typeof tokenValue === 'string') {
    let parsed;
    if (tokenValue.includes('rem')) {
      parsed = parseFloat(tokenValue) * PIXELS_PER_REM;
    } else if (tokenValue.includes('ex')) {
      parsed = Math.round(parseFloat(tokenValue) * PIXELS_PER_EX);
    } else {
      parsed = parseFloat(tokenValue);
    }

    if (!isNaN(parsed)) {
      return parsed;
    }
  }

  throw new Error(`Could not parse 'dimension' token value ${tokenValue}`);
}

export function durationToNumber(tokenValue: string): number {
  return parseInt(tokenValue);
}
