import React from 'react';
import Tab from './Tab';
import TabPanel from './TabPanel';
import classnames from 'classnames';
import get from 'lodash/get';

export interface TabsProps {
  /**
   * Must only contain `TabPanel` components
   */
  children: React.ReactNode;
  /**
   * Sets the initial selected `TabPanel` state. If this isn't set, the first
   * `TabPanel` will be selected.
   */
  defaultSelectedId?: string;
  /**
   * A callback function that's invoked when the selected tab is changed.
   * `(selectedId, prevSelectedId) => void`
   */
  onChange?: (selectedId: string, prevSelectedId: string) => void;
  /**
   * Additional classes to be added to the component wrapping the tabs
   */
  tablistClassName?: string;
}

/** CONSTANTS
 * Adding in the constant values for keycodes
 * to handle onKeyDown events
 */
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';

/**
 * Determine if a React component is a TabPanel
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TabPanel component?
 */
function isTabPanel(child): boolean {
  const componentName = get(child, 'type.displayName') || get(child, 'type.name');

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TabPanel || componentName === 'TabPanel');
}

/**
 * Get the id of the first TabPanel child
 * @param {Object} props
 * @return {String} The id
 */
function getDefaultSelectedId(props): string {
  let selectedId;

  // TODO: Use the panelChildren method to pass in an array
  // of panels, instead of doing it here...
  React.Children.forEach(props.children, function (child) {
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
function panelTabId(panel): string {
  return panel.props.tabId || `ds-c-tabs__item--${panel.props.id}`;
}

interface TabsState {
  selectedId: string;
}

export class Tabs extends React.PureComponent<TabsProps, any> {
  constructor(props: TabsProps) {
    super(props);
    let selectedId;

    if ('defaultSelectedId' in props) {
      selectedId = props.defaultSelectedId;
    } else {
      selectedId = getDefaultSelectedId(props);
    }

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabKeyDown = this.handleTabKeyDown.bind(this);
    this.state = { selectedId };
  }

  componentDidUpdate(_: TabsProps, prevState: TabsState): void {
    if (this.state.selectedId !== prevState.selectedId) {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.selectedId, prevState.selectedId);
      }
      this.tabs[this.state.selectedId].focus();
      this.replaceState(this.tabs[this.state.selectedId].href);
    }
  }

  // Tabs class properties
  tabs = [];

  handleTabClick(evt: React.MouseEvent, panelId: string): void {
    evt.preventDefault();
    this.setState({ selectedId: panelId });
  }

  handleTabKeyDown(evt: React.KeyboardEvent, panelId: string): void {
    const tabs = this.panelChildren();
    const tabIndex = tabs.findIndex((elem: React.ReactElement) => elem.props.id === panelId);
    let target;

    switch (evt.key) {
      case LEFT_ARROW:
        evt.preventDefault();
        if (tabIndex === 0) {
          const prevTab = tabs[tabs.length - 1] as React.ReactElement;
          target = prevTab.props.id;
        } else {
          const prevTab = tabs[tabIndex - 1] as React.ReactElement;
          target = prevTab.props.id;
        }
        this.setState({ selectedId: target });
        break;
      case RIGHT_ARROW:
        evt.preventDefault();
        if (tabIndex === tabs.length - 1) {
          const currentTab = tabs[0] as React.ReactElement;
          target = currentTab.props.id;
        } else {
          const nextTab = tabs[tabIndex + 1] as React.ReactElement;
          target = nextTab.props.id;
        }
        this.setState({ selectedId: target });
        break;
      default:
        break;
    }
  }

  /**
   * Filter children and return only TabPanel components
   */
  panelChildren(): React.ReactNode[] {
    return React.Children.toArray(this.props.children).filter(isTabPanel);
  }

  renderChildren(): React.ReactNode {
    return React.Children.map(this.props.children, (child) => {
      if (isTabPanel(child) && React.isValidElement(child)) {
        // Extend props on panels before rendering. Also removes any props
        // that don't need passed into TabPanel but are used to generate
        // the Tab components
        return React.cloneElement(child, {
          selected: this.state.selectedId === child.props.id,
          tab: undefined,
          tabHref: undefined,
          tabId: panelTabId(child),
        });
      }

      return child;
    });
  }

  renderTabs(): React.ReactNode {
    const panels = this.panelChildren() as React.ReactElement[];
    const listClasses = classnames('ds-c-tabs', this.props.tablistClassName);

    const tabs = panels.map((panel) => {
      return (
        <Tab
          className={panel.props.tabClassName}
          href={panel.props.tabHref}
          disabled={panel.props.disabled}
          id={panelTabId(panel)}
          key={panel.key}
          onClick={this.handleTabClick}
          onKeyDown={this.handleTabKeyDown}
          panelId={panel.props.id}
          ref={(tab) => {
            this.tabs[panel.props.id] = tab;
          }}
          selected={this.state.selectedId === panel.props.id}
        >
          {panel.props.tab}
        </Tab>
      );
    });

    return (
      <div className={listClasses} role="tablist">
        {tabs}
      </div>
    );
  }

  /**
   * Update the URL in the browser without adding a new entry to the history.
   * @param {String} url - Absolute or relative URL
   */
  replaceState(url: string): void {
    if (window.history) {
      window.history.replaceState({}, document.title, url);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        {this.renderTabs()}
        {this.renderChildren()}
      </div>
    );
  }
}

export default Tabs;
