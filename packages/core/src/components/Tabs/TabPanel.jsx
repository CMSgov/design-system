import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const TabPanel = function(props) {
  const classes = classnames(
    'ds-c-tabs__panel'
  );

  return (
    <div
      aria-labelledby={props.tabId}
      aria-selected={props.selected}
      className={classes}
      id={props.id}
    >
      {props.children}
    </div>
  );
};

TabPanel.defaultProps = {
  selected: false
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  tabId: PropTypes.string.isRequired
};

export default TabPanel;
