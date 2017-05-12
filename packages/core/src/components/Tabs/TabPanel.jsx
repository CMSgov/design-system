import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export const TabPanel = function(props) {
  const classes = classnames(
    'ds-c-tabs__panel'
  );

  return (
    <div
      aria-labelledby={props.tabId}
      aria-hidden={String(!props.selected)}
      className={classes}
      id={props.id}
      role='tabpanel'
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
  // tabId is actually required, but it's not marked here since we generate
  // this id within the Tabs component. Otherwise React will yell at you even
  // though it's ultimately being passed in.
  tabId: PropTypes.string
};

export default TabPanel;
