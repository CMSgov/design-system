import React, { FunctionComponent } from 'react';
import AccordionItem, { AccordionItemData } from './AccordionItem';

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  bordered: boolean;
}

const Accordion: FunctionComponent<{
  items: AccordionItemData[];
  className?: string;
  bordered?: boolean;
}> = ({ items, className, bordered = false }) => {
  return (
    <div className={`ds-c-accordion ${className} ${bordered ? 'ds-c-accordion--bordered' : ''}`}>
      {items.map((i) => (
        <AccordionItem key={i.id} content={i.content} expanded={i.expanded} title={i.title} />
      ))}
    </div>
  );
};

export default Accordion;
