import type * as React from 'react';
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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/accordion/).
 */
export const Accordion = ({ bordered, children, className }: AccordionProps) => {
  const classes = classNames('ds-c-accordion', bordered && 'ds-c-accordion--bordered', className);
  return <div className={classes}>{children}</div>;
};

export default Accordion;
