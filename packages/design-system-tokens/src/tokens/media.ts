/*
 * CMSDS Media Width Tokens
 */
import { to, MediaWidthTokens } from '../lib/types';

const media = to<MediaWidthTokens>()({
  'width-xs': '0px',
  'width-sm': '544px',
  'width-md': '768px',
  'width-lg': '1024px',
  'width-xl': '1280px',
});

export default media;
