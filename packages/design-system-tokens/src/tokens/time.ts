/*
 * CMSDS Time Tokens
 */
import { TimeTokens } from '../lib/types';

const makeTime = <T extends TimeTokens>(value: T) => {
  return value;
};

// in seconds
const time = makeTime({
  'duration-instantly': 0,
  'duration-immediately': 0.05,
  'duration-faster': 0.25,
  'duration-fast': 0.3,
  'duration-medium': 0.5,
  'duration-slow': 0.8,
  'duration-second': 1,
  'duration-paused': 3.2,
});

export default time;
