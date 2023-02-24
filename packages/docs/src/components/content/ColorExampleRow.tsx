import React from 'react';
import { getSystemColorTokenFromValue } from '../../helpers/themeTokens';
import { hexHasTransparency, pickTextColor } from 'design-system-tokens/src/lib/utility';
import { HexValue } from 'design-system-tokens/src/lib/types';

const DARK_TEXT = 'var(--color-base)';
const LIGHT_TEXT = 'var(--color-base-inverse)';

export interface ColorExampleRowProps {
  displayName?: string;
  displayValue?: string;
  name: string;
  value: string;
}

/**
 * Used to show a specific color. It's laid out as a row with a background
 * color of the specified color plus two text/code elements with the name of
 * the color and the value of the color
 */
const ColorExampleRow = ({ displayName, displayValue, name, value }: ColorExampleRowProps) => {
  const nameId = `color-name-${name}`;
  const valueId = `color-value-${name}`;
  const textColor = pickTextColor(value as HexValue, LIGHT_TEXT, DARK_TEXT);
  const codeStyle: React.CSSProperties = hexHasTransparency(value as HexValue)
    ? {}
    : {
        color: textColor,
        // Some of the mid-range colors do not have sufficient text contrast no matter which
        // text color is chosen, so we need to add a little bit of background color to
        // achieve sufficient contrast
        background: textColor === DARK_TEXT ? 'rgb(255 255 255 / 10%)' : 'rgb(0 0 0 / 10%)',
      };

  if (!displayValue) {
    displayValue = getSystemColorTokenFromValue(value);
  }

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
        className="c-color-example-row__name"
        id={nameId}
        aria-describedby={valueId}
        style={codeStyle}
      >
        {displayName ?? name}
      </code>
      <code className="c-color-example-row__value" id={valueId} style={codeStyle}>
        {displayValue ?? value}
      </code>
    </div>
  );
};

export default ColorExampleRow;
