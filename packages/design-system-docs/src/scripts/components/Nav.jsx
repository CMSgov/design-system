import PropTypes from 'prop-types';
import React from 'react';
import path from 'path';
import { VerticalNav } from '@cmsgov/design-system';

/**
 * By default all the menus are collapsed, but we want to expand the menu
 * containing the currently selected page.
 * @param {Array} items
 * @param {String} selectedId
 * @return {Array} New items array
 */
function expandSelectedItems(items, selectedId) {
  items = [].concat(items); // Don't mutate items

  items.some(function (item) {
    if (item.id === selectedId || isParentOfSelectedChild(item.items, selectedId)) {
      item.defaultCollapsed = false;
      return true;
    }
  });

  return items;
}

function isParentOfSelectedChild(items, selectedId) {
  if (items && items.length) {
    return items.some((item) => item.id === selectedId);
  }

  return false;
}

function updateItemsWithRootPath(items) {
  if (process.env.rootPath !== '' && items && items.length > 0) {
    items.forEach(item => {
      if (item && item.url) {
        item.url = path.join('/', process.env.rootPath, item.url);
      }
      if (item && item.items) {
        const updatedSubItems = updateItemsWithRootPath(item.items);
        item.items = updatedSubItems;
      }
    });
  }
  return items;
}

const Nav = (props) => {
  const items = updateItemsWithRootPath(props.items)

  return (
    <VerticalNav
      className="c-nav__list"
      items={expandSelectedItems(items, props.selectedId)}
      selectedId={props.selectedId ? props.selectedId : undefined}
    />
  );
};

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default Nav;
