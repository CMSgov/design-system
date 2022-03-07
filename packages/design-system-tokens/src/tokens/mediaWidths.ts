/*
 * CMSDS Media Width Tokens
 */
import { MediaWidthTokens } from '../lib/types';

const makeMediaWidths = <T extends MediaWidthTokens>(value: T) => {
  return value;
};

const mediaWidths = makeMediaWidths({
  'width-xs': '0px',
  'width-sm': '544px',
  'width-md': '768px',
  'width-lg': '1024px',
  'width-xl': '1280px',
});

export default mediaWidths;
