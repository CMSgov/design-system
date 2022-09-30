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

/**
 * displays a list of color swatches with a sample of the color, the SCSS variable name & the hex value
 * @param utilityNames {String[]} a list of color names - should be same as SCSS token
 */
/**
 * displays a list of color swatches with a sample of the color, the SCSS variable name & the hex value
 * @param utilityValues {String[]} a list of color names - should be same as SCSS token
 */
const UtilityExampleList = ({ utilityNames, utilityValues, preface }: UtilityExampleListProps) => {
  const refList = useRef([]);
  const initialNames = utilityNames.map((color) => ({ name: color }));
  const initialValues = utilityValues.map((pxvalue) => ({ name: pxvalue }));
  const [exampleList] = useState(initialNames);
  const [exampleList2] = useState(initialValues);

  return (
    <div className="c-utility-example__list ds-u-border--1 ds-u-padding--2">
      {exampleList.map(({ name }, index) => (
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
          {exampleList2.map(({ name }, index) => (
            <div key={`${name}`}>
              <div ref={(el) => (refList.current[index] = el)}>
                <code>{name}</code>
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
};

export default UtilityExampleList;
