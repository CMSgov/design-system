import { Tokens } from './'
import { Color, Spacing } from './'

const coreTheme = {
  'color': [
    { name: 'black' },
    { name: 'white' },
    { name: 'grey-100', alias: 'primary-grey' },
    { name: 'grey-400', rename: 'primary-text' },
  ],
  'font': [
    { name: 'Helvetica-neue', rename: 'primary-font' },
    { name: 'Open-Sans Regular', rename: 'secondary-font' },
  ],
  'spacing': { name: 'all', prefix: 'spacer-' }
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
