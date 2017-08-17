'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalNavItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _VerticalNav = require('./VerticalNav');

var _VerticalNav2 = _interopRequireDefault(_VerticalNav);

var _VerticalNavItemLabel = require('./VerticalNavItemLabel');

var _VerticalNavItemLabel2 = _interopRequireDefault(_VerticalNavItemLabel);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerticalNavItem = exports.VerticalNavItem = function (_React$PureComponent) {
  _inherits(VerticalNavItem, _React$PureComponent);

  function VerticalNavItem(props) {
    _classCallCheck(this, VerticalNavItem);

    var _this = _possibleConstructorReturn(this, (VerticalNavItem.__proto__ || Object.getPrototypeOf(VerticalNavItem)).call(this, props));

    _this.handleLabelClick = _this.handleLabelClick.bind(_this);
    _this.id = _this.props.id || (0, _lodash2.default)('VerticalNavItem_');
    _this.subnavId = _this.id + '__subnav';
    _this.state = { collapsed: _this.props.defaultCollapsed };
    return _this;
  }

  _createClass(VerticalNavItem, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.onSubnavToggle && prevState.collapsed !== this.state.collapsed) {
        this.props.onSubnavToggle(this.props.id, this.state.collapsed);
      }
    }

    /**
     * Called when VerticalNavItemLabel is clicked. Since the "label" could be
     * a link, subnav toggle button, or plain text, we use this method to
     * determine what action to take and which event to actually fire.
     * @param {Object} SyntheticEvent
     */

  }, {
    key: 'handleLabelClick',
    value: function handleLabelClick(evt) {
      if (this.hasSubnav()) {
        return this.handleToggleClick();
      }

      return this.handleClick(evt);
    }

    /**
     * Note: This event handler will only get called when the VerticalNavItemLabel
     * is a link or plain text
     */

  }, {
    key: 'handleClick',
    value: function handleClick(evt) {
      if (this.props.onClick) {
        this.props.onClick(evt, this.id, this.props.url);
      }
    }
  }, {
    key: 'handleToggleClick',
    value: function handleToggleClick() {
      this.setState({ collapsed: !this.state.collapsed });
    }
  }, {
    key: 'hasSubnav',
    value: function hasSubnav() {
      return Boolean(this.props.items && this.props.items.length > 0);
    }

    /**
     * Check if this item is selected or if it is a parent of a selected item
     * @return {Boolean}
     */

  }, {
    key: 'isSelected',
    value: function isSelected() {
      if (this.props.selected) return this.props.selected;

      if (this.props._selectedId && this.hasSubnav()) {
        return this.childIsSelected(this.props.items);
      }

      return false;
    }

    /**
     * Checks if a descendant is selected
     * @param {Array} children - The nested items
     * @return {Boolean}
     */

  }, {
    key: 'childIsSelected',
    value: function childIsSelected(children) {
      var _this2 = this;

      if (children && children.length) {
        return children.some(function (child) {
          return child.id === _this2.props._selectedId || _this2.childIsSelected(child.items);
        });
      }

      return false;
    }
  }, {
    key: 'subnavItems',
    value: function subnavItems() {
      if (this.props.url) {
        // Since the VerticalNavItemLabel will just toggle the subnav, we
        // add a link to the top of the subnav for this item. Otherwise there
        // wouldn't be a way to actually visit its URL
        var item = _extends({}, this.props);
        delete item.items;

        return [item].concat(this.props.items);
      }

      return this.props.items;
    }
  }, {
    key: 'renderSubnav',
    value: function renderSubnav() {
      if (this.hasSubnav()) {
        return _react2.default.createElement(_VerticalNav2.default, {
          selectedId: this.props._selectedId,
          collapsed: this.state.collapsed,
          id: this.subnavId,
          items: this.subnavItems(),
          nested: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)('ds-c-vertical-nav__item', this.props.className);

      return _react2.default.createElement(
        'li',
        { className: classes },
        _react2.default.createElement(_VerticalNavItemLabel2.default, {
          ariaCollapsedStateButtonLabel: this.props.ariaCollapsedStateButtonLabel,
          ariaExpandedStateButtonLabel: this.props.ariaExpandedStateButtonLabel,
          collapsed: this.state.collapsed,
          label: this.props.label,
          hasSubnav: this.hasSubnav(),
          onClick: this.handleLabelClick,
          selected: this.isSelected(),
          subnavId: this.subnavId,
          url: this.props.url
        }),
        this.renderSubnav()
      );
    }
  }]);

  return VerticalNavItem;
}(_react2.default.PureComponent);

VerticalNavItem.defaultProps = {
  // Unfortunately, we're defining these default ARIA pros here and in
  // VerticalNavItemLabel. We define them here so they show in the docs.
  // TODO(sawyer): Update react-docgen so we don't have to do this
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation',
  defaultCollapsed: false
};

VerticalNavItem.propTypes = {
  // This gets passed through from the parent VerticalNav to a nested VerticalNav
  _selectedId: _propTypes2.default.string,
  /**
   * Aria label for the toggle button when the sub-navigation is collapsed
   */
  ariaCollapsedStateButtonLabel: _propTypes2.default.string,
  /**
   * Aria label for the toggle button when the sub-navigation is expanded
   */
  ariaExpandedStateButtonLabel: _propTypes2.default.string,
  /**
   * Additional classes to be added to the root element
   */
  className: _propTypes2.default.string,
  /**
   * Whether or not the item's sub-navigation is in a collapsed state by default
   */
  defaultCollapsed: _propTypes2.default.bool,
  /**
   * Called when the link is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`.
   *
   * This takes precedence over the `VerticalNav` `onLinkClick` prop
   */
  onClick: _propTypes2.default.func,
  /**
   * Called when this item's subnav is collapsed or expanded, with the
   * following arguments: `id`, `collapsed`
   */
  onSubnavToggle: _propTypes2.default.func,
  /**
   * Optional identifier. This can be handy if you're passing in an
   * `onClick` handler. A unique ID will be generated if one isn't provided.
   */
  id: _propTypes2.default.string,
  /**
   * An array of nested `VerticalNavItem` data objects to be rendered in a
   * sub-navigation list.
   */
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape(VerticalNavItem.propTypes)),
  /**
   * Text to render for this nav item
   */
  label: _propTypes2.default.node.isRequired,
  /**
   * A URL to navigate to if this item is a link
   */
  url: _propTypes2.default.string,
  /**
   * If this item is currently selected
   */
  selected: _propTypes2.default.bool
};

exports.default = VerticalNavItem;