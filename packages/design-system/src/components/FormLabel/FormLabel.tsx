import React from 'react';
import classNames from 'classnames';
import { FieldHint } from '../FieldHint/FieldHint';

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
  /**
   * Enable the error state by providing an error message.
   */
  errorMessage?: React.ReactNode;
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
    hintId,
    textClassName,
    className,
    inversed,
    errorMessage,
    errorId,
    requirementLabel,
    ...labelProps
  } = props;

  let hintElement;
  if (hint || requirementLabel) {
    hintElement = (
      <FieldHint requirementLabel={requirementLabel} inversed={inversed} id={hintId}>
        {hint}
      </FieldHint>
    );
  }

  const ComponentType = component;
  const classes = classNames('ds-c-label', className, inversed && 'ds-c-label--inverse');

  return (
    <>
      <ComponentType className={classes} htmlFor={fieldId} id={id} {...labelProps}>
        <span className={classNames(textClassName)}>{children}</span>
      </ComponentType>
      {hintElement}
      {errorMessage}
    </>
  );
};

FormLabel.defaultProps = { component: 'label' };

export default FormLabel;
