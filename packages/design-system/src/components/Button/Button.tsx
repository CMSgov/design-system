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
   * Analytics events tracking is disabled by default.
   * Use this prop to pass custom analytics data to google analytics. You may override some or all values.
   * If you choose not to use this prop, or for any value you do not explicitly pass in, defaults will be provided automatically.
   * When the button is clicked, an event is triggered, the object value is populated and sent to google analytics
   * if `window.utag` instance is loaded.
   */
  analytics?: ButtonAnalyticsShape;
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
    analytics: {},
  };

  constructor(props: ButtonProps) {
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

  // Alert class properties
  elementRef: React.RefObject<HTMLElement>;

  getInputRef(): (...args: any[]) => React.RefObject<HTMLElement> {
    const { inputRef } = this.props;

    if (inputRef) {
      return inputRef;
    } else if (this.props.component === 'button') {
      return (element) => {
        this.elementRef = element;
        return this.elementRef;
      };
    }
    return null;
  }

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
      analytics,
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
    const stringChildren = React.Children.map(this.props.children, (child: React.ReactElement) => {
      if (typeof child === 'string') {
        return child;
      } else if (child.props) {
        const childNode = child.props.children;
        if (childNode && typeof childNode === 'string') {
          return childNode;
        }
      }
    });

    return stringChildren.join(' ');
  }

  sendButtonAnalytics(): void {
    const { analytics, children, href, id, type, variation } = this.props;
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
      analytics as Record<string, unknown>,
      defaultAnalyticsData as AnalyticsEventProps
    );
  }

  handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    if (!this.props.disabled) {
      if (buttonSendsAnalytics()) {
        this.sendButtonAnalytics();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }

  public render(): React.ReactNode {
    const attrs = this.attrs();
    const ComponentType = this.componentType();

    return (
      <ComponentType
        ref={this.props.inputRef}
        onKeyPress={this.componentType() === 'a' ? this.handleKeyPress : undefined}
        {...attrs}
      >
        {this.props.children}
      </ComponentType>
    );
  }
}