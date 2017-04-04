import classNames from 'classnames';
import React from 'react';
import uniqueId from 'lodash.uniqueid';

/**
 * A `Choice` component can be used to render a checkbox or radio button.
 */
const Choice = function(props) {
  const inputClasses = classNames(
    'ds-c-choice',
    {'ds-c-choice--inverse': props.inversed}
  );

  const id = uniqueId(`${props.type}_${props.name}_`);

  return (
    <div>
      <input
        checked={props.checked}
        className={inputClasses}
        id={id}
        name={props.name}
        type={props.type}
        value={props.value}
      />
      <label htmlFor={id}>{props.children}</label>
    </div>
  );
};

Choice.defaultProps = {
  type: 'checkbox'
};

Choice.propTypes = {
  /** Label text/HTML */
  children: React.PropTypes.node.isRequired,
  checked: React.PropTypes.bool,
  /** Set to `true` to apply the "inverse" theme */
  inversed: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['checkbox', 'radio']),
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired
};

export default Choice;
