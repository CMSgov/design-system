import PropTypes from 'prop-types';
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
export class Button extends React.PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV !== 'production') {
      if (props.buttonRef) {
        console.warn(
          `[Deprecated]: Please remove the 'buttonRef' prop in <Button>, use 'inputRef' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (props.inverse) {
        console.warn(
          `[Deprecated]: Please remove the 'inverse' prop in <Button>, use 'inversed' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Get an object of props to pass to the rendered <Button> component
  attrs() {
    /**
     * Since any number of arbitrary props can be passed into this component, we
     * use a destructuring assignment to get only the props we want to pass to the
     * rendered HTML element. For example, the "variation" prop is used to generate
     * the classNames, but doesn't need passed to the rendered component, so we
     * omit it here so that it's not included in the props object.
     */
    const {
      className,
      component,
      inputRef,
      inversed,
      inverse,
      onClick,
      size,
      variation,
      buttonRef,
      ...props
    } = this.props;

    const attrs = {
      className: this.classNames(),
      ...props
    };

    if (this.props.onClick) {
      attrs.onClick = this.handleClick;
    }

    if (component !== 'button' || this.props.href) {
      // Assume `component` is not a <button> and remove <button> specific attributes
      attrs.role = 'button';
      delete attrs.disabled;
      delete attrs.type;
    }

    return attrs;
  }

  componentType() {
    let component = this.props.component;
    if (component === 'button' && this.props.href) {
      // If `href` is provided and a custom component is not, we render `<a>` instead
      component = 'a';
    }
    return component;
  }

  classNames() {
    const variationClass = this.props.variation && `ds-c-button--${this.props.variation}`;
    const disabledClass =
      this.props.disabled && this.componentType() !== 'button' && 'ds-c-button--disabled';
    const sizeClass = this.props.size && `ds-c-button--${this.props.size}`;
    const inverseClass = (this.props.inversed || this.props.inverse) && 'ds-c-button--inverse';

    return classNames(
      'ds-c-button',
      disabledClass,
      variationClass,
      inverseClass,
      sizeClass,
      this.props.className
    );
  }

  handleKeyPress(e) {
    // Trigger onClick on space key event for `<a>` elements
    if (e.key === ' ') {
      this.handleClick(e);
    }
  }

  handleClick(e) {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const attrs = this.attrs();
    const ComponentType = this.componentType();

    return (
      <ComponentType
        ref={this.props.inputRef || this.props.buttonRef}
        onKeyPress={this.componentType() === 'a' ? this.handleKeyPress : undefined}
        {...attrs}
      >
        {this.props.children}
      </ComponentType>
    );
  }
}

Button.defaultProps = {
  type: 'button',
  component: 'button'
};
Button.propTypes = {
  /**
   * Label text or HTML
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  disabled: PropTypes.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: PropTypes.string,
  /**
   * Access a reference to the `button` or `a` element
   */
  inputRef: PropTypes.func,
  /** @hide-prop [Deprecated] Use inversed instead */
  inverse: PropTypes.bool,
  /** Applies the inverse theme styling */
  inversed: PropTypes.bool,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick: PropTypes.func,
  /**
   * @hide-prop [Deprecated] Access a reference to the `button` or `a` element. Please use `inputRef` instead.
   */
  buttonRef: PropTypes.func,
  size: PropTypes.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes
   */
  variation: PropTypes.oneOf(['primary', 'danger', 'success', 'transparent'])
};

export default Button;
