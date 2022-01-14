import { Tokens } from './token'

/*
 * types for color token definitions
 */
type ColorSignature = `${string}-${number}${number}${number}` | string
type ColorVal = `#${string}`

/*
 * CMSDS Color Tokens, organized by hue
 */
const ColorTokens: Tokens<ColorSignature,ColorVal> = [
  // singletons
  {sig: 'white',    val: '#FFFFFF', type: 'color'},
  {sig: 'black',    val: '#000000', type: 'color'},
  // grey 
  {sig: 'grey-000', val: '#111111', type: 'color'},
  {sig: 'grey-100', val: '#333333', type: 'color'},
  {sig: 'grey-200', val: '#555555', type: 'color'},
  {sig: 'grey-300', val: '#777777', type: 'color'},
  {sig: 'grey-400', val: '#999999', type: 'color'},
  {sig: 'grey-500', val: '#AAAAAA', type: 'color'},
  {sig: 'grey-600', val: '#CCCCCC', type: 'color'},
]

/*
 * returns a single hex value from a token signature
 */
const getHex = (sig: ColorSignature) : string => { 
  let result = ColorTokens.filter(s => s.sig === sig)
  return result[0].val
}

/*
 * returns an rgb color value from a token signature
 */
const getRgb = (sig: ColorSignature) : string => {
  console.log(sig)
  return ''
}

/*
 * returns an hsl color value from a token signature
 */
const getHsl = (sig: ColorSignature) : string => {
  console.log(sig)
  return ''
}

/*
 * returns an array of sass variables with an optional prefix string
 * format is '$prefix-signature: hex value'
 */
const exportSass = (prefix: string) : string[] => {
  return ColorTokens.map((e) => { return `$${prefix}${e.sig}: ${e.val}` })
}

const Color = {
  data: ColorTokens,
  getHex: getHex,
  getRgb: getRgb,
  getHsl: getHsl,
  exportSass: exportSass
}

export default Color
