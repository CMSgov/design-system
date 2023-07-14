import React from 'react';
import classNames from 'classnames';

export interface FieldHintProps {
  /**
   * Hint text or HTML
   */
  children?: React.ReactNode;
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
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel?: React.ReactNode;
}

export const FieldHint = ({ children, id, inversed, requirementLabel }: FieldHintProps) => {
  const hintClasses = classNames('ds-c-field__hint', inversed && 'ds-c-field__hint--inverse');

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
    <span id={id} className={hintClasses}>
      {requirementLabel}
      {hintPadding}
      {children}
    </span>
  );
};
