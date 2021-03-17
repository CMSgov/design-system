import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface AccordionProps {
  /**
   * Applies a border to the accordion content.
   */
  bordered?: boolean;
  children?: React.ReactNode;
  /**
   * Class to be applied to the outer `<div>` that contains all accordion items.
   */
  className?: string;
}

const Accordion: FunctionComponent<AccordionProps> = ({ bordered, children, className }) => {
  const classes = classNames('ds-c-accordion', bordered && 'ds-c-accordion--bordered', className);

  return <div className={classes}>{children}</div>;
};

export const AccordionPropKeys = ['bordered', 'children', 'className'];

export default Accordion;
