import { Tokens } from './'
import { Color, Spacing } from './'

const coreTheme = {
  'color': [
    { sig: 'black' },
    { sig: 'white' },
    { sig: 'grey-100', alias: 'primary-grey' },
    { sig: 'grey-400', rename: 'primary-text' },
  ],
  'font': [
    { sig: 'Helvetica-neue', rename: 'primary-font' },
    { sig: 'Open-Sans Regular', rename: 'secondary-font' },
  ],
  'spacing': { sig: 'all', prefix: 'spacer-' }
}

const createTheme = (t: Tokens[]) : Tokens | null => {
  console.log(t)
  return null
}

const exportTheme = (t: Tokens[]) : string[] | null => {
  console.log(t)
  return null
}

const Theme = {
  export: exportTheme,
  create: createTheme,
}

export default Theme
