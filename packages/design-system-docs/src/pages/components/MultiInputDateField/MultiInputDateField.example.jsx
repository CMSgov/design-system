import { MultiInputDateField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

class ControlledDateField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: '10',
      month: '1',
      year: '2000',
    };
  }

  render() {
    return (
      <MultiInputDateField
        label={
          <span>
            Controlled example using <code>dateFormatter</code>
          </span>
        }
        hint="Try to enter a date with invalid number of digits"
        monthValue={this.state.month}
        dayValue={this.state.day}
        yearValue={this.state.year}
        onChange={(e, dateObject) => this.setState(dateObject)}
      />
    );
  }
}

ReactDOM.render(
  <div className="example--wrapper">
    <MultiInputDateField
      label="Date of birth"
      errorMessage="Please enter a year in the past"
      monthDefaultValue="10"
      dayDefaultValue="31"
      yearDefaultValue="2050"
      yearInvalid
    />
    <ControlledDateField />
    <div className="example--wrapper example--inverse">
      <MultiInputDateField
        label="Inverse example"
        errorMessage="Please enter a year in the past"
        monthDefaultValue="10"
        dayDefaultValue="31"
        yearDefaultValue="2050"
        yearInvalid
        inversed
      />
    </div>
  </div>,
  document.getElementById('js-example')
);
