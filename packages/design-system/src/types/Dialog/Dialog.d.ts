import * as React from 'react';

export type DialogCloseButtonSize = "small" | "big";

export type DialogSize = "narrow" | "wide" | "full";

export interface DialogProps {
    /**
     * If `true`, the modal will receive a role of `alertdialog`, instead of its
     * default `dialog`. The `alertdialog` role should only be used when an
     * alert, error, or warning occurs.
     */
    alert?: boolean;
    /**
     * Provide a **DOM node** which contains your page's content (which the modal should render
     * outside of). When the modal is open this node will receive `aria-hidden="true"`.
     * This can help screen readers understand what's going on.
     * Also see `getApplicationNode`.
     */
    applicationNode?: any;
    /**
     * Buttons or other HTML to be rendered in the "actions" bar
     * at the bottom of the dialog.
     */
    actions?: React.ReactNode;
    /**
     * Additional classes to be added to the actions container.
     */
    actionsClassName?: string;
    /**
     * Aria label for the close button
     */
    ariaCloseLabel?: string;
    /**
     * The modal's body content
     */
    children: React.ReactNode;
    /**
     * Additional classes to be added to the root dialog element.
     */
    className?: string;
    /**
     * Size of the close button. See [Button component]({{root}}/components/button/#components.button.react)
     */
    closeButtonSize?: DialogCloseButtonSize;
    /**
     * Variation string to be applied to close button component. See [Button component]({{root}}/components/button/#components.button.react)
     */
    closeButtonVariation?: string;
    /**
     * For internationalization purposes, the text for the "Close" button must be
     * passed in as a prop.
     */
    closeText?: React.ReactNode;
    /**
     * Disable exiting the dialog when a user presses the Escape key.
     */
    escapeExitDisabled?: boolean;
    /**
     * Same as `applicationNode`, but a function that returns the node instead of
     * the node itself. The function will not be called until after the component
     * mounts, so it's safe to use browser globals and refer to DOM nodes within
     * it (e.g. `document.getElementById(..)`)
     */
    getApplicationNode?: (...args: any[])=>any;
    /**
     * Additional classes to be added to the header, which wraps the heading and
     * close button.
     */
    headerClassName?: string;
    /**
     * The Dialog's heading, to be rendered in the header alongside the close button.
     */
    heading?: React.ReactNode;
    /**
     * @hide-prop
     */
    id?: string;
    /**
     * A method to handle the state change of exiting (or deactivating)
     * the modal. It will be invoked when the user presses Escape, or clicks outside
     * the dialog (if `underlayClickExits=true`).
     */
    onExit?: (...args: any[])=>any;
    size?: DialogSize;
    /**
     * @hide-prop [Deprecated] This prop has been renamed to `heading`.
     */
    title?: React.ReactNode;
    /**
     * Enable exiting the dialog when a user clicks the underlay.
     */
    underlayClickExits?: boolean;
}

type OmitProps = "size";

// Remove the "size" definition inside React.HTMLProps<HTMLDivElement>, and use ours instead
declare const Dialog: React.FC<Omit<React.HTMLProps<HTMLDivElement>, OmitProps> & DialogProps>;

export default Dialog;

