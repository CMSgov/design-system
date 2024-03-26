import type * as React from 'react';
import classNames from 'classnames';
import { Hint } from '../Hint';
import { InlineError } from '../InlineError';

export type LabelComponent = 'label' | 'legend';
export interface LabelProps {
  /**
   * Label text or HTML.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /** The root HTML element used to render the label */
  component?: LabelComponent;
  /**
   * @deprecated Hints are now their own component called `Hint`.
   * @hide-prop [Deprecated]
   *
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
  /**
   * @deprecated The Label is no longer responsible for rendering the
   * error element from a string. A InlineError should be passed to it which
   * already has an errorId applied.
   * @hide-prop [Deprecated]
   */
  errorId?: string;
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId?: string;
  /**
   * @deprecated Hints are now their own component called `Hint`.
   * @hide-prop [Deprecated]
   *
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
   * @deprecated Please render your error message directly with the 'InlineError' component instead of passing to `Label`
   * @hide-prop [Deprecated]
   *
   * The ID of the hint element
   */
  hintId?: string;
  /**
   * A unique `id` for the label element. Useful for referencing the label from
   * other components with `aria-describedby`.
   */
  id?: string;
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed?: boolean;
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields](https://design.cms.gov/patterns/Forms/forms/#required-and-optional-fields).
   */
  requirementLabel?: React.ReactNode;
}

type LabelComponentProps = React.ComponentPropsWithRef<'label'> &
  React.ComponentPropsWithRef<'legend'> &
  LabelProps;

/**
 * The Label component describes individual form fields (as a `<label>`) or fieldsets (as
 * a `<legend>`). They are built in to all form fields in the design system, but they can
 * also be used on their own to create custom fields.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/label/).
 */
export const Label = (props: LabelComponentProps) => {
  const {
    fieldId,
    id,
    children,
    component,
    hint,
    hintId,
    className,
    inversed,
    errorMessage,
    errorId,
    requirementLabel,
    ...labelProps
  } = props;

  if (process.env.NODE_ENV !== 'production' && (hint || hintId)) {
    console.warn(
      "[Deprecated]: Hints are now their own component called 'Hint'. Please render your 'Hint' directly instead of passing them to 'Label'."
    );
  }

  if (process.env.NODE_ENV !== 'production' && errorMessage) {
    console.warn(
      "[Deprecated]: Passing 'errorMessage' to the 'Label' component is now deprecated. Please render your error message directly with the 'InlineError' component instead."
    );
  }

  let hintElement;
  if (hint || requirementLabel) {
    hintElement = (
      <Hint requirementLabel={requirementLabel} inversed={inversed} id={hintId}>
        {hint}
      </Hint>
    );
  }

  let errorElement = errorMessage;
  if (typeof errorMessage === 'string') {
    errorElement = <InlineError id={errorId}>{errorMessage}</InlineError>;
  }

  let htmlFor = fieldId;
  if (component === 'legend' && fieldId) {
    console.warn(
      'The `for` attribute is invalid for legends. Omitting `fieldId` from rendered element.'
    );
    htmlFor = undefined;
  }

  const ComponentType = component;
  const classes = classNames('ds-c-label', className, inversed && 'ds-c-label--inverse');

  return (
    <>
      <ComponentType className={classes} htmlFor={htmlFor} id={id} {...labelProps}>
        {children}
      </ComponentType>
      {hintElement}
      {errorElement}
    </>
  );
};

Label.defaultProps = { component: 'label' };

export default Label;
