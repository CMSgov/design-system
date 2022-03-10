/*
 * CMSDS Border Radius Tokens
 */
import { makeRadiusTypes } from '../lib/types';

const radius = makeRadiusTypes({
  default: '3px',
  pill: '9999px',
  circle: '100%',
  large: '8px',
  medium: '4px',
  small: '2px',
});

export default radius;
