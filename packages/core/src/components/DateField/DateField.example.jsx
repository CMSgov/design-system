import DateField from './DateField';
import React from 'react';
import ReactDOM from 'react-dom';

class DateFieldExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <DateField
          monthDefaultValue={10}
          dayDefaultValue="31"
          yearDefaultValue="2020"
          hint={this.state.hint}
          onComponentBlur={() =>
            this.setState({ hint: '[DateField]: Component lost focus' })
          }
        />

        <DateField
          errorMessage="Please enter a year in the past"
          monthDefaultValue={10}
          dayDefaultValue="31"
          yearDefaultValue="2020"
          yearInvalid
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<DateFieldExample />, document.getElementById('js-example'));
