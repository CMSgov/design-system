import React from 'react';
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
  Object.entries(swatches).map(([swatchName, swatchColors]) => (
    <div className="c-swatch-list ds-u-border--1 ds-u-padding--2" key={swatchName}>
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
  ));

export default ColorTokenSwatches;
