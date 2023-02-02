import React from 'react';
import ColorExampleRow from './ColorExampleRow';
import { getThemeColorValue, ThemeName } from '../../helpers/themeTokens';

interface ColorExampleListProps {
  /**
   * list of variable color names
   */
  colorNames: string[];
  /**
   * the start of the color name. Sometimes it is the variable preface (`--color`) or sometimes it is the css class name (`ds-u`)
   */
  preface: string;
  /**
   * Name of currently selected theme
   */
  theme: string;
}

/**
 * TODO: finish these notes
 * This does not support semi-transparent colors like the `ColorRamps` component does.
 *
 * displays a list of color swatches with a sample of the color, the CSS variable name & the hex value
 * @param colorNames {String[]} a list of color names - should be same as CSS variable
 */

const ColorExampleList = ({ colorNames, preface, theme }: ColorExampleListProps) => (
  <div className="ds-u-measure--wide ds-u-margin-top--2">
    {colorNames.map((name) => (
      <ColorExampleRow
        name={name}
        displayName={`${preface}${name}`}
        value={getThemeColorValue(theme as ThemeName, name)}
        key={name}
      />
    ))}
  </div>
);

export default ColorExampleList;
