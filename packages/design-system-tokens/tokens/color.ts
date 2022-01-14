/*
 * CMSDS Color Tokens, organized by hue
 */
import * as Token from '.'

const makeColors = <T extends Token.Types.HexValues>(value: T) => { return value }

const Color = makeColors({
  // singletons
  'white': '#FFFFFF',
  'black': '#000000',
  // gray 
  'gray-000': '#111111',
  'gray-100': '#333333',
  'gray-200': '#555555',
  'gray-300': '#777777',
  'gray-400': '#999999',
  'gray-500': '#AAAAAA',
  'gray-600': '#CCCCCC',
})

export default Color
