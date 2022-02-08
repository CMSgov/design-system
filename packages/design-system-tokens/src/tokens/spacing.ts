/*
 * CMSDS Spacing Tokens
 */
import { SpacingTokens } from '../lib/types';

const makeSpacers = <T extends SpacingTokens>(value: T) => {
  return value;
};

const spacing = makeSpacers({
  'spacer-none': '0px',
  'spacer-half': '4px',
  'spacer-1': '8px',
  'spacer-2': '16px',
  'spacer-3': '24px',
  'spacer-4': '32px',
  'spacer-5': '40px',
  'spacer-6': '48px',
  'spacer-7': '56px',
});

export default spacing;
