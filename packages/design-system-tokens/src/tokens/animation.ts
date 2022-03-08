/*
 * CMSDS Animation Tokens
 */
import { AnimationTokens } from '../lib/types';
import time from './time';

const SPEED_BASE = 1;

const makeAnimation = <T extends AnimationTokens>(value: T) => {
  return value;
};

const animation = makeAnimation({
  'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
  'speed-base': 1,
  'speed-1': time['duration-faster'] * SPEED_BASE,
  'speed-2': time['duration-fast'] * SPEED_BASE,
  'speed-3': time['duration-fast'] * SPEED_BASE,
  'speed-4': time['duration-slow'] * SPEED_BASE,
});

export default animation;
