import * as React from 'react';

export type BadgeChildren = string | React.ReactNode;

export type BadgeSize = "big";

export type BadgeVariation = "info" | "success" | "warn" | "alert";

export interface BadgeProps {
    /**
     * Additional classes to be added to the root badge element.
     * Useful for adding utility classes.
     */
    className?: string;
    /**
     * Label text or HTML.
     */
    children: BadgeChildren;
    /**
     * @hide-prop
     */
    id?: string;
    /**
     * Sets the font size of the Badge
     */
    size?: BadgeSize;
    /**
     * A string corresponding to the badge-component variation classes
     */
    variation?: BadgeVariation;
}

declare const Badge: React.FC<BadgeProps>;

export default Badge;

