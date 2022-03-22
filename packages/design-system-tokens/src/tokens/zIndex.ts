/*
 * CMSDS Z-Index Tokens
 */
import { makeZindexTypes } from '../lib/types';

const zIndex = makeZindexTypes({
  deepdive: -99999,
  default: 1,
  dialog: 1000,
  popup: 6000,
  spinner: 9050,
});

export default zIndex;
