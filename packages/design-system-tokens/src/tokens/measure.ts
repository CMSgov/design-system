/*
 * CMSDS Measure Tokens
 */
import { MeasureTokens, to } from '../lib/types';

export const measure = to<MeasureTokens>()({
  narrow: '45ex',
  base: '65ex',
  wide: '80ex',
});
