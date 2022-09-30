import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

interface UtilityExampleListProps {
  /**
   * list of variable color names
   */
  utilityNames: string[];
  /**
   * list of variable color names
   */
  utilityValues: string[];
  /**
   *
   * the start of the color name. Sometimes it is the variable preface (`$color`) or sometimes it is the css class name (`ds-u`)
   */
  preface: string;
  /**
   * Name of currently selected theme
   */
  theme: string;
}

// converts an rgb string 'rgb(15,24,128)' to a hex value '#0819A9'
// pulled from tokens conversion
export const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}`;
};

/**
 * displays a list of color swatches with a sample of the color, the SCSS variable name & the hex value
 * @param utilityNames {String[]} a list of color names - should be same as SCSS token
 */
/**
 * displays a list of color swatches with a sample of the color, the SCSS variable name & the hex value
 * @param utilityValues {String[]} a list of color names - should be same as SCSS token
 */
const UtilityExampleList = ({
  utilityNames,
  utilityValues,
  preface,
  theme,
}: UtilityExampleListProps) => {
  const refList = useRef([]);
  const initialColors = utilityNames.map((color) => ({ name: color, hex: '' }));
  const [colorList, setColorList] = useState(initialColors);

  useEffect(() => {
    // after swatch has been rendered once, pull rgb color from element styles & convert to hex
    const updatedColorList = colorList.map((colorItem, index) => {
      const styles = getComputedStyle(refList.current[index]);
      const rgbColor = styles?.backgroundColor;
      if (!rgbColor) return colorItem;

      const rgb = rgbColor.match(/([0-9]+)/g);

      if (rgb.length > 3 && parseInt(rgb[3]) === 0) {
        // Color is transparent
        return colorItem;
      }

      return {
        ...colorItem,
        hex: rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2])),
      };
    });

    setColorList(updatedColorList);
  }, [
    // If the theme changes, we need to recalculate our hex values
    theme,
  ]);

  return (
    <div className="c-utility-example__list ds-u-border--1 ds-u-padding--2">
      {colorList.map(({ name, hex }, index) => (
        <article className="c-utility-example__row" key={`${name}`}>
          <div className="c-utility-example__container">
            <div
              className={`${preface}${name} c-utility-example__item`}
              ref={(el) => (refList.current[index] = el)}
            ></div>
          </div>
          <code>
            .{preface}
            {name}
          </code>
          <code>{utilityValues}</code>
        </article>
      ))}
    </div>
  );
};

export default UtilityExampleList;
