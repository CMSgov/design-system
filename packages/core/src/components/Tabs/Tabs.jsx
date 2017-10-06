import PropTypes from 'prop-types';
import React from 'react';
import Tab from './Tab';
import TabPanel from './TabPanel';
import classnames from 'classnames';

/** CONSTANTS
 * Adding in the constant values for keycodes
 * to handle onKeyDown events
 */
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const TAB = 'Tab';

/**
 * Get the id of the first TabPanel child
 * @param {Object} props
 * @return {String} The id
 */
function getDefaultSelectedId(props) {
  let selectedId;

  // TODO: Use the panelChildren method to pass in an array
  // of panels, instead of doing it here...
  React.Children.forEach(props.children, function(child) {
    if (isTabPanel(child) && !selectedId) {
      selectedId = child.props.id;
    }
  });

  return selectedId;
}

/**
 * Generate an id for a panel's associated tab if one doesn't yet exist
 * @param {Object} TabPanel component
 * @return {String} Tab ID
 */
function panelTabId(panel) {
  return panel.props.tabId || `ds-c-tabs__item--${panel.props.id}`;
}

/**
 * Determine if a React component is a Tab
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TabPanel component?
 */
function isTab(child) {
  return child != null && child.props.tab != null;
}

/**
 * Determine if a React component is a TabPanel
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TabPanel component?
 */
function isTabPanel(child) {
  return child != null && child.type === TabPanel;
}

/**
 * `Tabs` is a container component that manages the state of your tabs for you.
 * In most cases, you'll want to use this component rather than the presentational
 * components (`Tab`, `TabPanel`) on their own.
 */
export class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    let selectedId;

    if ('defaultSelectedId' in props) {
      selectedId = props.defaultSelectedId;
    } else {
      selectedId = getDefaultSelectedId(props);
    }

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabKeyPress = this.handleTabKeyPress.bind(this);
    this.state = { selectedId };
  }

  componentDidUpdate(_, prevState) {
    if (this.state.selectedId !== prevState.selectedId) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.selectedId, prevState.selectedId);
      }
      this.tabs[this.state.selectedId].focus();
    }
  }

  handleTabClick(evt, panelId, tabId, href) {
    evt.preventDefault();
    this.setState({ selectedId: panelId });
    this.replaceState(href);
  }

  handleTabKeyPress(evt, panelId) {
    switch (evt.key) {
      case LEFT_ARROW:
        this.tabSwitchLeft(evt, panelId);
        break;
      case RIGHT_ARROW:
        this.tabSwitchRight(evt, panelId);
        break;
      case TAB:
        break;
      default:
        break;
    }
  }

  /**
   * Filter children and return only TabPanel components
   */
  panelChildren() {
    return React.Children.toArray(this.props.children)
      .filter(isTabPanel);
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (isTabPanel(child)) {
        // Extend props on panels before rendering. Also removes any props
        // that don't need passed into TabPanel but are used to generate
        // the Tab components
        return React.cloneElement(
          child,
          {
            selected: this.state.selectedId === child.props.id,
            tab: undefined,
            tabHref: undefined,
            tabId: panelTabId(child)
          }
        );
      }

      return child;
    });
  }

  renderTabs() {
    const panels = this.panelChildren();
    const listClasses = classnames('ds-c-tabs', this.props.tablistClassName);

    this.tabs = {};

    const tabs = panels.map(panel => {
      return (
        <Tab
          className={panel.props.tabClassName}
          href={panel.props.tabHref}
          id={panelTabId(panel)}
          key={panel.key}
          onClick={this.handleTabClick}
          onKeyDown={this.handleTabKeyPress}
          panelId={panel.props.id}
          ref={(tab) => { this.tabs[panel.props.id] = tab; }}
          selected={this.state.selectedId === panel.props.id}
        >
          {panel.props.tab}
        </Tab>
      );
    });

    return <div className={listClasses} role='tablist'>{tabs}</div>;
  }

  /**
   * Update the URL in the browser without adding a new entry to the history.
   * @param {String} url - Absolute or relative URL
   */
  replaceState(url) {
    if (window.history) {
      window.history.replaceState({}, document.title, url);
    }
  }

  /**
   * Build tabs array to handle arrow keypress events accurately
   */
  tabsArrayLen() {
    return React.Children.toArray(this.props.children)
      .filter(isTab);
  }

  /**
   * Find the current tab index on left or right arrow keypress
   * @param {Array} React Tab components
   * @param {String} ID prop of currently selected Tab
   * @return {Number} Returns index of currently selected array item
   */
  tabFindIndex(tabsArr, findId) {
    const index = tabsArr.findIndex(elem => elem.props.id === findId);

    return index;
  }

  /**
   * Handle the left arrow keydown events
   * @param {Object} Native event object, used to listen for left arrow keycode
   * @param {String} ID prop of currently selected Tab
   * 
   * The index returned from tabFindIndex is used in a reduce by 1 logic
   * tree to ensure the right tab[index] ID is targeted for updated state.
   * 
   * The replaceState function did not like the href argument passed into 
   * handleTabClick, so passing an interpolated hashbang plus selected Tab
   * string instead. 
   */
  tabSwitchLeft(evt, curId) {
    const tabs = this.tabsArrayLen();
    const index = this.tabFindIndex(tabs, curId);

    if (index === 0) {
      const target = tabs[tabs.length - 1].props.id;
      this.setState({ selectedId: target });
      this.replaceState(`#${target}`);
    } else {
      const target = tabs[index - 1].props.id;
      this.setState({ selectedId: target });
      this.replaceState(`#${target}`);
    }
  }

  /**
   * Handle the right arrow keydown events
   * @param {Object} Native event object, used to listen for right arrow keycode
   * @param {String} ID prop of currently selected Tab
   * 
   * See logic decisions above in tabSwitchLeft method
   */
  tabSwitchRight(evt, curId) {
    const tabs = this.tabsArrayLen();
    const index = this.tabFindIndex(tabs, curId);

    if (index === tabs.length - 1) {
      const target = tabs[0].props.id;
      this.setState({ selectedId: target });
      this.replaceState(`#${target}`);
    } else {
      const target = tabs[index + 1].props.id;
      this.setState({ selectedId: target });
      this.replaceState(`#${target}`);
    }
  }

  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderChildren()}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Sets the initial selected `TabPanel` state. If this isn't set, the first
   * `TabPanel` will be selected.
   */
  defaultSelectedId: PropTypes.string,
  /**
   * A callback function that's invoked when the selected tab is changed.
   * `(selectedId, prevSelectedId) => void`
   */
  onChange: PropTypes.func,
  /**
   * Additional classes to be added to the component wrapping the tabs
   */
  tablistClassName: PropTypes.string
};

export default Tabs;
