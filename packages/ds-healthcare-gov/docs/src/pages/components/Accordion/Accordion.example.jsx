import { Accordion, AccordionItem } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class ControlledAccordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { openItems: [0] };
  }

  handleChange(index) {
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
        <Accordion>
          <AccordionItem
            heading="Controlled accordion"
            defaultOpen
            isControlledOpen={this.state.openItems.includes(0)}
            onChange={() => this.handleChange(0)}
          >
            <p>
              In a controlled accordion, the accordion panel&apos;s open state is controlled by the
              application, by passing <code>isControlledOpen</code> and <code>onChange</code>
              props. The <code>isControlledOpen</code> boolean flag sets the panel to an open or
              close state.
            </p>
          </AccordionItem>
          <AccordionItem
            heading="Controlled accordion second header"
            defaultOpen={false}
            isControlledOpen={this.state.openItems.includes(1)}
            onChange={() => this.handleChange(1)}
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

    <Accordion>
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
