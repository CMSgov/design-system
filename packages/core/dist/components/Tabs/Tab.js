'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = exports.Tab = function (_React$PureComponent) {
  _inherits(Tab, _React$PureComponent);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

    _this.focus = _this.focus.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.href = _this.props.href || '#' + _this.props.panelId;
    return _this;
  }

  _createClass(Tab, [{
    key: 'handleClick',
    value: function handleClick(evt) {
      if (this.props.onClick) {
        this.props.onClick(evt, this.props.panelId, this.props.id, this.href);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(evt) {
      if (this.props.onKeyDown) {
        this.props.onKeyDown(evt, this.props.panelId, this.props.id, this.href);
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.tab.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = (0, _classnames2.default)('ds-c-tabs__item', this.props.className);

      return _react2.default.createElement(
        'a',
        {
          'aria-selected': String(this.props.selected),
          'aria-controls': this.props.panelId,
          className: classes,
          href: this.href,
          id: this.props.id,
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          role: 'tab',
          ref: function ref(tab) {
            _this2.tab = tab;
          }
        },
        this.props.children
      );
    }
  }]);

  return Tab;
}(_react2.default.PureComponent);

Tab.defaultProps = {
  selected: false
};

Tab.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root tab element.
   */
  className: _propTypes2.default.string,
  /**
   * A unique `id`, to be used on the rendered tab element.
   */
  id: _propTypes2.default.string.isRequired,
  /**
   * Sets the `href` attribute used for the tab. This can be useful if you want
   * to use relative links rather than a URL hash (the default).
   */
  href: _propTypes2.default.string,
  /**
   * Called when the tab is clicked, with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onClick: _propTypes2.default.func,
  /**
   * Called when the tab is selected and a keydown event is triggered.
   * Called with the following arguments:
   * [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html),
   * `panelId`, `id`, `href`
   */
  onKeyDown: _propTypes2.default.func,
  /**
   * The `id` of the associated `TabPanel`. Used for the `aria-controls` attribute.
   */
  panelId: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.bool
};

exports.default = Tab;