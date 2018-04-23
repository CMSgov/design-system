import { css } from 'emotion';
import variables from './variables';

function createUtility(cssFunction) {
  return Object.keys(variables.colors).reduce((utility, colorName) => {
    const color = variables.colors[colorName];
    utility[colorName] = cssFunction(color);
    return utility;
  }, {});
}

export const fill = createUtility(
  color =>
    css`
      background-color: ${color} !important;
    `
);
export const color = createUtility(
  color =>
    css`
      color: ${color} !important;
    `
);
