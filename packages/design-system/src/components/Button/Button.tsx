import React from 'react';
import classNames from 'classnames';

export type ButtonComponentType = React.ElementType<any> | React.ComponentType<any>;
export type ButtonSize = 'small' | 'big';
/**
 * A string corresponding to the button-component variation classes.
 * The danger variation is deprecated and will be removed in a future release.
 */
export type ButtonVariation = 'primary' | 'danger' | 'success' | 'transparent';

type CommonButtonProps = {
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
  component?: ButtonComponentType;
  disabled?: boolean;
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href?: string;
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
  type?: React.ComponentProps<'button'>['type'];
  /**
   * A string corresponding to the button-component variation classes.
   * The `'danger'` variation is deprecated and will be removed in a future release.
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

export const Button = ({
  children,
  className,
  component,
  disabled,
  href,
  inputRef,
  inversed,
  inverse,
  onClick,
  size,
  variation,
  type = 'button',
  ...otherProps
}: ButtonProps) => {
  if (process.env.NODE_ENV !== 'production') {
    if (inverse) {
      console.warn(
        `[Deprecated]: Please remove the 'inverse' prop in <Button>, use 'inversed' instead. This prop has been renamed and will be removed in a future release.`
      );
    }
    if (variation === 'danger') {
      console.warn(
        `[Deprecated]: Please remove the 'danger' variation prop in <Button>. This prop has will be removed in a future release.`
      );
    }
  }

  function handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    if (!disabled && onClick) {
      onClick(e);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent): void {
    // Trigger onClick on space key event for `<a>` elements
    if (e.key === ' ') {
      handleClick(e);
    }
  }
  const ComponentType = component ?? (href ? 'a' : 'button');

  const variationClass = variation && `ds-c-button--${variation}`;
  const disabledClass = disabled && ComponentType !== 'button' && 'ds-c-button--disabled';
  const sizeClass = size && `ds-c-button--${size}`;
  const inverseClass = (inversed || inverse) && 'ds-c-button--inverse';
  const allClassNames = classNames(
    'ds-c-button',
    disabledClass,
    variationClass,
    inverseClass,
    sizeClass,
    className
  );

  const attrs: any = {
    className: allClassNames,
    disabled,
    href,
    type,
    ...otherProps,
  };

  if (onClick) {
    attrs.onClick = handleClick;
  }

  if (ComponentType !== 'button') {
    // Assume `component` is not a custom component rendering a <button>
    // and remove <button> specific attributes
    attrs.role = 'button';
    delete attrs.disabled;
    delete attrs.type;
  }

  return (
    <ComponentType
      ref={inputRef}
      onKeyPress={ComponentType === 'a' ? handleKeyPress : undefined}
      {...attrs}
    >
      {children}
    </ComponentType>
  );
};

export default Button;
