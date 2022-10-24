import { AnalyticsFunction } from '../analytics';
import { MutableRefObject } from 'react';
import classNames from 'classnames';
import useButtonAnalytics from './useButtonAnalytics';

export type ButtonSize = 'small' | 'big';

export type ButtonVariation = 'solid' | 'ghost';

export type ButtonRef = MutableRefObject<any> | ((...args: any[]) => any);

type CommonButtonProps = {
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to
   * disable tracking for this component instance.
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this
   * content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**,
   * use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride?: string;
  /**
   * If needed for analytics, pass heading text of parent component of button.
   */
  analyticsParentHeading?: string;
  /**
   * If needed for analytics, pass type of parent component of button.
   */
  analyticsParentType?: string;
  /**
   * Optional callback that will intercept analytics events for this component.
   * If none is specified, the design system will use the default analytics
   * function, which can be overwritten globally with `setDefaultAnalyticsFunction`.
   */
  onAnalyticsEvent?: AnalyticsFunction;
  /**
   * Label text or HTML
   */
  children: string | React.ReactNode;
  /**
   * Additional classes to be added to the root button element.
   */
  className?: string;
  disabled?: boolean;
  /**
   * When provided, the root component will render as an `<a>` element
   * rather than `button`.
   */
  href?: string;
  /**
   * Access a reference to the `button` or `a` element
   */
  inputRef?: ButtonRef;
  /**
   * Applies the alternate color to a Button. By default, Button
   * uses the `main` color.
   */
  isAlternate?: boolean;
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the Button is disabled.
   */
  onClick?: (...args: any[]) => any;
  /**
   * Defines a color palette best used when Button is placed on a dark
   * background-color. By default, Button uses a light color palette.
   */
  onDark?: boolean;
  size?: ButtonSize;
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type?: React.ComponentProps<'button'>['type'];
  /**
   * A string corresponding to Button variation classes.
   */
  variation?: ButtonVariation;
};

// Collect all the additional properties that one could supply to a button component
// that will be passed down to whatever element or component is being used. This is
// generally permissive in order to keep the typing simple at the expense of being
// more accurate. In a previous version of this, `OtherProps` was generic so that we
// could extract any props from a custom component that is being passed in; however,
// we are deprecating that prop because it's not actually needed and creates
// unnecessary complexity that we have to maintain.
type OtherProps = Omit<
  // All other props that could be passed to buttons or anchors
  React.ComponentPropsWithRef<'button'> & React.ComponentPropsWithRef<'a'>,
  // Omit any properties that we're defining on our own `CommonButtonProps`
  keyof CommonButtonProps
>;

export type ButtonProps = CommonButtonProps & OtherProps;

export const Button = (props: ButtonProps) => {
  const {
    analytics,
    analyticsLabelOverride,
    analyticsParentHeading,
    analyticsParentType,
    onAnalyticsEvent,
    children,
    className,
    inputRef,
    isAlternate,
    onClick,
    onDark,
    size,
    variation,
    ...otherProps
  } = props;

  const { contentRef, sendButtonEvent } = useButtonAnalytics(props);
  const ComponentType = props.href ? 'a' : 'button';
  const colorSchemeClass = isAlternate && `ds-c-button--alternate`;
  const modeClass = onDark && `ds-c-button--on-dark`;
  const sizeClass = size && `ds-c-button--${size}`;
  const variationClass = variation && `ds-c-button--${variation}`;

  const allClassNames = classNames(
    'ds-c-button',
    colorSchemeClass,
    modeClass,
    sizeClass,
    variationClass,
    className
  );

  const attrs = {
    ...otherProps,
    className: allClassNames,
  };

  if (ComponentType !== 'button') {
    delete attrs.disabled;
    delete attrs.type;

    if (props.disabled) {
      attrs.role = 'link';
      attrs['aria-disabled'] = true;
      delete attrs.href;
    }
  }

  function handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    if (!props.disabled) {
      sendButtonEvent();
      if (onClick) {
        onClick(e);
      }
    }
  }

  function handleKeyPress(e: React.KeyboardEvent): void {
    // Trigger onClick on space key event for `<a>` elements
    if (e.key === ' ') {
      handleClick(e);
    }
  }

  return (
    <ComponentType
      ref={(el) => {
        contentRef.current = el;
        if (inputRef) {
          if (typeof inputRef === 'function') {
            inputRef(el);
          } else {
            inputRef.current = el;
          }
        }
      }}
      onClick={handleClick}
      onKeyPress={ComponentType === 'a' ? handleKeyPress : undefined}
      {...attrs}
    >
      {children}
    </ComponentType>
  );
};

Button.defaultProps = {
  isAlternate: false,
  onDark: false,
  type: 'button',
};

export default Button;
