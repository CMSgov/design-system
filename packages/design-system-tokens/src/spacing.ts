import { Token } from './token'

type Spacer = Token<string, number>

const base = 8

const spacingTokens : Spacer[] = [
  { name: 'spacer-none', val: 0 },
  { name: 'spacer-half', val: base/2 },
  { name: 'spacer-1', val: base },
  { name: 'spacer-2', val: base*2 },
  { name: 'spacer-3', val: base*3 },
  { name: 'spacer-4', val: base*4 },
  { name: 'spacer-5', val: base*5 },
  { name: 'spacer-6', val: base*6 },
  { name: 'spacer-7', val: base*7 },
]

const exportSass = (prefix: string) => { 
  return spacingTokens.map((e) => { return `$${prefix}${e.name}: ${e.val}` })
}

const Spacing = {
  data: spacingTokens,
  exportSass: exportSass, 
}

export default Spacing
