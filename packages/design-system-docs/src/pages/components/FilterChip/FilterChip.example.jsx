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
    const { label, ariaClearLabel, useAlternateIcon, small } = this.props;
    return (
      <>
        {!this.state.tagDismissed && (
          <FilterChip
            label={label}
            ariaClearLabel={ariaClearLabel}
            onDelete={() => this.setState({ tagDismissed: true })}
            useAlternateIcon={!!useAlternateIcon}
            small={!!small}
          />
        )}
      </>
    );
  }
}

ControlledFilterChip.propTypes = {
  label: PropTypes.string,
  ariaClearLabel: PropTypes.string,
  useAlternateIcon: PropTypes.bool,
  small: PropTypes.bool,
};

ReactDOM.render(
  <>
    <ControlledFilterChip label="Example Filter Chip" ariaClearLabel="Remove Filter Chip" />
    <ControlledFilterChip
      label="Example with alternate icon"
      useAlternateIcon
      ariaClearLabel="Remove Alternate"
    />
    <ControlledFilterChip
      label="Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap Example filter chip with long text that will wrap"
      ariaClearLabel="Remove Long"
    />
    <ControlledFilterChip label="Example small filter chip" ariaClearLabel="Remove Small" small />
    <ControlledFilterChip
      label="Example small with alternate icon"
      useAlternateIcon
      small
      ariaClearLabel="Remove Small Alternate"
    />
  </>,
  document.getElementById('js-example')
);
