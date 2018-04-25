import { variables } from './variables';
const { breakpoints } = variables;

const multiplesArray = new Array(7).fill(0).map((_, i) => i + 1);

const convertCase = str =>
  str
    .split(/(?=[A-Z])/g)
    .map(word => word.charAt(0).toLowerCase() + word.substring(1))
    .join('-');

const variationName = v => (typeof v === 'string' ? convertCase(v) : v);

export const variationRules = (variations, fn) =>
  variations.map(v => fn(variationName(v), v)).join('\n');

export const multipleRules = fn => variationRules(multiplesArray, fn);

export const breakpointRules = fns =>
  Object.keys(breakpoints)
    .map(breakpoint => {
      const rules = fns.map(fn => fn(breakpoint)).join('\n');
      const minWidth = breakpoints[breakpoint];
      return `@media (min-width: ${minWidth}) {\n  ${rules}\n}`;
    })
    .join('\n');

export const breakpointVariationRules = (variations, fns) =>
  Object.keys(breakpoints)
    .map(breakpoint => {
      const rules = fns
        .map(fn =>
          variations.map(v => fn(breakpoint, variationName(v), v)).join('\n')
        )
        .join('\n');
      const minWidth = breakpoints[breakpoint];
      return `@media (min-width: ${minWidth}) {\n  ${rules}\n}`;
    })
    .join('\n');

export const breakpointMultipleRules = fns =>
  breakpointVariationRules(multiplesArray, fns);
