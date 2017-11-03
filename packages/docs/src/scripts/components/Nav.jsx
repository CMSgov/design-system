import PropTypes from 'prop-types';
import React from 'react';
import { VerticalNav } from '@cmsgov/design-system-core';

/**
 * By default all the menus are collapsed, but we want to expand the menu
 * containing the currently selected page.
 * @param {Array} items
 * @param {String} selectedId
 * @return {Array} New items array
 */
function expandSelectedItems(items, selectedId) {
  items = [].concat(items); // Don't mutate items

  items.some(function(item) {
    if (
      item.id === selectedId ||
      isParentOfSelectedChild(item.items, selectedId)
    ) {
      item.defaultCollapsed = false;
      return true;
    }
  });

  return items;
}

function isParentOfSelectedChild(items, selectedId) {
  if (items && items.length) {
    return items.some(item => item.id === selectedId);
  }

  return false;
}

const Nav = props => {
  return (
    <VerticalNav
      className="c-nav__list"
      items={expandSelectedItems(props.items, props.selectedId)}
      selectedId={props.selectedId ? props.selectedId : undefined}
    />
  );
};

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.string.isRequired
};

export default Nav;
