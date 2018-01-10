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
      inverse,
      onClick,
      size,
      variation,
      ...props
    } = this.props;

    const attrs = {
      className: this.classNames(),
      ...props
    };

    if (this.props.onClick) {
      attrs.onClick = this.handleClick.bind(this);
    }

    return attrs;
  }

  classNames() {
    let variationClass =
      this.props.variation && `ds-c-button--${this.props.variation}`;
    let disabledClass = this.props.disabled && 'ds-c-button--disabled';

    if (this.props.inverse) {
      if (disabledClass) {
        disabledClass += '-inverse';
      } else if (variationClass) {
        variationClass += '-inverse';
      } else {
        variationClass = 'ds-c-button--inverse';
      }
    }

    return classNames(
      'ds-c-button',
      disabledClass,
      !disabledClass && variationClass,
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
}

Button.defaultProps = { type: 'button' };
Button.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: PropTypes.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  disabled: PropTypes.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: PropTypes.string,
  /** Applies the inverse theme styling */
  inverse: PropTypes.bool,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes (`primary`, `danger`, `success`, `transparent`)
   */
  variation: PropTypes.string
};

export default Button;
