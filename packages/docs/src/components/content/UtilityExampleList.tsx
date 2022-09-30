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

  exampleClass: string;
}

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
  exampleClass,
}: UtilityExampleListProps) => (
  <div className={`${exampleClass} c-utility-example__list ds-u-border--1 ds-u-padding--2`}>
    {utilityNames.map((name, index) => (
      <article className="c-utility-example__row" key={`${name}`}>
        <div className="c-utility-example__container">
          <div className={`${preface}${name} c-utility-example__item`}></div>
        </div>
        <code>
          .{preface}
          {name}
        </code>
        <code>{utilityValues[index]}</code>
      </article>
    ))}
  </div>
);

export default UtilityExampleList;
