import classNames from 'classnames';
import React from 'react';
import uniqueId from 'lodash.uniqueid';

/**
 * A `Choice` component can be used to render a checkbox or radio button.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `input` element, so you can use this to set additional attributes if
 * necessary.
 */
const Choice = function(props) {
  let { // Using let rather than const since we sometimes rewrite id
    children,
    className,
    id,
    inversed,
    ...inputProps
  } = props;

  const inputClasses = classNames(
    'ds-c-choice',
    {'ds-c-choice--inverse': inversed}
  );

  if(!id) {
    id = uniqueId(`${inputProps.type}_${inputProps.name}_`);
  }

  return (
    <div className={className}>
      <input
        className={inputClasses}
        id={id}
        {...inputProps}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

Choice.defaultProps = {
  type: 'checkbox'
};

Choice.propTypes = {
  /**
   * Label text or HTML.
   */
  children: React.PropTypes.node.isRequired,
  /**
   * Setting this prop will render a read-only field and require an `onChange`
   * event handler if you'd want to check its checked stated. Use `defaultChecked`
   * if you want the field to be mutable.
   */
  checked: React.PropTypes.bool,
  /**
   * Additional classes to be added to the root `div` element.
   */
  className: React.PropTypes.string,
  /**
   * Sets the initial checked state and allows the user to check/uncheck the
   * field without also requiring an `onChange` event handler.
   */
  defaultChecked: React.PropTypes.bool,
  /**
   * A unique ID to be used for the input field, as well as the label's
   * `for` attribute. A unique ID will be generated if one isn't provided.
   */
  id: React.PropTypes.string,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: React.PropTypes.bool,
  /**
   * The `input` `name` attribute
   */
  name: React.PropTypes.string.isRequired,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  type: React.PropTypes.oneOf(['checkbox', 'radio']),
  /**
   * The `input` `value` attribute
   */
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired
};

export default Choice;
