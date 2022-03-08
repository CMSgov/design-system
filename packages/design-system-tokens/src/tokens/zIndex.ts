/*
 * CMSDS Z-Index Tokens
 */
import { zIndexTokens } from '../lib/types';

const makezIndex = <T extends zIndexTokens>(value: T) => {
  return value;
};

const zIndex = makezIndex({
  deepdive: -99999,
  default: 1,
  dialog: 1000,
  popup: 6000,
  spinner: 9050,
});

export default zIndex;
