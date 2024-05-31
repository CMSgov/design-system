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
  <div
    className={classNames(
      'c-text-color-list',
      'ds-u-border--1',
      'ds-u-padding--2',
      backgroundClass
    )}
  >
    {colorNames.map((name) => {
      const nameId = `color-name-${name}`;
      const valueId = `color-value-${name}`;
      return (
        <article className="c-text-color-list__item" key={name}>
          <div>
            <ColorSwatch fill={`var(--color-${name})`} aria-labelledby={`${nameId} ${valueId}`} />
            <code
              className={classNames(
                'c-text-color-list__name',
                `${preface.replace('.', '')}${name}`,
                'ds-u-fill--transparent'
              )}
              id={nameId}
            >
              {preface}
              {name}
            </code>
          </div>
          <div>
            <code id={valueId} className="c-text-color-list__label">
              {getThemeColorValue(theme as ThemeName, name)}
            </code>
          </div>
        </article>
      );
    })}
  </div>
);

export default TextColorList;
