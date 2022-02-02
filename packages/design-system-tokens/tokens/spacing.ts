import * as Types from '../lib/types'

export const TOKEN_TYPE = 'spacing'

const makeSpacers = <T extends Types.SpacingToken>(value: T) => { return value }

const Spacing  = makeSpacers({
  'spacer-none': '0px',
  'spacer-half': '4px',
  'spacer-1': '8px',
  'spacer-2': '16px',
  'spacer-3': '24px',
  'spacer-4': '32px',
  'spacer-5': '40px',
  'spacer-6': '48px',
  'spacer-7': '56px',
})

export default Spacing
