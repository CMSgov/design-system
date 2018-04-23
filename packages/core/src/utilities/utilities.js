const variables = require('./variables');
const { css } = require('emotion');

const { breakpoints } = variables;

const wrapWithBreakpoint = (breakpoint, fn) => () => css`
  @media (min-width: ${breakpoint}) {
    ${fn.call(fn, arguments)};
  }
`;

const addBreakpoints = fn => {
  Object.keys(breakpoints).forEach(key => {
    fn[key] = wrapWithBreakpoint(breakpoints[key], fn);
  });
};

module.exports = { addBreakpoints };
