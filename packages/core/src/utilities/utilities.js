import { css } from 'emotion';
import variables from './variables';

const { breakpoints } = variables;

const wrapWithBreakpoint = (breakpoint, fn) => () => css`
  @media (min-width: ${breakpoint}) {
    ${fn.call(fn, arguments)};
  }
`;

export const addBreakpoints = fn => {
  Object.keys(breakpoints).forEach(key => {
    fn[key] = wrapWithBreakpoint(breakpoints[key], fn);
  });
};
