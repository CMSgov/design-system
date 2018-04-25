import { variables } from './variables';
const { breakpoints } = variables;

const multiplesArray = new Array(7).fill(0).map((_, i) => i + 1);

export const variationRules = (variations, fn) =>
  variations.map(v => fn(v + 1)).join('');

export const breakpointVariationRules = (variations, fns) =>
  Object.keys(breakpoints)
    .map(breakpoint => {
      const rules = fns
        .map(fn => variations.map(v => fn(breakpoint, v)).join('\n'))
        .join('\n');
      const minWidth = breakpoints[breakpoint];
      return `@media (min-width: ${minWidth}) {\n  ${rules}\n}`;
    })
    .join('\n');

export const breakpointRules = fns =>
  Object.keys(breakpoints)
    .map(breakpoint => {
      const rules = fns.map(fn => fn(breakpoint)).join('\n');
      const minWidth = breakpoints[breakpoint];
      return `@media (min-width: ${minWidth}) {\n  ${rules}\n}`;
    })
    .join('\n');

export const multipleRules = fn => variationRules(multiplesArray, fn);
export const breakpointMultipleRules = fns =>
  breakpointVariationRules(multiplesArray, fns);
