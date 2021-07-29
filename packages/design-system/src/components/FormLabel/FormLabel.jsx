import InlineError from '../InlineError/InlineError';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class FormLabel extends React.PureComponent {
  hint() {
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

  errorMessage() {
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

FormLabel.defaultProps = { component: 'label' };
FormLabel.propTypes = {
  /**
   * Label text or HTML.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /** The root HTML element used to render the label */
  component: PropTypes.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: PropTypes.node,
  /**
   * Additional classes to be added to the error message
   */
  errorMessageClassName: PropTypes.string,
  /**
   * The ID of the error message applied to this field.
   */
  errorId: PropTypes.string,
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId: PropTypes.string,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.node,
  /**
   * A unique `id` for the label element. Useful for referencing the label from
   * other components with `aria-describedby`.
   */
  id: PropTypes.string,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool,
  /**
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel: PropTypes.node,
  /**
   * Additional classes to be added to the label text.
   */
  textClassName: PropTypes.string,
};

export default FormLabel;
