import React from 'react';

const spacingTokens = [
  { name: '0', value: '0px' },
  { name: '05', value: '4px' },
  { name: '1', value: '8px' },
  { name: '2', value: '16px' },
  { name: '3', value: '24px' },
  { name: '4', value: '32px' },
  { name: '5', value: '40px' },
  { name: '6', value: '48px' },
  { name: '7', value: '56px' },
];

interface SpacingUtilityExampleListProps {
  /**
   * Name of the utility that is based off of spacer tokens
   */
  baseUtilityName: string;
  /**
   * The utility-class qualifier, like `-x` or `-bottom`
   */
  qualifier?: string;
  /**
   * Not used right now, but could trigger a re-render in the future if spacing
   * values become different between design system themes.
   */
  theme: string;
}

/**
 * Displays a list of spacing utility class examples with their pixel values
 */
const SpacingUtilityExampleList = ({
  baseUtilityName,
  qualifier = '',
}: SpacingUtilityExampleListProps) => (
  <div
    className={`c-spacing-utility-example c-spacing-utility-example--${baseUtilityName} ds-u-border--1 ds-u-padding--2`}
  >
    {spacingTokens.map(({ name, value }) => (
      <article className="c-spacing-utility-example__row" key={name}>
        <div className="c-spacing-utility-example__container">
          <div
            className={`ds-u-${baseUtilityName}${qualifier}--${name} c-spacing-utility-example__item`}
          ></div>
        </div>
        <code>
          .ds-u-{baseUtilityName}
          {qualifier}--{name}
        </code>
        <code>{value}</code>
      </article>
    ))}
  </div>
);

export default SpacingUtilityExampleList;
