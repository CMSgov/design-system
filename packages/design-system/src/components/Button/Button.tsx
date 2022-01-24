import React from 'react';
import classNames from 'classnames';

export type ButtonComponentType = React.ElementType<any> | React.ComponentType<any>;
export type ButtonSize = 'small' | 'big';
/**
 * A string corresponding to the button-component variation classes.
 * The danger variation is deprecated and will be removed in a future release.
 */
export type ButtonVariation = 'primary' | 'danger' | 'success' | 'transparent';

type CommonButtonProps<T extends ButtonComponentType> = {
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
  component?: T;
  disabled?: boolean;
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
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
   * A string corresponding to the button-component variation classes.
   * The `'danger'` variation is deprecated and will be removed in a future release.
   */
  variation?: ButtonVariation;
};

// Collect all the additional properties that one could supply to a button component
// that will be passed down to whatever element or component is being used. This is
// generally permissive in order to keep the typing simple at the expense of being
// more accurate. `OtherProps` is generic so that we can extract any props from a
// custom component that is being passed in. I'm trying to keep most of the complexity
// in this section and leave the `ButtonProps` definition simpler. - PW
//
// Extend is a utility type that works like `Object.assign` where properties defined
// on the latter type `N` override properties defined on the former type `M`
type Extend<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
type OtherProps<T extends ButtonComponentType> = Omit<
  // Get all possible HTML attributes and override with any more specific props from
  // the possibly custom component type `T`
  Extend<React.HTMLAttributes<HTMLElement>, React.ComponentPropsWithRef<T>>,
  // And omit any properties that we're defining on our own `CommonButtonProps`
  keyof CommonButtonProps<T>
>;

export type ButtonProps<T extends ButtonComponentType> = CommonButtonProps<T> & OtherProps<T>;

export const Button = <T extends ButtonComponentType>(props: ButtonProps<T>) => {
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

  function handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    if (!props.disabled && props.onClick) {
      props.onClick(e);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent): void {
    // Trigger onClick on space key event for `<a>` elements
    if (e.key === ' ') {
      handleClick(e);
    }
  }

  /**
   * Since any number of arbitrary props can be passed into this component, we
   * use a destructuring assignment to get only the props we want to pass to the
   * rendered HTML element. For example, the "variation" prop is used to generate
   * the classNames, but doesn't need to be passed to the rendered component, so
   * we omit it here so that it's not included in the props object.
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
    ...otherProps
  } = props;

  const ComponentType = component ?? (props.href ? 'a' : 'button');

  const variationClass = variation && `ds-c-button--${variation}`;
  const disabledClass = props.disabled && ComponentType !== 'button' && 'ds-c-button--disabled';
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
    ...otherProps,
  };

  if (props.onClick) {
    attrs.onClick = handleClick;
  }

  if (ComponentType !== 'button') {
    // Assume `component` is not a <button> and remove <button> specific attributes
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
      {props.children}
    </ComponentType>
  );
};

export default Button;
