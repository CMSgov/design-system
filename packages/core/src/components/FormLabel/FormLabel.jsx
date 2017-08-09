import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * The FormLabel component provides the label/legend for a field, along with any
 * associated hint text and error messaging.
 *
 * TODO(sawyer): Show this in the documentation
 */
export class FormLabel extends React.PureComponent {
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <span
          className='ds-c-field__hint ds-u-color--error'
          id={`${this.props.fieldId}-message`}
          role='alert'
        >
          {this.props.errorMessage}
        </span>
      );
    }
  }

  hint() {
    if (this.props.hint) {
      const classes = classNames(
        'ds-c-field__hint',
        {'ds-c-field__hint--inverse': this.props.inversed}
      );
      return <span className={classes}>{this.props.hint}</span>;
    }
  }

  render() {
    const ComponentType = this.props.component;
    const labelTextClasses = this.props.errorMessage && 'ds-u-font-weight--bold';
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
  /** The root HTML element used to render the label */
  component: PropTypes.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: PropTypes.string,
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
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool
};

export default FormLabel;
