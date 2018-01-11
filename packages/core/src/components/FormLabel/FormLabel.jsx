import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * The `FormLabel` component provides the `label` (or `legend`) for a field,
 * along with any associated hint text and error message.
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
    let { hint, requirementLabel } = this.props;
    if (!hint && !requirementLabel) return;

    const classes = classNames('ds-c-field__hint', {
      'ds-c-field__hint--inverse': this.props.inversed
    });

    if (requirementLabel && hint) {
      if (typeof requirementLabel === 'string') {
        // Remove any existing spacing and punctuation
        requirementLabel = requirementLabel.trim().replace(/\.$/, '');
        // Add punctuation after the requirementLabel so it doesn't run into the hint
        requirementLabel = requirementLabel + '.';
      }

      // Add space between hint and preceding requirementLabel
      hint = ' ' + hint;
    }

    return (
      <span className={classes}>
        {requirementLabel}
        {hint}
      </span>
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
  errorMessage: PropTypes.node,
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
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel: PropTypes.node,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool
};

export default FormLabel;
