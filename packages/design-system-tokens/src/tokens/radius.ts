/*
 * CMSDS Border Radius Tokens
 */
import { BorderRadiusTokens } from '../lib/types';

const makeRadii = <T extends BorderRadiusTokens>(value: T) => {
  return value;
};

const radius = makeRadii({
  default: '3px',
  pill: '9999px',
  circle: '100%',
  large: '8px',
  medium: '4px',
  small: '2px',
});

export default radius;
