/* eslint-disable react/no-multi-comp */
import TextField, { unmaskValue } from './TextField';
import Button from '../Button/Button';
import React from 'react';
import ReactDOM from 'react-dom';

function handleBlur(evt, mask) {
  console.log('Unmasked value: ', unmaskValue(evt.target.value, mask));
}

class ControlledCurrencyField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currencyValue: '2500'
    };
  }

  clearCurrencyValue() {
    this.setState({ currencyValue: '' });
  }

  randomizeCurrencyValue() {
    this.setState({ currencyValue: (Math.random() * 10000).toFixed(2) });
  }

  setCurrencyValue(currencyValue) {
    console.log(`Setting currencyValue to ${currencyValue}`);
    this.setState({ currencyValue });
  }

  render() {
    return (
      <fieldset className="ds-u-margin-top--3 ds-u-padding-left--3 ds-u-padding-bottom--3 ds-u-border--2">
        <legend className="ds-u-font-size--h3">Controlled Example</legend>
        <TextField
          label="This is a controlled component"
          mask="currency"
          name="controlled_currency_example"
          className="ds-u-margin-bottom--2"
          onChange={evt => this.setCurrencyValue(unmaskValue(evt.target.value, 'currency'))}
          value={this.state.currencyValue}
        />
        <Button onClick={() => this.clearCurrencyValue()}>Clear</Button>
        <Button onClick={() => this.randomizeCurrencyValue()}>Randomize</Button>
      </fieldset>
    );
  }
}

const Example = () => {
  return (
    <div>
      <TextField
        ariaLabel="Enter monthly income amount in dollars."
        label="Currency"
        mask="currency"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        name="currency_example"
        onBlur={evt => handleBlur(evt, 'currency')}
        defaultValue="2500"
      />

      <TextField
        label="Phone number"
        mask="phone"
        name="phone_example"
        onBlur={evt => handleBlur(evt, 'phone')}
        type="tel"
        defaultValue="1234567890"
      />

      <TextField
        label="Social security number (SSN)"
        mask="ssn"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        name="ssn_example"
        onBlur={evt => handleBlur(evt, 'ssn')}
        defaultValue="123456789"
      />

      <TextField
        label="Zip code"
        mask="zip"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        name="zip_example"
        onBlur={evt => handleBlur(evt, 'zip')}
        defaultValue="123456789"
      />

      <ControlledCurrencyField />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
