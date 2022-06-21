import React, { FunctionComponent } from 'react';
import { Accordion as DSAccordion } from '@cmsgov/design-system';
import { AccordionProps } from '@cmsgov/design-system/dist/types/Accordion/Accordion';

// Wrap the core Design System Accordion component to use HCgov Accordion.
export const Accordion: FunctionComponent<AccordionProps> = ({
  children,
  isAlternateStyles = true,
  ...others
}: AccordionProps) => {
  return (
    <DSAccordion isAlternateStyles {...others}>
      {children}
    </DSAccordion>
  );
};

export default Accordion;
