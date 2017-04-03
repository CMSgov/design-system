import React from 'react';
import classNames from 'classnames';

class Select extends React.PureComponent {
  render() {
    const {
      className,
      ...props
    } = this.props;

    const classes = classNames(
      'ds-c-field ds-c-field--select',
      this.props.className
    );

    return (
      <select className={classes} {...props}>
        {this.props.children}
      </select>
    );
  }
};

Select.propTypes = {
  children: React.PropTypes.node.isRequired,
  /** Additional classes to be added to the root `select` element. */
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  /**
   * Setting this prop to `true` will result in an invalid prop message due to
   * accessibility concerns. See the accessibility guidelines for more info.
   */
  multiple: function(props, propName, componentName) {
    if (props[propName]) {
      return new Error(
        `'${propName}' supplied to '${componentName}'. [A11Y]: Users often don’t` +
        ` understand how to select multiple items from dropdowns. Use checkboxes instead.`
      );
    }
  }
};

export default Select;
