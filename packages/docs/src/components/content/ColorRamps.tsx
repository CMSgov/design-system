import systemTokens from 'design-system-tokens/src/tokens/System.Value.json';
import ColorExampleRow from './ColorExampleRow';

const swatches = Object.keys(systemTokens.color).map((swatchName) => {
  const color = systemTokens.color[swatchName];
  return {
    swatchName,
    swatchColors: color.$value
      ? [{ name: swatchName, value: color.$value }]
      : Object.keys(color).map((name) => ({ name, value: color[name].$value })),
  };
});

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
    {swatches.map(({ swatchName, swatchColors }, i) => {
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
            {swatchColors.map(({ name, value }) => (
              <ColorExampleRow
                name={name}
                displayName={name.split('-')[1] ?? name}
                value={value}
                displayValue={value}
                key={`${name}-${value}`}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export default ColorRamps;
