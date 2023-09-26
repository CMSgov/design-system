import React from 'react';
import classNames from 'classnames';
import { Hint } from '../Hint/Hint';

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
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
  /**
   * @deprecated The Label is no longer responsible for rendering the
   * error element from a string. A FieldError should be passed to it which
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
   * Additional hint text to display
   */
  hint?: React.ReactNode;
  /**
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
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel?: React.ReactNode;
  /**
   * @deprecated Please just use `className` instead
   * @hide-prop [Deprecated]
   */
  textClassName?: string;
}

type LabelComponentProps = React.ComponentPropsWithRef<'label'> &
  React.ComponentPropsWithRef<'legend'> &
  LabelProps;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/form-label/).
 */
export const Label = (props: LabelComponentProps) => {
  const {
    fieldId,
    id,
    children,
    component,
    hint,
    hintId,
    textClassName,
    className,
    inversed,
    errorMessage,
    errorId,
    requirementLabel,
    ...labelProps
  } = props;

  if (process.env.NODE_ENV !== 'production' && textClassName) {
    console.warn(
      "[Deprecated]: Please use the 'className' prop instead of 'textClassName'. This prop is deprecated and will be removed in a future release."
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

  const ComponentType = component;
  const classes = classNames(
    'ds-c-label',
    className,
    inversed && 'ds-c-label--inverse',
    textClassName
  );

  return (
    <>
      <ComponentType className={classes} htmlFor={fieldId} id={id} {...labelProps}>
        {children}
      </ComponentType>
      {hintElement}
      {errorMessage}
    </>
  );
};

Label.defaultProps = { component: 'label' };

export default Label;
