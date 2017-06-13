import PropTypes from 'prop-types';
import React from 'react';
import VerticalNavItem from './VerticalNavItem';

/**
 * The `VerticalNav` React component accepts list items as a JSON object and
 * includes additional functionality like collapsible nested menus.
 */
export class VerticalNav extends React.PureComponent {
  renderItems() {
    return this.props.items.map(function(item) {
      return (
        <VerticalNavItem
          {...item}
          key={item.id + item.url + item.label}
        />
      );
    });
  }

  render() {
    return (
      <ul className='ds-c-vertical-nav'>
        {this.renderItems()}
      </ul>
    );
  }
}

VerticalNav.propTypes = {
  /**
   * Additional classes to be added to the root element
   */
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape(VerticalNavItem.propTypes)
  ).isRequired
};

export default VerticalNav;
