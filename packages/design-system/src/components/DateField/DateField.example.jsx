import React, { Fragment } from 'react';
import DateField from './DateField';
import ReactDOM from 'react-dom';

class ControlledDateField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      day: '10',
      month: '1',
      year: '2000'
    };
  }

  render() {
    return (
      <fieldset className="ds-u-margin-top--3 ds-u-padding-left--3 ds-u-padding-bottom--3 ds-u-border--2">
        <legend className="ds-u-font-size--h3">Controlled Example</legend>
        <DateField
          label={
            <span>
              DateField using default <code>dateFormatter</code>
            </span>
          }
          hint={'Try to enter a date with invalid number of digits'}
          monthValue={this.state.month}
          dayValue={this.state.day}
          yearValue={this.state.year}
          onChange={(e, dateObject) => this.setState(dateObject)}
        />
      </fieldset>
    );
  }
}

ReactDOM.render(
  <Fragment>
    <DateField
      label="DateField example"
      errorMessage="Please enter a year in the past"
      monthDefaultValue="10"
      dayDefaultValue="31"
      yearDefaultValue="2020"
      yearInvalid
    />
    <ControlledDateField />
  </Fragment>,
  document.getElementById('js-example')
);
