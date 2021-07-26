import { EVENT_CATEGORY, sendAnalyticsEvent } from '../analytics/SendAnalytics';
import PropTypes from 'prop-types';
import React from 'react';
import { buttonSendsAnalytics } from '../flags';
import classNames from 'classnames';

export class Button extends React.PureComponent {
  constructor(props) {
    super(props);

    this.elementRef = null;

    if (process.env.NODE_ENV !== 'production') {
      if (props.inverse) {
        console.warn(
          `[Deprecated]: Please remove the 'inverse' prop in <Button>, use 'inversed' instead. This prop has been renamed and will be removed in a future release.`
        );
      }
      if (props.variation === 'danger') {
        console.warn(
          `[Deprecated]: Please remove the 'danger' variation prop in <Button>. This prop has will be removed in a future release.`
        );
      }
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendButtonAnalytics = this.sendButtonAnalytics.bind(this);
  }

  getInputRef() {
    const { inputRef } = this.props;

    if (inputRef) {
      return inputRef;
    } else if (this.props.component === 'button') {
      return element => {
        this.elementRef = element;
      };
    }
    return null;
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
      analytics,
      ...props
    } = this.props;

    const attrs = {
      className: this.classNames(),
      ...props,
    };

    if (this.props.onClick || buttonSendsAnalytics()) {
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

  getTextFromNode() {
    const ref = this.props.inputRef || this.elementRef;

    if (ref) {
      return ref.textContent;
    }
    return '';
  }

  sendButtonAnalytics() {
    const {analytics, children, href, id, type, variation} = this.props;
    const buttonStyle = variation || 'default';
    const text = typeof children === 'string' ? children : this.getTextFromNode();

    console.log(text);

    const defaultAnalyticsData = {
      event_name: 'button_engagement',
      text,
      button_style: buttonStyle,
      button_type: href ? 'link' : type,
      link_url: href || null,
      html_id: id || null,
      ga_eventCategory: EVENT_CATEGORY,
      ga_eventAction: `engaged ${buttonStyle} button`,
      ga_eventLabel: `button text: ${text}`
    }

    sendAnalyticsEvent(analytics, defaultAnalyticsData);

  }

  handleClick(e) {
    if (!this.props.disabled) {
      if (buttonSendsAnalytics()) {
        this.sendButtonAnalytics();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }

  render() {
    const attrs = this.attrs();
    const ComponentType = this.componentType();

    return (
      <ComponentType
        ref={this.getInputRef()}
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
  component: 'button',
  analytics: {}
};
Button.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  analytics: PropTypes.object,
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
  id: PropTypes.string,
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
  size: PropTypes.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: PropTypes.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes.
   * The `'danger'` variation is deprecated and will be removed in a future release.
   */
  variation: PropTypes.oneOf(['primary', 'danger', 'success', 'transparent']),
};

export default Button;
