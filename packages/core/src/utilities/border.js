import { css } from 'emotion';
import variables from './variables';

export const radius = css`
  border-radius: ${variables.borderRadius};
`;

export const color = Object.keys(variables.colors).reduce(
  (utility, colorName) => {
    const color = variables.colors[colorName];
    utility[colorName] = css`
      border-color: ${color};
    `;
    return utility;
  },
  {}
);

export const border = { color, radius };
export default border;
