import React, { useState } from 'react';
import classNames from 'classnames';
import uniqueid from 'lodash.uniqueid';

export interface SvgIconProps {
  /**
   * Describes the value of the `aria-hidden` attribute on the SVG. Use if the icon content is described elsewhere.
   * For example, if the icon is used in a button or link along with text, the text may describe the icon content more specifically.
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
   * A custom `id` attribute for the SVG
   */
  id?: string;
  /**
   * If `true` sets inverse fill color.
   */
  inversed?: boolean;
  /**
   * The descriptive nave for the SVG icon
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

type OmitProps = 'className' | 'children' | 'id' | 'title' | 'viewBox';

// TODO: Should this extend SVG props?
function SvgIcon({
  ariaHidden,
  className,
  children,
  description,
  id,
  inversed,
  title,
  viewBox,
}: Omit<React.SVGProps<SVGElement>, OmitProps> & SvgIconProps): React.ReactElement {
  const svgClasses = classNames('ds-c-icon', { 'ds-c-icon--inverse': inversed }, className);

  const [iconId] = useState(id || uniqueid('icon-'));
  const titleId = `${iconId}__title`;
  const descriptionId = `${iconId}__desc`;
  const ariaLabelledBy = description ? `${titleId} ${descriptionId}` : titleId;

  return (
    <svg
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden}
      className={svgClasses}
      focusable={false}
      id={iconId}
      role="img"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>
      {description && <desc id={descriptionId}>{description}</desc>}
      {children}
    </svg>
  );
}

SvgIcon.defaultProps = {
  ariaHidden: false,
  inversed: false,
};

export default SvgIcon;
