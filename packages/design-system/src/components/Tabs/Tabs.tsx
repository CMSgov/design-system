import React, { useState, useRef } from 'react';
import Tab from './Tab';
import TabPanel, { TabPanelProps } from './TabPanel';
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
  onChange?: (selectedId: string, prevSelectedId: string) => any;
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
const isTabPanel = (child): boolean => {
  const componentName = get(child, 'type.displayName') || get(child, 'type.name');

  // Check child.type first and as a fallback, check child.type.displayName follow by child.type.name
  return child && (child.type === TabPanel || componentName === 'TabPanel');
};

/**
 * Get the id of the first TabPanel child
 * @param {Object} props
 * @return {String} The id
 */
const getDefaultSelectedId = (props): string => {
  let selectedId;

  // TODO: Use the panelChildren method to pass in an array
  // of panels, instead of doing it here...
  React.Children.forEach(props.children, function (child) {
    if (isTabPanel(child) && !selectedId) {
      selectedId = child.props.id;
    }
  });

  return selectedId;
};

/**
 * Generate an id for a panel's associated tab if one doesn't yet exist
 * @param {Object} TabPanel component
 * @return {String} Tab ID
 */
const panelTabId = (panel): string => {
  return panel.props.tabId || `ds-c-tabs__item--${panel.props.id}`;
};

export const Tabs = (props: TabsProps) => {
  const initialSelectedId = props.defaultSelectedId || getDefaultSelectedId(props);
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const listClasses = classnames('ds-c-tabs', props.tablistClassName);
  // using useRef hook to keep track of elements to focus
  const tabsRef = useRef({});

  /**
   * Update the URL in the browser without adding a new entry to the history.
   * @param {String} url - Absolute or relative URL
   */
  const replaceState = (url: string): void => {
    if (window.history) {
      window.history.replaceState({}, document.title, url);
    }
  };

  const panelChildren = (): React.ReactNode[] => {
    return React.Children.toArray(props.children).filter(isTabPanel);
  };

  const handleSelectedTabChange = (newSelectedId: string): void => {
    const { onChange } = props;
    if (onChange) {
      onChange(newSelectedId, selectedId);
    }

    tabsRef.current[newSelectedId].focus();
    replaceState(tabsRef.current[newSelectedId].href);
    setSelectedId(newSelectedId);
  };

  const handleTabClick = (evt: React.MouseEvent, panelId: string): void => {
    evt.preventDefault();
    handleSelectedTabChange(panelId);
  };

  const handleTabKeyDown = (evt: React.KeyboardEvent, panelId: string): void => {
    const tabs = panelChildren();
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
        handleSelectedTabChange(target);
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
        handleSelectedTabChange(target);
        break;
      default:
        break;
    }
  };

  const renderChildren = (): React.ReactNode => {
    return React.Children.map(props.children, (child) => {
      if (isTabPanel(child) && React.isValidElement(child)) {
        // Extend props on panels before rendering. Also removes any props
        // that don't need passed into TabPanel but are used to generate
        // the Tab components
        return React.cloneElement(child as React.ReactElement<TabPanelProps>, {
          selected: selectedId === child.props.id,
          tab: undefined,
          tabHref: undefined,
          tabId: panelTabId(child),
        });
      }

      return child;
    });
  };

  const renderTabs = (): React.ReactNode => {
    const panels = panelChildren() as React.ReactElement[];

    const tabs = panels.map((panel) => {
      return (
        <Tab
          className={panel.props.tabClassName}
          href={panel.props.tabHref}
          disabled={panel.props.disabled}
          id={panelTabId(panel)}
          key={panel.key}
          onClick={handleTabClick}
          onKeyDown={handleTabKeyDown}
          panelId={panel.props.id}
          ref={(tab) => {
            tabsRef.current[panel.props.id] = tab;
          }}
          selected={selectedId === panel.props.id}
        >
          {panel.props.tab}
        </Tab>
      );
    });

    return tabs;
  };

  return (
    <div>
      <div className={listClasses} role="tablist">
        {renderTabs()}
      </div>
      {renderChildren()}
    </div>
  );
};

export default Tabs;
