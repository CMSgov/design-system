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
    const { label, ariaClearLabel } = this.props;
    return (
      <>
        {!this.state.tagDismissed && (
          <FilterChip
            label={label}
            ariaClearLabel={ariaClearLabel}
            onDelete={() => this.setState({ tagDismissed: true })}
          />
        )}
      </>
    );
  }
}

ControlledFilterChip.propTypes = {
  label: PropTypes.string,
  ariaClearLabel: PropTypes.string,
};

ReactDOM.render(
  <>
    <ControlledFilterChip label="Example filter chip" ariaClearLabel="Remove" />
    <ControlledFilterChip
      label="Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap"
      ariaClearLabel="Remove"
    />
  </>,
  document.getElementById('js-example')
);
