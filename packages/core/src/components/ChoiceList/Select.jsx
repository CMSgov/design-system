import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Select extends React.PureComponent {
  componentDidMount() {
    if (this.props.focusTrigger) {
      this.loader && this.loader.focus();
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[Deprecated] The <Select> component is no longer supported and will be removed in a future release, please use <Dropdown> instead.`
      );
    }
  }

  render() {
    /* eslint-disable prefer-const */
    let {
      // Using let rather than const since we sometimes rewrite id
      children,
      className,
      focusTrigger,
      id,
      inversed,
      selectRef,
      size,
      ...selectProps
    } = this.props;
    /* eslint-enable prefer-const */

    const classes = classNames(
      'ds-c-field',
      { 'ds-c-field--inverse': inversed },
      className,
      size && `ds-c-field--${size}`
    );

    if (!id) {
      id = uniqueId(`select_${selectProps.name}_`);
    }

    return (
      <select
        className={classes}
        id={id}
        /* eslint-disable no-return-assign */
        ref={focusTrigger ? loader => (this.loader = loader) : selectRef}
        /* eslint-enable no-return-assign */
        {...selectProps}
      >
        {children}
      </select>
    );
  }
}

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
   * Used to focus `select` on `componentDidMount()`
   */
  focusTrigger: PropTypes.bool,
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
        `'${propName}' supplied to '${componentName}'. [A11Y]: Users often don’t` +
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
   * Access a reference to the `select` element
   */
  selectRef: PropTypes.func,
  /**
   * Set the max-width of the input either to `'small'` or `'medium'`.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Sets the field's `value`. Use this in combination with `onChange`
   * for a controlled component; otherwise, set `defaultValue`.
   */
  value: PropTypes.string,

  /**
   * Adds `aria-label` attribute
   */
  'aria-label': PropTypes.string
};

export default Select;
