// import AccordionItem from '@cmsgov/design-system/src/components/Accordion/AccordionItem';
import { Accordion, AccordionItem } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class ControlledAccordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { openItems: [0, 1] };
  }

  handleChange(index, id) {
    console.log('-handleChange:', index, id, this.state.openItems);
    if (this.state.openItems.includes(index)) {
      this.setState((prevState) => ({
        openItems: prevState.openItems.filter((item) => item !== index),
      }));
    } else {
      this.setState((prevState) => ({
        openItems: [...prevState.openItems, index].sort(),
      }));
    }
  }

  render() {
    return (
      <>
        <Accordion
          bordered
          variation="controlled"
          onChange={(index, id) => this.handleChange(index, id)}
        >
          <AccordionItem
            heading="Controlled accordion"
            index={0}
            defaultOpen={this.state.openItems.indexOf(0) !== -1}
          >
            <p>
              We the People of the United States, in Order to form a more perfect Union, establish
              Justice, insure domestic Tranquility, provide for the common defence, promote the
              general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity,
              do ordain and establish this Constitution for the United States of America.
            </p>
          </AccordionItem>
          <AccordionItem
            heading="Controlled accordion second header"
            index={1}
            defaultOpen={this.state.openItems.indexOf(1) !== -1}
          >
            <p>Hello world!</p>
          </AccordionItem>
        </Accordion>
      </>
    );
  }
}

ReactDOM.render(
  <div className="example--wrapper">
    <ControlledAccordion />

    <Accordion bordered variation="single">
      <AccordionItem heading="First amendment" contentClassName="jimmy">
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
