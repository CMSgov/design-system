/*
 * CMSDS Animation Tokens
 */
import { AnimationTokens, to } from '../lib/types';
import time from './time';

const SPEED_BASE = 1;

const animation = to<AnimationTokens>()({
  'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
  'speed-base': 1,
  'speed-1': `${time['duration-faster'] * SPEED_BASE}s`,
  'speed-2': `${time['duration-fast'] * SPEED_BASE}s`,
  'speed-3': `${time['duration-medium'] * SPEED_BASE}s`,
  'speed-4': `${time['duration-slow'] * SPEED_BASE}s`,
});

export default animation;
