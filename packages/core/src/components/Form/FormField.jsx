import classNames from 'classnames';
import FormLabel from './FormLabel';
import React from 'react';
import PropTypes from 'prop-types';

export class FormField extends React.PureComponent {
  render() {
    const classes = classNames(
      {'ds-base--inverse': this.props.inversed},
      this.props.className
    );

    return (
      <div className={classes}>
        <FormLabel hint={this.props.hint}>
          {this.props.label}
        </FormLabel>
        <input
          className='ds-c-field ds-c-field--error'
          id='input-lastname'
          name={this.props.name}
          type={this.props.type}
          aria-describedby='input-lastname-message'
        />
      </div>
    );
  }
}

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  /** Additional classes to be added to the root `select` element. */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: FormLabel.propTypes.errorMessage,
  hint: FormLabel.propTypes.hint,
  inversed: PropTypes.bool,
  /** Field label */
  label: FormLabel.propTypes.children,
  name: PropTypes.string.isRequired
};

export default FormField;
