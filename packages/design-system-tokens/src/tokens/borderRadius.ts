/*
 * CMSDS Border Radius Tokens
 */
import { BorderRadiusTokens } from '../lib/types';

const makeRadii = <T extends BorderRadiusTokens>(value: T) => {
  return value;
};

const borderRadius = makeRadii({
  'radius-circle': '50%',
  'radius-large': '8px',
  'radius-medium': '4px',
  'radius-small': '2px',
});

export default borderRadius;
