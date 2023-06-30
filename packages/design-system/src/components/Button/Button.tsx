import React from 'react';
import classNames from 'classnames';
import mergeRefs from '../utilities/mergeRefs';
import useButtonAnalytics from './useButtonAnalytics';
import { AnalyticsOverrideProps, AnalyticsParentDataProps } from '../analytics';
import { MutableRefObject } from 'react';

export type ButtonSize = 'small' | 'big';

export type ButtonVariation = 'solid' | 'ghost';

export type ButtonRef = MutableRefObject<any> | ((...args: any[]) => any);

interface CommonButtonProps extends AnalyticsOverrideProps, AnalyticsParentDataProps {
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
}

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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/button/).
 */
export const Button = (props: ButtonProps) => {
  const {
    analytics,
    analyticsLabelOverride,
    analyticsEventTypeOverride,
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
      ref={mergeRefs([inputRef, contentRef])}
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
  type: 'button' as const,
};

export default Button;
