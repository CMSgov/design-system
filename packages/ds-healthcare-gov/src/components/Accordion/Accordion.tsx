import React, { FunctionComponent } from 'react';
import { Accordion as CoreDSAccordion } from '@cmsgov/design-system';
import { AccordionProps } from '@cmsgov/design-system/dist/types/Accordion/Accordion';

// Wrap the core Design System Accordion component to use HCgov Accordion default setting.
export const Accordion: FunctionComponent<AccordionProps> = ({
  children,
  isAlternateStyles = true,
  ...others
}: AccordionProps) => {
  return (
    <CoreDSAccordion isAlternateStyles={isAlternateStyles} {...others}>
      {children}
    </CoreDSAccordion>
  );
};

export default Accordion;
