import { Children, cloneElement, isValidElement, useState, useRef } from 'react';
import React from 'react';
import Tab from './Tab';
import TabPanel, { TabPanelProps } from './TabPanel';
import classnames from 'classnames';
import get from 'lodash/get';

export interface TabsProps {
  /**
   * Defines a customizable `aria-label` on the screen-reader heading for this element.
   */
  ariaLabel?: string;
  /**
   * Must only contain `TabPanel` components
   */
  children: React.ReactNode;
  /**
   * Sets the initial selected state to the specified `TabPanel` id. Use this
   * for an uncontrolled component; otherwise, use the `selectedId` property.
   * If no selected id is specified, the first `TabPanel` will be selected.
   */
  defaultSelectedId?: string;
  /**
   * Sets the initial selected state to the specified `TabPanel` id. Use this
   * in combination with `onChange` for a controlled component; otherwise, set
   * `defaultSelectedId`.
   */
  selectedId?: string;
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
  Children.forEach(props.children, function (child) {
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
  return panel.props.tabId ?? `${panel.props.id}__tab`;
};

/**
 * `Tabs` is a container component that manages the state of your tabs for you.
 * In most cases, you'll want to use this component rather than the
 * presentational components (`Tab`, `TabPanel`) on their own.
 *
 * A `TabPanel` is a presentational component which accepts a tab's content as
 * its `children`.
 *
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/tabs/).
 */
export const Tabs = (props: TabsProps) => {
  const initialSelectedId = props.defaultSelectedId || getDefaultSelectedId(props);
  const [internalSelectedId, setSelectedId] = useState(initialSelectedId);
  const isControlled = props.selectedId !== undefined;
  const selectedId = isControlled ? props.selectedId : internalSelectedId;
  const ariaProps = props.ariaLabel ? { 'aria-label': props.ariaLabel } : {};

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
    return Children.toArray(props.children).filter(isTabPanel);
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
    const tabs = panelChildren().filter((elem): elem is React.ReactElement =>
      React.isValidElement(elem)
    );
    const tabIndex = tabs.findIndex((elem: React.ReactElement) => elem.props.id === panelId);

    let target;
    const isDisabled = (tab: React.ReactElement) => tab.props.disabled;

    switch (evt.key) {
      case LEFT_ARROW: {
        evt.preventDefault();
        // If we're on the first tab, make previous the last tab in the list.
        let prevTabIndex = tabIndex === 0 ? tabs.length - 1 : tabIndex - 1;
        // If we're on a disabled tab, skip until we find an enabled one.
        while (isDisabled(tabs[prevTabIndex])) {
          prevTabIndex = prevTabIndex === 0 ? tabs.length - 1 : prevTabIndex - 1;
        }
        target = tabs[prevTabIndex].props.id;
        handleSelectedTabChange(target);
        break;
      }

      case RIGHT_ARROW: {
        evt.preventDefault();
        // If we're on the last tab, make next tab the first in the list.
        let nextTabIndex = tabIndex === tabs.length - 1 ? 0 : tabIndex + 1;
        // If we're on a disabled tab, skip until we find an enabled one.
        while (isDisabled(tabs[nextTabIndex])) {
          nextTabIndex = nextTabIndex === tabs.length - 1 ? 0 : nextTabIndex + 1;
        }
        target = tabs[nextTabIndex].props.id;
        handleSelectedTabChange(target);
        break;
      }

      default:
        break;
    }
  };

  const renderChildren = (): React.ReactNode => {
    return Children.map(props.children, (child) => {
      if (isTabPanel(child) && isValidElement(child)) {
        // Extend props on panels before rendering. Also removes any props
        // that don't need passed into TabPanel but are used to generate
        // the Tab components
        return cloneElement(child as React.ReactElement<TabPanelProps>, {
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
      <div className={listClasses} role="tablist" {...ariaProps}>
        {renderTabs()}
      </div>
      {renderChildren()}
    </div>
  );
};

export default Tabs;
