const { css } = require('emotion');

const multiple = 8;

const property = prop => value =>
  css`
    ${prop}: ${value * multiple}px;
  `;

const basePaddingFunction = property('padding'); /**
 * @variation 2
 * @param {number} [top]
 * @param {number} [horizontal]
 * @param {number} [bottom]
 */ /**
 * @variation 3
 * @param {number} [vertical]
 * @param {number} [horizontal]
 */

/**
 * @variation 1
 * @param {number} [top]
 * @param {number} [right]
 * @param {number} [bottom]
 * @param {number} [left]
 */ const padding = (top, right, bottom, left) => {
  if (top === undefined) {
    throw new Error('Padding function requires at least one parameter');
  }

  if (left !== undefined && bottom !== undefined && right !== undefined) {
    return css`
      ${padding.top(top)};
      ${padding.right(right)};
      ${padding.bottom(bottom)};
      ${padding.left(left)};
    `;
  } else if (bottom !== undefined && right !== undefined) {
    const x = right;
    return css`
      ${padding.top(top)};
      ${padding.bottom(bottom)};
      ${padding.x(x)};
    `;
  } else if (right !== undefined) {
    const x = right;
    const y = top;
    return css`
      ${padding.x(x)};
      ${padding.y(y)};
    `;
  } else {
    const all = top;
    return basePaddingFunction(all);
  }
};

padding.top = property('padding-top');
padding.bottom = property('padding-bottom');
padding.left = property('padding-left');
padding.right = property('padding-right');
padding.x = x => css`
  ${padding.right(x)};
  ${padding.left(x)};
`;
padding.y = y => css`
  ${padding.top(y)};
  ${padding.bottom(y)};
`;

module.exports = { padding };
