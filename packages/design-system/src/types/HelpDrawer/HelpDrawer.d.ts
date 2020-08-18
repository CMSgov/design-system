import * as React from 'react';

export type HelpDrawerHeadingLevel = "1" | "2" | "3" | "4" | "5";

export interface HelpDrawerProps {
    /**
     * Helps give more context to screen readers on the button that closes the Help Drawer
     */
    ariaLabel?: string;
    closeButtonText?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    footerBody?: React.ReactNode;
    footerTitle?: string;
    /**
     * Text for the HelpDrawer title. Required because the `heading` will be focused on mount.
     */
    heading?: string;
    /**
     * Heading type to override default `<h3>`
     */
    headingLevel?: HelpDrawerHeadingLevel;
    onCloseClick: (...args: any[])=>any;
    /**
     * @hide-prop [Deprecated] This prop has been renamed to `heading`.
     */
    title?: string;
}

export default class HelpDrawer extends React.Component<HelpDrawerProps, any> {
    render(): JSX.Element;

}

