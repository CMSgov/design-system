import * as Token from '.'

const coreTheme: Token.Types.Theme = {
  color: {
    'primary-color': Token.Color['gray-400'],
    'secondary-color': Token.Color.white,
  },
  spacing: { ...Token.Spacing },
}

export default coreTheme
