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

  renderHint(content) {
    if (content) {
      const classes = classNames(
        'ds-c-field__hint',
        {'ds-c-field__hint--inverse': this.props.inversed}
      );
      return <span className={classes}>{content}</span>;
    }
  }

  renderRequiredOrOptional(title, prop) {
    if (prop) {
      return this.renderHint(
        <span>
          <span className="ds-u-font-weight--bold">{title}</span>
          {" "}
          {prop !== true && prop}
        </span>
      );
    }
  }

  hint = () => this.renderHint(this.props.hint);
  optional = () => this.renderRequiredOrOptional('Optional.', this.props.optional);
  required = () => this.renderRequiredOrOptional('Required.', this.props.required);

  render() {
    const ComponentType = this.props.component;
    const labelTextClasses = this.props.errorMessage && 'ds-u-font-weight--bold';
    const classes = classNames('ds-c-label', this.props.className);

    return (
      <ComponentType className={classes} htmlFor={this.props.fieldId}>
        <span className={labelTextClasses}>{this.props.children}</span>
        {this.errorMessage()}
        {this.hint()}
        {this.optional()}
        {this.required()}
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
   * Set to `true` to display whether the field is optional or pass text to
   * display as optional with additional text.
   */
  optional: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /**
   * Set to `true` to display whether the field is required or pass text to
   * display as required with additional text.
   */
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool
};

export default FormLabel;
