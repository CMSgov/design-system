import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export const TabPanel = function(props) {
  const classes = classnames('ds-c-tabs__panel', props.className);

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
  /**
   * Additional classes to be added to the root element.
   */
  className: PropTypes.string,
  /**
   * A unique `id`, to be used on the rendered panel element.
   */
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  // tabId is actually required, but it's not marked here since we generate
  // this id within the Tabs component. Otherwise React will yell at you even
  // though it's ultimately being passed in.
  /**
   * The `id` of the associated `Tab`. Used for the `aria-labelledby` attribute
   */
  tabId: PropTypes.string
};

export default TabPanel;
