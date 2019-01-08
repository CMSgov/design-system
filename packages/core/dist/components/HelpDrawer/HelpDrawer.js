'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpDrawer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelpDrawer = exports.HelpDrawer = function (_React$PureComponent) {
  _inherits(HelpDrawer, _React$PureComponent);

  function HelpDrawer(props) {
    _classCallCheck(this, HelpDrawer);

    var _this = _possibleConstructorReturn(this, (HelpDrawer.__proto__ || Object.getPrototypeOf(HelpDrawer)).call(this, props));

    _this.titleRef = null;
    return _this;
  }

  _createClass(HelpDrawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.titleRef) this.titleRef.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          ariaLabel = _props.ariaLabel,
          title = _props.title,
          children = _props.children,
          onCloseClick = _props.onCloseClick,
          footerBody = _props.footerBody,
          footerTitle = _props.footerTitle;
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex, react/no-danger */

      return _react2.default.createElement(
        'div',
        { className: 'ds-c-help-drawer' },
        _react2.default.createElement(
          'div',
          { className: 'ds-c-help-drawer__header' },
          _react2.default.createElement(
            'div',
            { className: 'ds-u-fill--gray-lightest ds-u-padding--2 ds-u-display--flex ds-u-align-items--start' },
            _react2.default.createElement(
              'h3',
              {
                ref: function ref(el) {
                  return _this2.titleRef = el;
                },
                tabIndex: '0',
                className: 'ds-u-text--lead ds-u-margin-y--0 ds-u-margin-right--2'
              },
              title
            ),
            _react2.default.createElement(
              _Button2.default,
              {
                'aria-label': ariaLabel,
                className: 'ds-u-margin-left--auto',
                size: 'small',
                onClick: onCloseClick,
                variation: 'secondary'
              },
              'Close'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'ds-c-help-drawer__body ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2' },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: 'ds-c-help-drawer__footer ds-u-fill--primary-alt-lightest ds-u-md-font-size--small ds-u-lg-font-size--base ds-u-padding--2' },
          _react2.default.createElement(
            'h4',
            { className: 'ds-text ds-u-margin--0' },
            footerTitle
          ),
          _react2.default.createElement(
            'div',
            { className: 'ds-text ds-u-margin--0' },
            footerBody
          )
        )
      );
    }
  }]);

  return HelpDrawer;
}(_react2.default.PureComponent);

HelpDrawer.defaultProps = { ariaLabel: 'Close help drawer' };
HelpDrawer.propTypes = {
  /** Helps give more context to screen readers on the button that closes the Help Drawer */
  ariaLabel: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  footerBody: _propTypes2.default.node,
  footerTitle: _propTypes2.default.string,
  onCloseClick: _propTypes2.default.func.isRequired,
  /** Required because the title is what gets focused on mount */
  title: _propTypes2.default.string.isRequired
};

exports.default = HelpDrawer;