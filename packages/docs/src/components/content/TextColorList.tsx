import React from 'react';
import classNames from 'classnames';
import ColorSwatch from './ColorSwatch';
import { getThemeColorValue, ThemeName } from '../../helpers/themeTokens';

interface TextColorListProps {
  /**
   * a fill class for the background of the name text
   */
  backgroundClass: string;
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
 * Displays a list of text colors with example code and the hex value
 */
const TextColorList = ({ backgroundClass, colorNames, preface, theme }: TextColorListProps) => (
  <div className="c-text-color-list ds-u-border--1 ds-u-padding--2">
    {colorNames.map((name) => (
      <article className="ds-u-margin-bottom--1" key={name}>
        <ColorSwatch colorTokenName={name} />
        <code
          className={classNames('c-text-color-list__name', {
            [backgroundClass]: backgroundClass,
            [`${preface.replace('.', '')}${name}`]: backgroundClass,
          })}
        >
          {preface}
          {name}
        </code>
        <code className="c-text-color-list__label ds-u-fill--transparent ds-u-color--gray">
          {getThemeColorValue(theme as ThemeName, name)}
        </code>
      </article>
    ))}
  </div>
);

export default TextColorList;
