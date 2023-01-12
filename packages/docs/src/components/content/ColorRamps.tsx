import React from 'react';
import classNames from 'classnames';
import colorTokens from 'design-system-tokens/src/tokens/color';
import { hexHasTransparency, pickTextColor } from 'design-system-tokens/src/lib/utility';
import { HexValue } from 'design-system-tokens/src/lib/types';

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
 * Component for showing named colors in all their shades
 */
const ColorRamps = () => (
  <div className="ds-u-display--flex ds-u-flex-wrap--wrap c-color-ramps">
    {Object.entries(swatches).map(([swatchName, swatchColors], i) => {
      const patternId = `pattern-checkers-${i}`;
      return (
        <div className="c-color-ramp__wrapper" key={swatchName}>
          <h2 className="ds-u-text-transform--capitalize" id={swatchName}>
            {swatchName}
          </h2>
          <div className="c-color-ramp">
            <svg className="c-color-ramp__transparency-pattern" viewBox="0 0 256 200" width="256">
              <defs>{renderTransparencyPattern(patternId)}</defs>
              <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`}></rect>
            </svg>
            {swatchColors.map(({ name, value }) => {
              const nameId = `color-name-${name}`;
              const valueId = `color-value-${value}`;
              const shortName = name.split('-')[1] ?? name;
              const textColor = pickTextColor(
                value as HexValue,
                'var(--color-base-inverse)',
                'var(--color-base)'
              );
              const codeStyle: React.CSSProperties = hexHasTransparency(value as HexValue)
                ? {}
                : {
                    color: textColor,
                    background: 'none',
                  };

              return (
                <div className="c-color-ramp__item" key={`${name}-${value}`}>
                  <svg aria-labelledby={`${nameId} ${valueId}`}>
                    <rect x="0" y="-5%" width="100%" height="110%" fill={value} />
                  </svg>
                  <code
                    className="ds-u-display--block"
                    id={nameId}
                    aria-describedby={valueId}
                    style={codeStyle}
                  >
                    {shortName}
                  </code>
                  <code
                    className="ds-u-display--block ds-u-margin-left--1"
                    id={valueId}
                    style={codeStyle}
                  >
                    {value}
                  </code>
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

export default ColorRamps;
