'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalNavItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _VerticalNav = require('./VerticalNav');

var _VerticalNav2 = _interopRequireDefault(_VerticalNav);

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

    _this.handleLinkClick = _this.handleLinkClick.bind(_this);
    _this.handleToggleClick = _this.handleToggleClick.bind(_this);
    _this.id = _this.props.id || (0, _lodash2.default)('VerticalNavItem_');
    _this.subnavId = _this.id + '__subnav';

    _this.state = {
      collapsed: _this.props.defaultCollapsed
    };
    return _this;
  }

  _createClass(VerticalNavItem, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.onSubnavToggle && prevState.collapsed !== this.state.collapsed) {
        this.props.onSubnavToggle(this.props.id, this.state.collapsed);
      }
    }
  }, {
    key: 'handleLinkClick',
    value: function handleLinkClick(evt) {
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
      return this.props.items && this.props.items.length;
    }

    /**
     * Check if this item is selected or if it is a parent of a selected item
     */

  }, {
    key: 'isSelected',
    value: function isSelected() {
      if (this.props.selected) return this.props.selected;

      if (this.props._selectedId && this.hasSubnav()) {
        return this.childIsSelected(this.props.items);
      }
    }

    /**
     * Checks if a descendant is selected
     * @param {Array} children - The nested items
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
    key: 'renderSubnavToggle',
    value: function renderSubnavToggle() {
      if (this.hasSubnav()) {
        var label = this.state.collapsed ? this.props.ariaCollapsedStateButtonLabel : this.props.ariaExpandedStateButtonLabel;

        return _react2.default.createElement(
          'button',
          {
            'aria-controls': this.subnavId,
            'aria-expanded': !this.state.collapsed,
            className: 'ds-c-vertical-nav__subnav-toggle',
            onClick: this.handleToggleClick
          },
          label
        );
      }
    }
  }, {
    key: 'renderSubnav',
    value: function renderSubnav() {
      if (this.hasSubnav()) {
        return _react2.default.createElement(_VerticalNav2.default, {
          selectedId: this.props._selectedId,
          collapsed: this.state.collapsed,
          id: this.subnavId,
          items: this.props.items,
          nested: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)('ds-c-vertical-nav__item', this.props.className);
      var LinkComponent = this.props.url ? 'a' : 'div';
      var linkProps = {
        className: (0, _classnames2.default)('ds-c-vertical-nav__link', {
          'ds-c-vertical-nav__link--current': this.isSelected(),
          'ds-c-vertical-nav__link--parent': this.hasSubnav()
        }),
        href: this.props.url ? this.props.url : undefined,
        onClick: this.props.onClick ? this.handleLinkClick : undefined
      };

      return _react2.default.createElement(
        'li',
        { className: classes },
        _react2.default.createElement(
          LinkComponent,
          linkProps,
          this.props.label
        ),
        this.renderSubnavToggle(),
        this.renderSubnav()
      );
    }
  }]);

  return VerticalNavItem;
}(_react2.default.PureComponent);

VerticalNavItem.defaultProps = {
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
   * Called when the item is clicked, with the following arguments:
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