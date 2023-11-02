import { Accordion, AccordionItem } from '@cmsgov/ds-healthcare-gov';
import React from 'react';

function AccordionExample() {
  return (
    <div>
      <h2>Accordion Example</h2>
      <Accordion bordered>
        <AccordionItem heading="First amendment" contentClassName="jimmy">
          <p>
            We the People of the United States, in Order to form a more perfect Union, establish
            Justice, insure domestic Tranquility, provide for the common defence, promote the
            general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do
            ordain and establish this Constitution for the United States of America.
          </p>
        </AccordionItem>
        <AccordionItem heading="Second amendment">
          <p>Hello world!</p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccordionExample;
