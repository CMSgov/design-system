import * as React from 'react';

export type ButtonChildren = string | React.ReactNode;

export type ButtonComponent = React.ReactElement<any> | any | ((...args: any[])=>any);

export type ButtonSize = "small" | "big";

export type ButtonType = "button" | "submit";

export type ButtonVariation = "primary" | "danger" | "success" | "transparent";

export interface ButtonProps {
    /**
     * Label text or HTML
     */
    children: ButtonChildren;
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
     * @hide-prop
     */
    id?: string;
    /**
     * Access a reference to the `button` or `a` element
     */
    inputRef?: (...args: any[])=>any;
    /**
     * @hide-prop [Deprecated] Use inversed instead
     */
    inverse?: boolean;
    /**
     * Applies the inverse theme styling
     */
    inversed?: boolean;
    /**
     * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
     * Not called when the button is disabled.
     */
    onClick?: (...args: any[])=>any;
    size?: ButtonSize;
    /**
     * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
     */
    type?: ButtonType;
    /**
     * A string corresponding to the button-component variation classes
     */
    variation?: ButtonVariation;
}

export default class Button extends React.Component<ButtonProps, any> {
    render(): JSX.Element;

}

