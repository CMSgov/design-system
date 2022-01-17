import * as Token from '.'

const makeTheme = <T extends Token.Types.Theme>(value: T) => { return value }

const coreTheme = makeTheme({
  color: {
    'primary-color': Token.Color['gray-400'],
    'secondary-color': Token.Color.white,
  },
  spacing: { ...Token.Spacing },
})

export default coreTheme
