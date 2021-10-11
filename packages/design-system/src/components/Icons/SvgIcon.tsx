/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

export interface SvgIconProps {
  /**
   * Additional CSS classes to be added to the svg element
   */
  className?: string;
  /**
   * The elements that make up the SVG
   */
  children: React.ReactNode;
  /**
   * If `true` sets inverse fill color.
   */
  inversed?: boolean;
  /**
   * Describes if the SVG icon is a decorative element. If `true`, an `aria-hidden="true"` will be added to the svg along with a `role="img"`
   */
  isDecorative?: boolean;
  /**
   * The descriptive nave for the SVG icon
   */
  title?: string;
  /**
   * A string describing the viewbox of the SVG
   */
  viewBox?: string;
}

type OmitProps = 'className' | 'children' | 'title' | 'viewBox';

// TODO: Should this extend SVG props?
function SvgIcon({
  className,
  children,
  isDecorative,
  title,
  viewBox,
}: Omit<React.SVGProps<SVGSVGElement>, OmitProps> & SvgIconProps): React.ReactElement {
  const svgClasses = classNames('ds-c-icon', className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={isDecorative ? true : undefined}
      className={svgClasses}
      focusable={false}
      viewBox={viewBox}
      role={isDecorative ? 'img' : undefined}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

SvgIcon.defaultProps = {
  inversed: false,
  isDecorative: false,
};

export default SvgIcon;
