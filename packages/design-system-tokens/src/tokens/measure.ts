/*
 * CMSDS Measure Tokens
 */
import { MeasureTokens, to } from '../lib/types';

const measure = to<MeasureTokens>()({
  narrow: '45ex',
  base: '65ex',
  wide: '80ex',
});

export default measure;
