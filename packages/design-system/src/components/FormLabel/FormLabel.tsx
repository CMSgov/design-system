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

export class FormLabel extends React.PureComponent<
  React.ComponentPropsWithRef<'label'> & React.ComponentPropsWithRef<'legend'> & FormLabelProps,
  any
> {
  static defaultProps = { component: 'label' };

  hint(): React.ReactNode {
    const { hint } = this.props;
    let { requirementLabel } = this.props;
    if (!hint && !requirementLabel) return;

    const classes = classNames('ds-c-field__hint', {
      'ds-c-field__hint--inverse': this.props.inversed,
    });

    let hintPadding = null;

    if (requirementLabel && hint) {
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
      <span className={classes}>
        {requirementLabel}
        {hintPadding}
        {hint}
      </span>
    );
  }

  errorMessage(): React.ReactNode {
    if (this.props.errorMessage) {
      // Include fallback for errorId for usage outside of FormControl
      let errorId = null;
      if (this.props.errorId) {
        errorId = this.props.errorId;
      } else if (this.props.fieldId) {
        errorId = `${this.props.fieldId}-error`;
      }

      return (
        <InlineError
          id={errorId}
          inversed={this.props.inversed}
          className={this.props.errorMessageClassName}
        >
          {this.props.errorMessage}
        </InlineError>
      );
    }
  }

  render() {
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
    } = this.props;
    const ComponentType = this.props.component;
    const classes = classNames('ds-c-label', className, {
      'ds-c-label--inverse': inversed,
    });

    return (
      <ComponentType className={classes} htmlFor={fieldId} id={id} {...labelProps}>
        <span className={classNames(textClassName)}>{children}</span>
        {this.hint()}
        {this.errorMessage()}
      </ComponentType>
    );
  }
}

export default FormLabel;
