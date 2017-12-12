import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

/**
 * A `Select` component can be used to render an HTML `select` menu.
 * Any _undocumented_ props that you pass to this component will be passed
 * to the `select` element, so you can use this to set additional attributes if
 * necessary.
 */
export const Select = function(props) {
  /* eslint-disable prefer-const */
  let {
    // Using let rather than const since we sometimes rewrite id
    children,
    className,
    id,
    inversed,
    ...selectProps
  } = props;
  /* eslint-enable prefer-const */

  const classes = classNames(
    'ds-c-field',
    { 'ds-c-field--inverse': inversed },
    className
  );

  if (!id) {
    id = uniqueId(`select_${selectProps.name}_`);
  }

  return (
    <select className={classes} id={id} {...selectProps}>
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
   * Sets the initial selected state. Use this for an uncontrolled component;
   * otherwise, use the `selected` property.
   */
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * A unique ID to be used for the select field. A unique ID will be generated
   * if one isn't provided.
   */
  id: PropTypes.string,
  /**
   * Applies the "inverse" UI theme
   */
  inversed: PropTypes.bool,
  /**
   * Setting this prop will result in a PropTypes error message due to
   * accessibility concerns. Use checkboxes instead if you need to support multiple
   * selections. See the Guidance tab for more info.
   */
  multiple: function(props, propName, componentName) {
    if (props[propName]) {
      /* eslint-disable quotes */
      return new Error(
        `'${propName}' supplied to '${
          componentName
        }'. [A11Y]: Users often don’t` +
          ` understand how to select multiple items from dropdowns. Use checkboxes instead.`
      );
      /* eslint-enable */
    }
  },
  /**
   * The `select` field's `name` attribute
   */
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.string
};

export default Select;
