import {
  AnalyticsEventProps,
  EVENT_CATEGORY,
  sendAnalyticsEvent,
} from '../analytics/SendAnalytics';
import React from 'react';
import { buttonSendsAnalytics } from '../flags';
import classNames from 'classnames';

export type ButtonComponent = React.ReactElement<any> | any | ((...args: any[]) => any);
export type ButtonSize = 'small' | 'big';
export type ButtonType = 'button' | 'submit';
/**
 * A string corresponding to the button-component variation classes.
 * The danger variation is deprecated and will be removed in a future release.
 */
export type ButtonVariation = 'primary' | 'danger' | 'success' | 'transparent';

/* eslint-disable camelcase */
export interface ButtonAnalyticsShape {
  event_name?: string;
  text?: string;
  button_style?: string;
  button_type?: string;
  link_url?: string;
  html_id?: string;
  ga_eventAction?: string;
  ga_eventCategory?: string;
  ga_eventLabel?: string;
}

export interface ButtonProps {
  /**
   * Analytics events tracking is disabled by default via feature flag.
   * Use this prop to pass custom analytics data to google analytics for an onClick event. You may override some or all values.
   * If you choose not to use this prop, or for any value you do not explicitly pass in, defaults will be provided automatically.
   * When the button is clicked, an event is triggered, the object value is populated and sent to google analytics
   * if `window.utag` instance is loaded.
   */
  analyticsOnClick?: ButtonAnalyticsShape;
  /**
   * Label text or HTML
   */
  children: string | React.ReactNode;
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className?: string;
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component?: ButtonComponent;
  disabled?: boolean;
  /**
   * Use this prop to disable sending analytics data for click action.
   * This differs from the feature flag in that it can disable analytics for a specific instance of the Button component.
   * Note: analytics is turned off by default via feature flag. Use this prop only if feature flag is on and you want to disable analytics for a singular instance of Button.
   */
  disableAnalyticsOnClick?: boolean;
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href?: string;
  /**
   * html id for element
   */
  id?: string;
  /**
   * Access a reference to the `button` or `a` element
   */
  inputRef?: (...args: any[]) => any;
  /**
   * @hide-prop [Deprecated] Use inversed instead
   */
  inverse?: boolean;
  /** Applies the inverse theme styling */
  inversed?: boolean;
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick?: (...args: any[]) => any;
  size?: ButtonSize;
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type?: ButtonType;
  /**
   * A string corresponding to the button-component variation classes.
   * The `'danger'` variation is deprecated and will be removed in a future release.
   */
  variation?: ButtonVariation;
}

type OmitProps = 'children' | 'className' | 'onClick' | 'ref' | 'size' | 'type' | 'id';

export default class Button extends React.PureComponent<
  Omit<React.ComponentPropsWithRef<'button'>, OmitProps> &
    Omit<React.ComponentPropsWithRef<'a'>, OmitProps> &
    ButtonProps
> {
  static defaultProps = {
    type: 'button',
    component: 'button',
    analyticsOnClick: {},
    disableAnalyticsOnClick: false,
  };

  constructor(props: ButtonProps) {
    super(props);

    this.elementTextRef = null;

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
    this.handleRef = this.handleRef.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendButtonAnalytics = this.sendButtonAnalytics.bind(this);
  }

  // Alert class properties
  elementTextRef: HTMLElement;

  // Get an object of props to pass to the rendered <Button> component
  attrs(): any {
    /**
     * Since any number of arbitrary props can be passed into this component, we
     * use a destructuring assignment to get only the props we want to pass to the
     * rendered HTML element. For example, the "variation" prop is used to generate
     * the classNames, but doesn't need to be passed to the rendered component, so
     * we omit it here so that it's not included in the props object.
     */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      className,
      component,
      inputRef,
      inversed,
      inverse,
      onClick,
      size,
      variation,
      analyticsOnClick,
      disableAnalyticsOnClick,
      ...props
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const attrs: any = {
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

  componentType(): string {
    let component = this.props.component;

    if (component === 'button' && this.props.href) {
      // If `href` is provided and a custom component is not, we render `<a>` instead
      component = 'a';
    }
    return component;
  }

  classNames(): string {
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

  handleKeyPress(e: React.KeyboardEvent): void {
    // Trigger onClick on space key event for `<a>` elements
    if (e.key === ' ') {
      this.handleClick(e);
    }
  }

  getTextFromNode(): string {
    // Buutton might have nested elements as children, so use ref to get full text
    if (this.elementTextRef) {
      return this.elementTextRef.textContent;
    }

    return '';
  }

  sendButtonAnalytics(): void {
    const { analyticsOnClick, children, href, id, type, variation } = this.props;
    const buttonStyle = variation || 'default';
    const text = typeof children === 'string' ? children : this.getTextFromNode();

    const defaultAnalyticsData: ButtonAnalyticsShape = {
      event_name: 'button_engagement',
      text,
      button_style: buttonStyle,
      button_type: href ? 'link' : type,
      link_url: href || null,
      html_id: id || null,
      ga_eventCategory: EVENT_CATEGORY.uiComponents,
      ga_eventAction: `engaged ${buttonStyle} button`,
      ga_eventLabel: `button text: ${text}`,
    };

    sendAnalyticsEvent(
      analyticsOnClick as Record<string, unknown>,
      defaultAnalyticsData as AnalyticsEventProps
    );
  }

  handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    const { disabled, disableAnalyticsOnClick, onClick } = this.props;
    if (!disabled) {
      if (buttonSendsAnalytics() && !disableAnalyticsOnClick) {
        this.sendButtonAnalytics();
      }

      if (onClick) {
        onClick(e);
      }
    }
  }

  handleRef(ref: any): void {
    const { inputRef } = this.props;
    this.elementTextRef = ref;

    if (inputRef) {
      inputRef(ref);
    }
  }

  isFunctionalComponent(): boolean {
    // Can't pass refs to functional components without forwardRef
    const { component } = this.props;
    return component && typeof component === 'function';
  }

  public render(): React.ReactNode {
    const attrs = this.attrs();
    const ComponentType = this.componentType();

    return (
      <ComponentType
        ref={this.isFunctionalComponent() ? null : this.handleRef}
        onKeyPress={this.componentType() === 'a' ? this.handleKeyPress : undefined}
        {...attrs}
      >
        {this.props.children}
      </ComponentType>
    );
  }
}
