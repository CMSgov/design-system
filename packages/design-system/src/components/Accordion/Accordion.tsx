import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import AccordionItem from './AccordionItem';

interface AccordionProps {
  /*
   ** Class to be applied to the outer `<Div>` that contains all accordion items.
   */
  className: string;
  /*
   ** Applies a border to the accordion content.
   */
  bordered: boolean;
  children: typeof AccordionItem;
}

const Accordion: FunctionComponent<AccordionProps> = ({
  className = '',
  bordered = false,
  children,
}) => {
  const classes = classNames('ds-c-accordion', bordered && 'ds-c-accordion--bordered', className);

  return <div className={classes}>{children}</div>;
};

export default Accordion;
