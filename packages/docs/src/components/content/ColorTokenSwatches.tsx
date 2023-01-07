import React from 'react';
import classNames from 'classnames';
import colorTokens from 'design-system-tokens/src/tokens/color';

interface SwatchColor {
  name: string;
  value: string;
}

const swatches: Record<string, SwatchColor[]> = Object.keys(colorTokens).reduce((swatches, key) => {
  const colorName = key.split('-')[0];
  swatches[colorName] = [...(swatches[colorName] ?? []), { name: key, value: colorTokens[key] }];
  return swatches;
}, {});

/**
 *
 */
const ColorTokenSwatches = () =>
  Object.entries(swatches).map(([swatchName, swatchColors], i) => (
    <React.Fragment key={swatchName}>
      <h2 className="ds-u-text-transform--capitalize">{swatchName}</h2>
      <dl>
        {swatchColors.map(({ name, value }, j) => (
          <div key={`${name}-${value}`}>
            <dt style={{ display: 'inline-block' }}>
              <svg
                viewBox="0 0 200 32"
                style={{ width: '200px', height: '32px', verticalAlign: 'middle' }}
              >
                <pattern
                  id={`pattern-checkers-${i}-${j}`}
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <rect fill="#777" x="0" y="0" width="8" height="8"></rect>
                  <rect fill="#ccc" x="0" y="8" width="8" height="8"></rect>
                  <rect fill="#ccc" x="8" y="0" width="8" height="8"></rect>
                  <rect fill="#777" x="8" y="8" width="8" height="8"></rect>
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill={`url(#pattern-checkers-${i}-${j})`}
                ></rect>
                <rect x="0" y="0" width="100%" height="100%" fill={value} />
              </svg>
              <code className="c-swatch__name ds-u-margin-left--1">{name}</code>
            </dt>
            <dd style={{ display: 'inline-block' }} className="ds-u-margin-left--1">
              <code className="c-swatch__label js-swatch-hex ds-u-fill--transparent ds-u-color--gray">
                {value}
              </code>
            </dd>
          </div>
        ))}
      </dl>
    </React.Fragment>
  ));

export default ColorTokenSwatches;
