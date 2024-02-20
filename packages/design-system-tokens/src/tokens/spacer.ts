/*
 * CMSDS Spacing Tokens
 */
import { to, SpacerTokens } from '../lib/types';

export const spacer = to<SpacerTokens>()({
  none: '0px',
  half: '4px',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
});

