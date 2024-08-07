import type * as React from 'react';
import classNames from 'classnames';

export interface HintProps {
  /**
   * Hint text or HTML
   */
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /**
   * The ID of the hint element. This is required in order to link the element
   * to a field input via `aria-describedby`
   */
  id: string;
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed?: boolean;
  /**
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines](https://design.cms.gov/patterns/Forms/forms/) for more info.
   */
  requirementLabel?: React.ReactNode;
}

/**
 * Hints are used in conjunction with a Label to describe individual form fields
 * or fieldsets. They are built in to all form fields in the design system, but
 * they can also be used on their own to create custom fields.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/hint/).
 */
export const Hint = ({
  children,
  className,
  id,
  inversed,
  requirementLabel,
  ...otherProps
}: HintProps) => {
  const hintClasses = classNames('ds-c-hint', inversed && 'ds-c-hint--inverse', className);

  let hintPadding;
  if (requirementLabel && children) {
    if (typeof requirementLabel === 'string') {
      // Remove any existing spacing and punctuation
      requirementLabel = requirementLabel.trim().replace(/\.$/, '');
      // Add punctuation after the requirementLabel so it doesn't run into the hint
      requirementLabel = requirementLabel + '.';
    }

    // Add space between hint and preceding requirementLabel
    hintPadding = ' ';
  }

  return (
    <p {...otherProps} id={id} className={hintClasses}>
      {requirementLabel}
      {hintPadding}
      {children}
    </p>
  );
};
