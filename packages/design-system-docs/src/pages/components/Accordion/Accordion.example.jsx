// import AccordionItem from '@cmsgov/design-system/src/components/Accordion/AccordionItem';
import { Accordion } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="example--wrapper">
    <Accordion
      items={[
        {
          id: '1',
          title: 'Control and supplemental guidance',
          content: (
            <>
              <p>
                We the People of the United States, in Order to form a more perfect Union, establish
                Justice, insure domestic Tranquility, provide for the common defence, promote the
                general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity,
                do ordain and establish this Constitution for the United States of America.
              </p>
              <p>
                We the People of the United States, in Order to form a more perfect Union, establish
                Justice, insure domestic Tranquility, provide for the common defence, promote the
                general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity,
                do ordain and establish this Constitution for the United States of America.
              </p>
            </>
          ),
          expanded: true,
        },
        { id: '2', title: 'Assessment guidance', content: <p>Hello world!</p> },
      ]}
    />
  </div>,
  document.getElementById('js-example')
);
