import classNames from 'classnames';
import React from 'react';

/**
 * The FormLabel component provides the label/legend for a field, along with any
 * associated hint text and error messaging.
 */
class FormLabel extends React.PureComponent {
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <span className='ds-c-field__hint ds-u-color--error' id='TODO-message' role='alert'>
          {this.props.errorMessage}
        </span>
      );
    }
  }

  hint() {
    if (this.props.hint) {
      return <span className='ds-c-field__hint'>{this.props.hint}</span>;
    }
  }

  render() {
    const ComponentType = this.props.component;
    const labelTextClasses = classNames({
      'ds-u-font-weight--bold': !!this.props.errorMessage
    });

    return (
      <ComponentType className='ds-c-label' htmlFor={this.props.fieldId}>
        <span className={labelTextClasses}>{this.props.children}</span>
        {this.errorMessage()}
        {this.hint()}
      </ComponentType>
    );
  }
};

FormLabel.defaultProps = { component: 'label' };
FormLabel.propTypes = {
  children: React.PropTypes.node.isRequired,
  /** The root HTML element used to render the label */
  component: React.PropTypes.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: React.PropTypes.string,
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId: React.PropTypes.string,
  /**
   * Hint text. Typically this is a string, but you can pass in additional
   * HTML if you need to further format things.
   */
  hint: React.PropTypes.node
};

export default FormLabel;
