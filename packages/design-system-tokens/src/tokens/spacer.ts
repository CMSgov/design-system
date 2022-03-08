/*
 * CMSDS Spacing Tokens
 */
import { SpacingTokens } from '../lib/types';

const makeSpacers = <T extends SpacingTokens>(value: T) => {
  return value;
};

const spacer = makeSpacers({
  none: '0px',
  half: '4px',
  '1': '8px',
  '2': '16px',
  '3': '24px',
  '4': '32px',
  '5': '40px',
  '6': '48px',
  '7': '56px',
});

export default spacer;
