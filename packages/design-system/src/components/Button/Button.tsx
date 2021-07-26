import React from 'react';
import classNames from 'classnames';

export interface ButtonProps {
  /**
   * Label text or HTML
   */
  children: React.ReactNode,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className?: string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component?: React.ReactElement<any> | any | ((...args: any[]) => any),
  disabled?: boolean,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href?: string,
  /**
   * Access a reference to the `button` or `a` element
   */
  inputRef?: (...args: any[]) => any,
  /** 
   * @hide-prop [Deprecated] Use inversed instead 
   */
  inverse?: boolean,
  /** Applies the inverse theme styling */
  inversed?: boolean,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick?: (...args: any[]) => any,
  size?: 'small' | 'big',
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type?: 'button' | 'submit',
  /**
   * A string corresponding to the button-component variation classes.
   * The `'danger'` variation is deprecated and will be removed in a future release.
   */
  variation?: 'primary' | 'danger' | 'success' | 'transparent',
}

export default class Button extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    type: 'button',
    component: 'button',
  }

  constructor(props: ButtonProps) {
    super(props);

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
    const {
      className,
      component,
      inputRef,
      inversed,
      inverse,
      onClick,
      size,
      variation,
      ...props
    } = this.props;

    const attrs: any = {
      className: this.classNames(),
      ...props,
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

  componentType(): string {
    let component = this.props.component;

    if (component === 'button' && this.props.href) {
      // If `href` is provided and a custom component is not, we render `<a>` instead
      component = 'a';
    }
    return component;
  }

  classNames(): any {
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

  handleClick(e: React.MouseEvent | React.KeyboardEvent): void {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(e);
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
