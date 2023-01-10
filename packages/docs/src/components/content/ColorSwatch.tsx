import React from 'react';

interface ColorSwatchProps extends React.ComponentPropsWithRef<'svg'> {
  colorTokenName: string;
  title?: string;
}

const ColorSwatch = ({ colorTokenName, title, ...attrs }: ColorSwatchProps) => (
  <svg
    fill={`var(--color-${colorTokenName})`}
    stroke="rgb(0 0 0 / 20%)"
    className="c-color-swatch ds-u-radius--circle ds-u-margin-right--1"
  >
    {title && <title>{title}</title>}
    <circle cx="50%" cy="50%" r="50%" />
  </svg>
);

export default ColorSwatch;
