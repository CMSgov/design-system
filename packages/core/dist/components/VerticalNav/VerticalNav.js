'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalNav = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _VerticalNavItem = require('./VerticalNavItem');

var _VerticalNavItem2 = _interopRequireDefault(_VerticalNavItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `VerticalNav` component accepts list items as a JSON object and
 * includes additional functionality like collapsible nested menus.
 */
var VerticalNav = exports.VerticalNav = function (_React$PureComponent) {
  _inherits(VerticalNav, _React$PureComponent);

  function VerticalNav() {
    _classCallCheck(this, VerticalNav);

    return _possibleConstructorReturn(this, (VerticalNav.__proto__ || Object.getPrototypeOf(VerticalNav)).apply(this, arguments));
  }

  _createClass(VerticalNav, [{
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      return this.props.items.map(function (item) {
        var onClick = item.onClick || _this2.props.onLinkClick;
        var selected = item.selected || _this2.props.selectedId && _this2.props.selectedId === item.id;

        if (!onClick) {
          onClick = undefined;
        }

        return _react2.default.createElement(_VerticalNavItem2.default, _extends({}, item, {
          _selectedId: _this2.props.selectedId,
          key: item.id + item.url + item.label,
          onClick: onClick,
          selected: selected
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)({
        'ds-c-vertical-nav': !this.props.nested,
        'ds-c-vertical-nav__subnav': this.props.nested,
        'ds-u-display--none': this.props.collapsed
      }, this.props.className);

      return _react2.default.createElement(
        'ul',
        { className: classes, id: this.props.id },
        this.renderItems()
      );
    }
  }]);

  return VerticalNav;
}(_react2.default.PureComponent);

VerticalNav.defaultProps = {
  collapsed: false
};

VerticalNav.propTypes = {
  /**
   * Additional classes to be added to the root element
   */
  className: _propTypes2.default.string,
  /**
   * Whether or not the menu is in a collapsed state
   */
  collapsed: _propTypes2.default.bool,
  /**
   * The `id` of the selected `VerticalNavItem`. This will also set the
   * `selected` prop on the item's parents.
   */
  selectedId: _propTypes2.default.string,
  id: _propTypes2.default.string,
  /**
   * An array of `VerticalNavItem` data objects
   */
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  /**
   * Indicates this list is nested within another nav item.
   */
  nested: _propTypes2.default.bool,
  /**
   * Called when one of the nav links is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `id`, `url`
   */
  onLinkClick: _propTypes2.default.func
};

exports.default = VerticalNav;