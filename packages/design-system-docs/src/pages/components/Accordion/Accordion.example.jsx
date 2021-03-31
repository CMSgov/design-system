// import AccordionItem from '@cmsgov/design-system/src/components/Accordion/AccordionItem';
import { Accordion, AccordionItem } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Accordion bordered>
      <AccordionItem heading="First amendment" contentClassName="jimmy" defaultOpen>
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </AccordionItem>
      <AccordionItem heading="Second amendment">
        <p>Hello world!</p>
      </AccordionItem>
    </Accordion>
  </div>,
  document.getElementById('js-example')
);
