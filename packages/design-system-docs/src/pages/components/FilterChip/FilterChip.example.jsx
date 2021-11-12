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
    const { label, ariaClearLabel, useAlternateIcon, size } = this.props;
    return (
      <>
        {!this.state.tagDismissed && (
          <FilterChip
            label={label}
            ariaClearLabel={ariaClearLabel}
            onDelete={() => this.setState({ tagDismissed: true })}
            useAlternateIcon={!!useAlternateIcon}
            size={size}
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
  size: PropTypes.string,
};

ReactDOM.render(
  <div aria-live="polite" aria-relevant="removals">
    <ControlledFilterChip label="Example Filter Chip" ariaClearLabel="Remove Filter Chip" />
    <ControlledFilterChip
      label="Example with alternate icon"
      useAlternateIcon
      ariaClearLabel="Remove Alternate"
    />
    <ControlledFilterChip
      label="Example big filter chip"
      ariaClearLabel="Remove Small"
      size="big"
    />
    <ControlledFilterChip
      label="Example big with alternate icon"
      useAlternateIcon
      size="big"
      ariaClearLabel="Remove Big Alternate"
    />
  </div>,
  document.getElementById('js-example')
);
