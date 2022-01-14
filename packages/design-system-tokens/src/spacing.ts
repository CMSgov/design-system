import { Tokens } from './token'

const spacingTokens : Tokens<string, number> = [
  { sig: 'spacer', val: 4, type: 'spacing'},
  { sig: 'spacer', val: 8, type: 'spacing'},
  { sig: 'spacer', val: 16, type: 'spacing'},
  { sig: 'spacer', val: 24, type: 'spacing'},
  { sig: 'spacer', val: 32, type: 'spacing'},
  { sig: 'spacer', val: 40, type: 'spacing'},
  { sig: 'spacer', val: 48, type: 'spacing'},
  { sig: 'spacer', val: 56, type: 'spacing'},
]

const exportSass = (prefix: string) => { 
  return spacingTokens.map((e) => { return `$${prefix}${e.sig}: ${e.val}` })
}

const Spacing = {
  data: spacingTokens,
  exportSass: exportSass, 
}

export default Spacing
