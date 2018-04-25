import { variables } from './variables';
const { breakpoints } = variables;

const multiplesArray = new Array(7).fill(0).map((_, i) => i + 1);

export const multipleRules = fn => multiplesArray.map(m => fn(m + 1)).join('');

export const breakpointRules = fns =>
  Object.keys(breakpoints)
    .map(breakpoint => {
      const rules = fns
        .map(fn => multiplesArray.map(m => fn(breakpoint, m)).join('\n'))
        .join('\n');
      const minWidth = breakpoints[breakpoint];
      return `@media (min-width: ${minWidth}) {\n  ${rules}\n}`;
    })
    .join('\n');
