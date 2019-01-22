'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpDrawerToggle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A link that triggers the visibility of a help drawer
 */
var HelpDrawerToggle = exports.HelpDrawerToggle = function (_React$PureComponent) {
  _inherits(HelpDrawerToggle, _React$PureComponent);

  function HelpDrawerToggle() {
    _classCallCheck(this, HelpDrawerToggle);

    return _possibleConstructorReturn(this, (HelpDrawerToggle.__proto__ || Object.getPrototypeOf(HelpDrawerToggle)).apply(this, arguments));
  }

  _createClass(HelpDrawerToggle, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.props.helpDrawerOpen && prevProps.helpDrawerOpen) {
        this.buttonRef.focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var blockInlineClass = 'ds-u-display--' + (this.props.inline ? 'inline-block' : 'block');
      /* eslint-disable jsx-a11y/anchor-is-valid */
      return (
        // Use a <span> since a <div> may be invalid depending where this link is nested
        _react2.default.createElement(
          'span',
          { className: blockInlineClass },
          _react2.default.createElement(
            'a',
            {
              href: 'javascript:void(0);',
              className: this.props.className,
              ref: function ref(el) {
                return _this2.buttonRef = el;
              },
              onClick: function onClick() {
                return _this2.props.showDrawer();
              }
            },
            this.props.children
          )
        )
      );
    }
  }]);

  return HelpDrawerToggle;
}(_react2.default.PureComponent);

/* eslint-disable react/no-unused-prop-types */


HelpDrawerToggle.propTypes = {
  /** Whether or not the Help Drawer controlled by this toggle is open or closed. This value is used to re-focus the toggle that opened the drawer when the drawer closes. */
  helpDrawerOpen: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired,
  /** Additional classes for the toggle button anchor element */
  className: _propTypes2.default.string,
  /** Add display inline or block to parent span */
  inline: _propTypes2.default.bool,
  /** This function is called with an id that the toggle generates. It can
   be used in implementing the help drawer for keeping track of the drawer the toggle controls */
  showDrawer: _propTypes2.default.func.isRequired
};

exports.default = HelpDrawerToggle;