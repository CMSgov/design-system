import React from 'react';
import classNames from 'classnames';
import ColorSwatch from './ColorSwatch';
import { getThemeColorValue, ThemeName } from '../../helpers/themeTokens';

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
   * the start of the color name. Sometimes it is the variable preface (`--color`) or sometimes it is the css class name (`ds-u`)
   */
  preface: string;
  /**
   * Name of currently selected theme
   */
  theme: string;
}

/**
 * displays a list of color swatches with a sample of the color, the CSS variable name & the hex value
 * @param colorNames {String[]} a list of color names - should be same as CSS variable
 */
const ColorSwatchList = ({ backgroundClass, colorNames, preface, theme }: ColorSwatchListProps) => (
  <div className="c-swatch-list ds-u-border--1 ds-u-padding--2">
    {colorNames.map((name) => (
      <article className="ds-u-margin-bottom--1 c-swatch" key={name}>
        <ColorSwatch colorTokenName={name} />
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
          {getThemeColorValue(theme as ThemeName, name)}
        </code>
      </article>
    ))}
  </div>
);

export default ColorSwatchList;
