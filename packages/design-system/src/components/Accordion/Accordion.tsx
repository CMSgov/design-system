import React from 'react';
import { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface AccordionProps {
  /**
   * Applies a border to the accordion content.
   */
  bordered?: boolean;
  /**
   * Children should consist of AccordionItems
   */
  children?: React.ReactNode;
  /**
   * Class to be applied to the outer `<div>` that contains all accordion items.
   */
  className?: string;
}
const handleKeyDown = (e) => {
  const target = e.target;
  const accordionElement = e.currentTarget;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const triggers = Array.prototype.slice.call(
      accordionElement.querySelectorAll('.ds-c-accordion__button')
    );
    const direction = e.key === 'ArrowDown' ? 1 : -1;
    const index = triggers.indexOf(target);
    const length = triggers.length;
    const newIndex = (index + length + direction) % length;

    triggers[newIndex].focus();
    e.preventDefault();
  }
};

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/accordion/).
 */
export const Accordion: FunctionComponent<AccordionProps> = ({
  bordered,
  children,
  className,
}: AccordionProps) => {
  const classes = classNames('ds-c-accordion', bordered && 'ds-c-accordion--bordered', className);
  return (
    <div onKeyDown={handleKeyDown} className={classes}>
      {children}
    </div>
  );
};

export default Accordion;
