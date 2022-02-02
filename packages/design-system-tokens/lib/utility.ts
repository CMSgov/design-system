import * as Types from './types' 

export const RgbToHex = (r: number, g: number, b: number): Types.HexValue => {
  let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}` 
}

export const HexToRgb = (hex: Types.HexValue): Types.RGBValue | null => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(result){
      let r= parseInt(result[1], 16);
      let g= parseInt(result[2], 16);
      let b= parseInt(result[3], 16);
      return `rgb(${r},${g},${b})`
  } 
  return null;
}

