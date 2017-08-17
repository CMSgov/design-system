'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalNavItemLabel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var VerticalNavItemLabel = exports.VerticalNavItemLabel = function (_React$PureComponent) {
  _inherits(VerticalNavItemLabel, _React$PureComponent);

  function VerticalNavItemLabel(props) {
    _classCallCheck(this, VerticalNavItemLabel);

    var _this = _possibleConstructorReturn(this, (VerticalNavItemLabel.__proto__ || Object.getPrototypeOf(VerticalNavItemLabel)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.LabelComponent = _this.componentType();
    return _this;
  }

  /**
   * The type of element rendered ultimately depends on whether
   * this is meant to be a subnav toggle, link, or generic label
   * @return {String} The type of HTML tag
   */


  _createClass(VerticalNavItemLabel, [{
    key: 'componentType',
    value: function componentType() {
      if (this.props.hasSubnav) {
        return 'button';
      } else if (this.props.url) {
        return 'a';
      }

      return 'div';
    }
  }, {
    key: 'handleClick',
    value: function handleClick(evt) {
      this.props.onClick(evt);
    }
  }, {
    key: 'anchorProps',
    value: function anchorProps() {
      return {
        href: this.props.url
      };
    }
  }, {
    key: 'buttonProps',
    value: function buttonProps() {
      return {
        'aria-controls': this.props.subnavId,
        'aria-expanded': !this.props.collapsed,
        title: this.props.collapsed ? this.props.ariaCollapsedStateButtonLabel : this.props.ariaExpandedStateButtonLabel
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {
        className: (0, _classnames2.default)('ds-c-vertical-nav__label', {
          'ds-c-vertical-nav__label--current': this.props.selected,
          'ds-c-vertical-nav__label--parent': this.props.hasSubnav
        }),
        onClick: this.props.onClick ? this.handleClick : undefined
      };

      if (this.LabelComponent === 'a') {
        props = _extends(props, this.anchorProps());
      } else if (this.LabelComponent === 'button') {
        props = _extends(props, this.buttonProps());
      }

      return _react2.default.createElement(
        this.LabelComponent,
        props,
        this.props.label
      );
    }
  }]);

  return VerticalNavItemLabel;
}(_react2.default.PureComponent);

VerticalNavItemLabel.defaultProps = {
  ariaCollapsedStateButtonLabel: 'Expand sub-navigation',
  ariaExpandedStateButtonLabel: 'Collapse sub-navigation'
};

VerticalNavItemLabel.propTypes = {
  ariaCollapsedStateButtonLabel: _propTypes2.default.string,
  ariaExpandedStateButtonLabel: _propTypes2.default.string,
  collapsed: _propTypes2.default.bool,
  hasSubnav: _propTypes2.default.bool,
  label: _propTypes2.default.node.isRequired,
  onClick: _propTypes2.default.func,
  selected: _propTypes2.default.bool,
  subnavId: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string
};

exports.default = VerticalNavItemLabel;