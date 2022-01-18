import * as Token from '../../tokens/'

export const TOKEN_TYPE = 'theme'
export const THEME_NAME = 'default'

const makeTheme = <T extends Token.Types.Theme>(value: T) => { return value }

const coreTheme = makeTheme({
  color: {
    'color-white': Token.Color.white,
    'color-black': Token.Color.black,
    'color-gray': Token.Color['color-neutral-500'],
  },
  spacing: { ...Token.Spacing },
})

export default coreTheme
