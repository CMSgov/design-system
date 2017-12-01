import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * The FormLabel component provides the label/legend for a field, along with any
 * associated hint text and error messaging.
 */
export class FormLabel extends React.PureComponent {
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <span
          className="ds-c-field__hint ds-u-color--error"
          id={`${this.props.fieldId}-message`}
          role="alert"
        >
          {this.props.errorMessage}
        </span>
      );
    }
  }

  hint() {
    const { hint } = this.props;
    const requirementLabel = this.requirementLabel();
    const classes = classNames('ds-c-field__hint', {
      'ds-c-field__hint--inverse': this.props.inversed
    });

    if (hint && requirementLabel) {
      return (
        <span className={classes}>
          {requirementLabel} {hint}
        </span>
      );
    } else if (requirementLabel) {
      return <span className={classes}>{requirementLabel}</span>;
    } else if (hint) {
      return <span className={classes}>{hint}</span>;
    }
  }

  requirementLabel() {
    const { requirementLabel } = this.props;
    return typeof requirementLabel === 'string' ? (
      <span className="ds-u-font-weight--bold">{requirementLabel}</span>
    ) : (
      requirementLabel
    );
  }

  render() {
    const ComponentType = this.props.component;
    const labelTextClasses = classNames(this.props.labelClassName, {
      'ds-u-font-weight--bold': this.props.errorMessage
    });
    const classes = classNames('ds-c-label', this.props.className);

    return (
      <ComponentType className={classes} htmlFor={this.props.fieldId}>
        <span className={labelTextClasses}>{this.props.children}</span>
        {this.errorMessage()}
        {this.hint()}
      </ComponentType>
    );
  }
}

FormLabel.defaultProps = { component: 'label' };
FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * Additional classes to be added to the label text.
   */
  labelClassName: PropTypes.string,
  /** The root HTML element used to render the label */
  component: PropTypes.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId: PropTypes.string,
  /**
   * Additional hint text to display
   */
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Text showing the requirement ("Required", "Optional", etc.). See [Required and Optional Fields]({{root}}/guidelines/forms/#required-and-optional-fields).
   */
  requirementLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool
};

export default FormLabel;
