import React from 'react';
import colorTokens from '../../../../design-system-tokens/src/tokens/color';

interface ColorTokenSwatchProps {
  /**
   * list of variable color names
   */
  swatchName: string;
}

/**
 *
 */
const ColorTokenSwatch = ({ swatchName }: ColorTokenSwatchProps) => {
  const swatchColors = Object.keys(colorTokens)
    .filter((key) => key.startsWith(swatchName))
    .map((key) => ({ name: key, value: colorTokens[key] }));
  return (
    <div className="c-swatch-list ds-u-border--1 ds-u-padding--2">
      {swatchColors.map(({ name, value }) => (
        <article className="ds-u-margin-bottom--1 c-swatch" key={`${name}-${value}`}>
          <div
            className={`c-swatch__preview ds-u-margin-right--1 ds-u-radius--circle`}
            style={{ backgroundColor: value }}
          ></div>
          <code className="c-swatch__name">{name}</code>
          <code className="c-swatch__label js-swatch-hex ds-u-fill--transparent ds-u-color--gray">
            {value}
          </code>
        </article>
      ))}
    </div>
  );
};

export default ColorTokenSwatch;
