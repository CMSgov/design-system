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

const renderTransparencyPattern = (id: string) => (
  <pattern id={id} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
    <rect fill="#777" x="0" y="0" width="8" height="8"></rect>
    <rect fill="#ccc" x="0" y="8" width="8" height="8"></rect>
    <rect fill="#ccc" x="8" y="0" width="8" height="8"></rect>
    <rect fill="#777" x="8" y="8" width="8" height="8"></rect>
  </pattern>
);

/**
 *
 */
const ColorTokenSwatches = () =>
  Object.entries(swatches).map(([swatchName, swatchColors], i) => {
    const patternId = `pattern-checkers-${i}`;
    return (
      <React.Fragment key={swatchName}>
        <h2 className="ds-u-text-transform--capitalize" id={`hello-${i}`}>
          {swatchName}
        </h2>
        <dl className="c-color-ramp">
          <svg className="c-color-ramp__transparency-pattern" viewBox="0 0 1024 9999" width="1024">
            <defs>{renderTransparencyPattern(patternId)}</defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`}></rect>
          </svg>
          {swatchColors.map(({ name, value }) => (
            <div className="c-color-ramp__item" key={`${name}-${value}`}>
              <svg viewBox="0 0 999 32">
                <rect x="0" y="0" width="100%" height="100%" fill={value} />
              </svg>
              <dt style={{ display: 'inline-block' }}>
                <code>{name}</code>
              </dt>
              <dd style={{ display: 'inline-block' }} className="ds-u-margin-left--1">
                <code>{value}</code>
              </dd>
            </div>
          ))}
        </dl>
      </React.Fragment>
    );
  });

export default ColorTokenSwatches;
