import React from 'react';
import classNames from 'classnames';

/**
 * The `Button` component accepts its text as children (AKA inner HTML), which
 * means you can also pass in HTML or custom components. This gives you a lot of
 * flexibility and supports a variety of advanced use cases. The most common use
 * case would be passing in an SVG icon along with the text.
 *
 * In addition to the supported props listed, you can also pass in additional
 * props, which will be passed to the rendered root component. For example,
 * you could pass in a `target` prop to pass to the rendered anchor element.
 */
class Button extends React.PureComponent {
  // Get an object of props to pass to the rendered <Button> component
  attrs() {
    /**
     * Since any number of arbitrary props can be passed into this component, we
     * use a destructuring assignment to get only the props we want to pass to the
     * rendered HTML element. For example, the "modifier" prop is used to generate
     * the classNames, but doesn't need passed to the rendered component, so we
     * omit it here so that it's not included in the props object.
     */
    const {
      className,
      component,
      inverse,
      modifier,
      onClick,
      size,
      ...props
    } = this.props;

    let attrs = {
      className: this.classNames(),
      ...props
    };

    if (this.props.onClick) {
      attrs.onClick = this.handleClick.bind(this);
    }

    return attrs;
  }

  classNames() {
    let modifierClass = this.props.modifier && `ds-c-button--${this.props.modifier}`;
    let disabledClass = this.props.disabled && 'ds-c-button--disabled';

    if (this.props.inverse) {
      if (disabledClass) {
        disabledClass += '-inverse';
      } else if (modifierClass) {
        modifierClass += '-inverse';
      } else {
        modifierClass = 'ds-c-button--inverse';
      }
    }

    return classNames(
      'ds-c-button',
      disabledClass,
      !disabledClass && modifierClass,
      this.props.size && `ds-c-button--${this.props.size}`,
      this.props.className
    );
  }

  handleClick(e) {
    if (!this.props.disabled) {
      this.props.onClick(e);
    }
  }

  render() {
    const attrs = this.attrs();
    let ComponentType = 'button';

    if (this.props.component) {
      ComponentType = this.props.component;
    } else if (this.props.href) {
      ComponentType = 'a';
      // Remove <button> specific attributes
      delete attrs.disabled;
      delete attrs.type;
    }

    return <ComponentType {...attrs}>{this.props.children}</ComponentType>;
  }
};

Button.displayName = 'Button';
Button.defaultProps = { type: 'button' };
Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string
  ]),
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: React.PropTypes.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.func
  ]),
  disabled: React.PropTypes.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: React.PropTypes.string,
  /** Applies the inverse theme styling */
  inverse: React.PropTypes.bool,
  modifier: React.PropTypes.oneOf([
    'primary',
    'danger',
    'success',
    'transparent'
  ]),
  /** Returns the `SyntheticEvent`. Not called when the button is disabled. */
  onClick: React.PropTypes.func,
  size: React.PropTypes.oneOf(['small', 'big']),
  /** HTML button `type` attribute */
  type: React.PropTypes.oneOf(['button', 'submit'])
};

export default Button;
