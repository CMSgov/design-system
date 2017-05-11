import PropTypes from 'prop-types';
import React from 'react';
import Tab from './Tab';
import TabPanel from './TabPanel';

/**
 * Get the key of the first TabPanel child
 * @param {Object} props
 * @return {String} The key
 */
function getDefaultSelectedKey(props) {
  let selectedKey;

  React.Children.forEach(props.children, function(child) {
    if (isTabPanel(child) && !selectedKey) {
      selectedKey = child.key;
    }
  });

  return selectedKey;
}

/**
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TabPanel component?
 */
function isTabPanel(child) {
  return child != null && child.type === TabPanel;
}

/**
 * A container component that manages the state of your tabs for you, and
 * generates the necessary `id` attributes for your tab and panels. For most
 * cases, you'll want to use this component rather than the presentational
 * components (`Tab`, `TabPanel`) on their own.
 */
class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    let selectedKey;

    if ('defaultSelectedKey' in props) {
      selectedKey = props.defaultSelectedKey;
    } else {
      selectedKey = getDefaultSelectedKey(props);
    }

    this.state = { selectedKey };
  }

  // Filter children and return only TabPanel components
  panelChildren() {
    return React.Children.toArray(this.props.children)
      .filter(isTabPanel);
  }

  renderChildren() {
    return React.Children.map(this.props.children, function(child) {
      if (isTabPanel(child)) {
        // TODO:
        // - Generate an id for the panel if it doesn't have one
        // - Clone the panel and add any additional props to it + remove 'tab' prop?
      }

      return child;
    });
  }

  renderTabs() {
    const panels = this.panelChildren();
    const tabs = React.Children.map(panels, (panel) => {
      // TODO:
      // - Generate an id for the tab, using the panel's default id, then its generated id
      // - Pass in the generated tab id and panelId
      // - Add support for onTabClick event handler
      return <Tab key={panel.key}>{panel.props.tab}</Tab>;
    });

    return <div className='ds-c-tabs' role='tablist'>{tabs}</div>;
  }

  render() {
    return (
      <div id={this.props.id}>
        {this.renderTabs()}
        {this.renderChildren()}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Default selected `TabPanel`'s key. If this isn't set, the first `TabPanel`
   * will be selected.
   */
  defaultSelectedKey: PropTypes.string,
  /**
   * A unique identifier for the container. This will also be used to generate
   * additional IDs and ARIA values for the `Tab` and `TabPanel` components
   */
  id: PropTypes.string.isRequired,
  /**
   * TODO
   */
  onChange: PropTypes.func,
  /**
   * TODO
   */
  onTabClick: PropTypes.func,
  /**
   * Additional classes to be added to the component wrapping the tabs
   */
  tablistClassName: PropTypes.string
};

export default Tabs;
