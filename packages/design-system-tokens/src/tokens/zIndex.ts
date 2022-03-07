/*
 * CMSDS Z-Index Tokens
 */
import { zIndexTokens } from '../lib/types';

const makezIndex = <T extends zIndexTokens>(value: T) => {
  return value;
};

const zIndex = makezIndex({
  'z-deepdive': -99999,
  'z-default': 1,
  'z-dialog': 1000,
  'z-popup': 6000,
  'z-spinner': 9050,
});

export default zIndex;
