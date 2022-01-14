/*
 * types for color token definitions
 */
interface ColorToken {
  readonly [index: string]: `#${string}` | ColorToken
}

/*
 * CMSDS Color Tokens, organized by hue
 */
const Colors: ColorToken = {
  // singletons
  white: '#FFFFFF',
  black: '#000000',

  // gray 
  gray: {
    _000: '#111111',
    _100: '#333333',
    _200: '#555555',
    _300: '#777777',
    _400: '#999999',
    _500: '#AAAAAA',
    _600: '#CCCCCC',
  },
}

/*
 * returns a single hex value from a token namenature
 */
const getHex = (t: ColorToken) : string => { 
  let result = Colors.filter((k:string) => k === t)
  return result[0].val
}

/*
 * returns an rgb color value from a token namenature
 */
const getRgb = (name: ColorName) : string => {
  console.log(name)
  return ''
}

/*
 * returns an hsl color value from a token namenature
 */
const getHsl = (name: ColorName) : string => {
  console.log(name)
  return ''
}

/*
 * returns an array of sass variables with an optional prefix string
 * format is '$prefix-namenature: hex value'
 */
const exportSass = (prefix: string) : string[] => {
  return ColorTokens.map((e) => { return `$${prefix}${e.name}: ${e.val}` })
}

const Color = {
  data: ColorTokens,
  getHex: getHex,
  getRgb: getRgb,
  getHsl: getHsl,
  exportSass: exportSass
}

export default Color
