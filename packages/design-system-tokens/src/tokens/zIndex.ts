/*
 * CMSDS Z-Index Tokens
 */
import { to, zIndexTokens } from '../lib/types';

const z = to<zIndexTokens>()({
  deep: -99999,
  default: 1,
  drawer: 500,
  dialog: 1000,
  popup: 6000,
  spinner: 9050,
});

export default z;
