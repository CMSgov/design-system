import { useState } from 'react';
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
  id,
  inversed,
  title,
  viewBox,
  ...otherProps
}: Omit<React.SVGProps<SVGSVGElement>, OmitProps> & SvgIconProps): React.ReactElement {
  const svgClasses = classNames('ds-c-icon', { 'ds-c-icon--inverse': inversed }, className);

  const [iconId] = useState(id || uniqueId('icon-'));
  const titleId = `${iconId}__title`;
  const descriptionId = `${iconId}__desc`;
  const ariaLabelledBy = description ? `${titleId} ${descriptionId}` : titleId;
  const isSrVisible = !ariaHidden;
  const screenReaderProps = {};
  if (isSrVisible) {
    screenReaderProps['aria-labelledby'] = ariaLabelledBy;
    screenReaderProps['role'] = 'img';
  }

  return (
    <svg
      aria-hidden={ariaHidden}
      className={svgClasses}
      focusable={false}
      id={iconId}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...screenReaderProps}
      {...otherProps}
    >
      {isSrVisible && <title id={titleId}>{title}</title>}
      {isSrVisible && description && <desc id={descriptionId}>{description}</desc>}
      {children}
    </svg>
  );
}

SvgIcon.defaultProps = {
  ariaHidden: true,
  inversed: false,
};

export default SvgIcon;
