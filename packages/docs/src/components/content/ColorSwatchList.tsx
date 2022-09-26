import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

interface ColorSwatchListProps {
  /**
   * a fill class for the background of the name text
   */
  backgroundClass?: string;
  /**
   * list of variable color names
   */
  colorNames: string[];
  /**
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
 * @param colorNames {String[]} a list of color names - should be same as SCSS token
 */
const ColorSwatchList = ({ backgroundClass, colorNames, preface, theme }: ColorSwatchListProps) => {
  const refList = useRef([]);
  const initialColors = colorNames.map((color) => ({ name: color, hex: '' }));
  const [colorList, setColorList] = useState(initialColors);

  if (colorList[0].name === 'primary') console.log(theme, colorList[0].hex);
  // Recalculate hex values every time we render, because there's a chance the browser could
  // have rendered with the old colors even though we already switched to the current theme.
  // It may have to do with the fact that Helmet doesn't make its changes during render but
  // by manipulating the DOM directly. This means that even if we change `theme` in Layout,
  // the DOM might not have been updated by the time this renders. Before this, I had [theme]
  // as the dependency array, but it didn't work on Firefox - PW
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

    // Only update and re-render if a hex value changed
    if (colorList.some((item, index) => item.hex !== updatedColorList[index].hex)) {
      setColorList(updatedColorList);
    }
  });

  return (
    <div className="c-swatch-list ds-u-border--1 ds-u-padding--2">
      {colorList.map(({ name, hex }, index) => (
        <article className="ds-u-margin-bottom--1 c-swatch" key={`${name}-${hex}`}>
          <div
            className={`c-swatch__preview ds-u-margin-right--1 ds-u-radius--circle ds-u-fill--${name}`}
            ref={(el) => (refList.current[index] = el)}
          ></div>
          <code
            className={classNames('c-swatch__name', {
              [backgroundClass]: backgroundClass,
              [`${preface.replace('.', '')}${name}`]: backgroundClass,
            })}
          >
            {preface}
            {name}
          </code>
          <code className="c-swatch__label js-swatch-hex ds-u-fill--transparent ds-u-color--gray">
            {hex}
          </code>
        </article>
      ))}
    </div>
  );
};

export default ColorSwatchList;
