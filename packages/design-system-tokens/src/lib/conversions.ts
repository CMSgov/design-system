const PIXELS_PER_REM = 16;
// Using a fixed scale here to convert into pixels for Figma, but in real applications in
// the browser, element widths defined in `ex` will vary in width depending on the font
// being used, which just means they could be slightly different than the designs.
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
