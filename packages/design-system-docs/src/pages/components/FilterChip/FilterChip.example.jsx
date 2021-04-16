import { FilterChip } from '@design-system';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class ControlledFilterChip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { tagDismissed: false };
  }

  render() {
    const { label, value, removeText } = this.props;
    return (
      <>
        {!this.state.tagDismissed && (
          <FilterChip
            label={label}
            value={value}
            removeText={removeText}
            onDelete={() => this.setState({ tagDismissed: true })}
          />
        )}
      </>
    );
  }
}

ControlledFilterChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  removeText: PropTypes.string,
};

ReactDOM.render(
  <>
    <ControlledFilterChip label="Example filter chip" value="example" removeText="Remove" />
    <ControlledFilterChip
      label="Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap"
      value="example"
      removeText="Remove"
    />
  </>,
  document.getElementById('js-example')
);
