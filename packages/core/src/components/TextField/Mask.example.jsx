import Button from '../Button/Button';
import TextField, { unmaskValue } from './TextField';
import React from 'react';
import ReactDOM from 'react-dom';

class Currency extends React.PureComponent {
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
      <div className="ds-margin-y--2">
        <TextField
          label={this.props.connected ? 'Connected' : 'Unconnected'}
          mask="currency"
          name="currency_example"
          onChange={evt =>
            this.setCurrencyValue(unmaskValue(evt.target.value, 'currency'))
          }
          value={this.props.connected ? this.state.currencyValue : undefined}
          defaultValue={
            this.props.connected ? undefined : this.state.currencyValue
          }
        />
        <Button onClick={() => this.clearCurrencyValue()}>Clear</Button>
        <Button onClick={() => this.randomizeCurrencyValue()}>Randomize</Button>
      </div>
    );
  }
}

const Example = () => {
  return (
    <div>
      <Currency connected />
      <Currency />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById('js-example'));
