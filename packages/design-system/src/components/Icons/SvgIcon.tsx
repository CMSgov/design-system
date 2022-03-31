import React, { useState } from 'react';
import classNames from 'classnames';
import uniqueId from 'lodash/uniqueId';

export interface SvgIconProps {
  /**
   * Describes the value of the `aria-hidden` attribute on the SVG. Defaulted to true with the assumption that most icons are decorative.
   * If the icon does not have any associated label text, set this to `false` and ensure a `title` is provided for improved accessibility.
   */
  ariaHidden?: boolean;
  /**
   * Additional CSS classes to be added to the svg element
   */
  className?: string;
  /**
   * The elements that make up the SVG
   */
  children: React.ReactNode;
  /**
   * Long-text description of any SVG. Use for complex icons, otherwise `title` prop will suffice.
   */
  description?: string;
  /**
   * Optional prop to hide title element inside SVG. This should be used only if the icon is used in another element that has an accessible name.
   * If this prop is not set, the value of ariaHidden will be used. This is because if aria-Hidden=true, the svg is hidden to screen readers and the title is not needed.
   */
  hideTitle?: boolean;
  /**
   * A custom `id` attribute for the SVG
   */
  id?: string;
  /**
   * If `true` sets inverse fill color.
   */
  inversed?: boolean;
  /**
   * The descriptive name for the SVG icon
   */
  title: string;
  /**
   * A string describing the viewbox of the SVG.
   *
   * It is recommended that the icon is centered and fill up the default viewport size.
   * See [this blog post](https://webdesign.tutsplus.com/tutorials/svg-viewport-and-viewbox-for-beginners--cms-30844) for further explanation on viewBox and how to use it.
   */
  viewBox?: string;
}

// a type for react icon components that makes the 'title' prop optional & removes 'children' from type
export type IconCommonProps = Partial<Omit<SvgIconProps, 'children'>>;

type OmitProps = 'className' | 'children' | 'id' | 'title' | 'viewBox';

function SvgIcon({
  ariaHidden,
  className,
  children,
  description,
  hideTitle,
  id,
  inversed,
  title,
  viewBox,
}: Omit<React.SVGProps<SVGSVGElement>, OmitProps> & SvgIconProps): React.ReactElement {
  const svgClasses = classNames('ds-c-icon', { 'ds-c-icon--inverse': inversed }, className);

  const [iconId] = useState(id || uniqueId('icon-'));
  const titleId = `${iconId}__title`;
  const descriptionId = `${iconId}__desc`;
  const ariaLabelledBy = description ? `${titleId} ${descriptionId}` : titleId;
  const shouldHideTitle = hideTitle || ariaHidden;
  const labelledByProp = shouldHideTitle ? {} : { 'aria-labelledby': ariaLabelledBy };

  return (
    <svg
      aria-hidden={ariaHidden}
      className={svgClasses}
      focusable={false}
      id={iconId}
      role="img"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...labelledByProp}
    >
      {!shouldHideTitle && <title id={titleId}>{title}</title>}
      {description && <desc id={descriptionId}>{description}</desc>}
      {children}
    </svg>
  );
}

SvgIcon.defaultProps = {
  ariaHidden: true,
  inversed: false,
};

export default SvgIcon;
