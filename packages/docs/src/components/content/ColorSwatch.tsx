import React from 'react';

interface ColorSwatchProps extends React.ComponentPropsWithRef<'svg'> {
  colorTokenName: string;
  title?: string;
}

const ColorSwatch = ({ colorTokenName, title, ...attrs }: ColorSwatchProps) => (
  <svg fill={`var(--color-${colorTokenName})`} className="c-color-swatch">
    {title && <title>{title}</title>}
    <rect x="0" y="0" width="100%" height="100%" />
  </svg>
);

export default ColorSwatch;
