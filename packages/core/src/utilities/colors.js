import { colorVariations } from './utilities';
import { css } from 'emotion';

export const fill = colorVariations(
  color =>
    css`
      background-color: ${color} !important;
    `
);
export const color = colorVariations(
  color =>
    css`
      color: ${color} !important;
    `
);
