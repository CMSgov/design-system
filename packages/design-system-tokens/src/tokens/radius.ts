/*
 * CMSDS Border Radius Tokens
 */
import { BorderRadiusTokens, to } from '../lib/types';

const radius = to<BorderRadiusTokens>()({
  circle: '100%',
  default: '3px',
  large: '8px',
  medium: '4px',
  pill: '9999px',
  small: '2px',
});

export default radius;
