import React from 'react';
import classNames from 'classnames';

export type CustomButtonComponentType = React.ComponentType<any> | React.FC;
export type ButtonComponentType = React.ElementType<any> | CustomButtonComponentType;
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
  disabled?: boolean;
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

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type LinkTypeButtonProps = CommonButtonProps & {
  component?: 'a';
  href: string;
};
type DefaultButtonTypeButtonProps = CommonButtonProps & {
  component?: 'button';
  href?: undefined | null;
};
type OtherTypeButtonProps<T extends ButtonComponentType> = CommonButtonProps & {
  component: T;
  href?: undefined | null;
};
// type NonAnchorButtonComponentType =
//   | CustomButtonComponentType
//   | React.ElementType<Exclude<string, 'a' | 'button'>>;
// type OtherTypeButtonProps<T extends NonAnchorButtonComponentType> = Merge<
//   React.ComponentPropsWithRef<Exclude<T, 'a' | 'button'>>,
//   CommonButtonProps & {
//     component: T;
//     href?: undefined | null;
//   }
// >;
type OmitProps = 'children' | 'className' | 'onClick' | 'ref' | 'size' | 'type' | 'href';
export type ButtonProps<T extends ButtonComponentType> = Omit<
  React.ComponentPropsWithRef<T>,
  OmitProps
> &
  (LinkTypeButtonProps | DefaultButtonTypeButtonProps | OtherTypeButtonProps<T>);

// export type ButtonProps<T extends ButtonComponentType> = Merge<CommonButtonProps<T>, React.ComponentPropsWithRef<T>>;

// export type ButtonProps<T extends ButtonComponentType> = CommonButtonProps<T> &
//   (T extends React.ElementType ? Omit<React.ComponentPropsWithRef<T>, OmitProps> : unknown);

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

  const ComponentType = props.component ?? (props.href ? 'a' : 'button');

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

  if (component !== 'button' || props.href) {
    // Assume `component` is not a <button> and remove <button> specific attributes
    attrs.role = 'button';
    delete attrs.disabled;
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
