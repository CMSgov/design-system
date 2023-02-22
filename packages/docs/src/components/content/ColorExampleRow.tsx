import React from 'react';
import { hexHasTransparency, pickTextColor } from 'design-system-tokens/src/lib/utility';
import { HexValue } from 'design-system-tokens/src/lib/types';

export interface ColorExampleRowProps {
  displayName?: string;
  name: string;
  value: string;
}

/**
 * Used to show a specific color. It's laid out as a row with a background
 * color of the specified color plus two text/code elements with the name of
 * the color and the value of the color
 */
const ColorExampleRow = ({ displayName, name, value }: ColorExampleRowProps) => {
  const nameId = `color-name-${name}`;
  const valueId = `color-value-${name}`;
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
    <div className="c-color-example-row">
      <svg
        aria-labelledby={`${nameId} ${valueId}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="100%" height="100%" fill={value} />
      </svg>
      <code
        className="ds-u-display--block"
        id={nameId}
        aria-describedby={valueId}
        style={codeStyle}
      >
        {displayName ?? name}
      </code>
      <code className="ds-u-display--block ds-u-margin-left--1" id={valueId} style={codeStyle}>
        {value}
      </code>
    </div>
  );
};

export default ColorExampleRow;
