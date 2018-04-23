import { css } from 'emotion';
import variables from './variables';

export const sans = css`
  font-family: ${variables.sansSerifFont};
`;
export const serif = css`
  font-family: ${variables.serifFont};
`;
export const family = { sans, serif };

export const size = Object.keys(variables.fontSizes).reduce((obj, key) => {
  obj[key] = css`
    font-size: ${variables.fontSizes[key]};
  `;
  return obj;
}, {});

export const weight = Object.keys(variables.fontWeights).reduce((obj, key) => {
  obj[key] = css`
    font-weight: ${variables.fontWeights[key]};
  `;
  return obj;
}, {});

export const style = Object.keys(variables.fontStyles).reduce((obj, key) => {
  obj[key] = css`
    font-style: ${variables.fontStyles[key]};
  `;
  return obj;
}, {});

export const font = { family, size, weight, style };
export default font;
