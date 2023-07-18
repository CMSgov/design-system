import InlineError from '../InlineError/InlineError';
import React from 'react';
import classNames from 'classnames';

export type FormLabelComponent = 'label' | 'legend';
export interface FormLabelProps {
  /**
   * Label text or HTML.
   */
  children: React.ReactNode;
  /**
   * Additional classes to be added to the root element.
   */
  className?: string;
  /** The root HTML element used to render the label */
  component?: FormLabelComponent;
  /** Enable the error state by providing an error message. */
  errorMessage?: React.ReactNode;
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName?: string;
  /**
   * The ID of the error message applied to this field.
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
   * Additional classes to be added to the label text.
   */
  textClassName?: string;
}

type ComponentProps = React.ComponentPropsWithRef<'label'> &
  React.ComponentPropsWithRef<'legend'> &
  FormLabelProps;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/form-label/).
 */
export const FormLabel = (props: ComponentProps) => {
  const {
    fieldId,
    id,
    children,
    component,
    hint,
    textClassName,
    className,
    inversed,
    errorMessage,
    errorMessageClassName,
    errorId,
    requirementLabel,
    ...labelProps
  } = props;

  let hintElement;
  if (hint || requirementLabel) {
    const hintClasses = classNames('ds-c-field__hint', inversed && 'ds-c-field__hint--inverse');

    let hintPadding;
    let requirement = requirementLabel;

    if (requirementLabel && hint) {
      if (typeof requirementLabel === 'string') {
        // Remove any existing spacing and punctuation
        requirement = requirementLabel.trim().replace(/\.$/, '');
        // Add punctuation after the requirementLabel so it doesn't run into the hint
        requirement = requirementLabel + '.';
      }

      // Add space between hint and preceding requirementLabel
      hintPadding = ' ';
    }

    hintElement = (
      <span className={hintClasses}>
        {requirement}
        {hintPadding}
        {hint}
      </span>
    );
  }

  let errorMessageElement;
  if (errorMessage) {
    // Include fallback for errorId
    let inlineErrorId;
    if (errorId) {
      inlineErrorId = errorId;
    } else if (fieldId) {
      inlineErrorId = `${fieldId}-error`;
    }

    errorMessageElement = (
      <InlineError id={inlineErrorId} inversed={inversed} className={errorMessageClassName}>
        {errorMessage}
      </InlineError>
    );
  }

  const ComponentType = component;
  const classes = classNames('ds-c-label', className, inversed && 'ds-c-label--inverse');

  return (
    <ComponentType className={classes} htmlFor={fieldId} id={id} {...labelProps}>
      <span className={classNames(textClassName)}>{children}</span>
      {hintElement}
      {errorMessageElement}
    </ComponentType>
  );
};

FormLabel.defaultProps = { component: 'label' };

export default FormLabel;
