import { css } from 'emotion';
import variables from './variables';

const { lineHeights } = variables;

export const lineHeight = Object.keys(lineHeights).reduce((obj, key) => {
  obj[key] = css`
    line-height: ${lineHeights[key]};
  `;
  return obj;
}, {});
