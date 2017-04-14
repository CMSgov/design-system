import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

/**
 * A `Select` component can be used to render an HTML `select` menu.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `select` element, so you can use this to set additional attributes if
 * necessary.
 */
export const Select = function(props) {
  let {
    children,
    className,
    id,
    inversed,
    ...selectProps
  } = props;

  const classes = classNames(
    'ds-c-field ds-c-field--select',
    {'ds-c-field--inverse': inversed},
    className
  );

  if (!id) {
    id = uniqueId(`select_${selectProps.name}_`);
  }

  return (
    <select
      className={classes}
      id={id}
      {...selectProps}
    >
      {children}
    </select>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root `select` element.
   */
  className: PropTypes.string,
  /**
   * Sets the initial `selected` state and allows the user to select a different
   * option without also requiring an `onChange` event handler.
   */
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * A unique ID to be used for the select field. A unique ID will be generated
   * if one isn't provided.
   */
  id: PropTypes.string,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: PropTypes.bool,
  /**
   * Setting this prop to `true` will result in an error message due to
   * accessibility concerns. See the usability guidelines for more info.
   */
  multiple: function(props, propName, componentName) {
    if (props[propName]) {
      return new Error(
        `'${propName}' supplied to '${componentName}'. [A11Y]: Users often don’t` +
        ` understand how to select multiple items from dropdowns. Use checkboxes instead.`
      );
    }
  },
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * Setting this prop will render a read-only field and require an `onChange`
   * event handler if you'd want to change its `selected` stated. Use
   * `defaultValue` if you want the field to be mutable.
   */
  value: PropTypes.string
};

export default Select;
