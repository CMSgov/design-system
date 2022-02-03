/*
 * CMSDS Color Tokens, organized by hue
 */
import * as Types from '../lib/types'

const makeColors = <T extends Types.HexColorToken>(value: T) => { return value }

const color = makeColors({
  // singletons
  'white': '#FFFFFF',
  'black': '#000000',
  // Neutrals
  'color-neutral-0':   '#FFFFFF',
  'color-neutral-50':  '#efeff0',
  'color-neutral-100': '#ced0d3',
  'color-neutral-200': '#adb0b5',
  'color-neutral-300': '#8c9097',
  'color-neutral-400': '#6b717a',
  'color-neutral-500': '#5B616B',
  'color-neutral-600': '#525760',
  'color-neutral-700': '#40444b',
  'color-neutral-800': '#2e3136',
  'color-neutral-900': '#1b1d20',
  'color-neutral-1000':'#090a0b',
  'color-neutral-1100':'#000000',
  // Grayscale
  'color-grayscale-0':   '#FFFFFF',
  'color-grayscale-50':  '#f2f2f2',
  'color-grayscale-100': '#d9d9d9',
  'color-grayscale-200': '#c0c0c0',
  'color-grayscale-300': '#a6a6a6',
  'color-grayscale-400': '#8d8d8d',
  'color-grayscale-500': '#808080',
  'color-grayscale-600': '#737373',
  'color-grayscale-700': '#5a5a5a',
  'color-grayscale-800': '#404040',
  'color-grayscale-900': '#262626',
  'color-grayscale-1000':'#0d0d0d',
  'color-grayscale-1100':'#000000',
  // Primary / Brand
  // core
  'color-blue-50':  '#e6f1f8',
  'color-blue-100': '#b3d4eb',
  'color-blue-200': '#80b8de',
  'color-blue-300': '#4d9cd0',
  'color-blue-400': '#1a7fc3',
  'color-blue-500': '#0071BC',
  'color-blue-600': '#0066a9',
  'color-blue-700': '#004f84',
  'color-blue-800': '#00395e',
  'color-blue-900': '#002238',
  'color-blue-1000':'#000b13',
})

export default color
