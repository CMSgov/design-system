'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Review = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReviewLink = require('./ReviewLink');

var _ReviewLink2 = _interopRequireDefault(_ReviewLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Review

@react-component Review

Style guide: patterns.review
*/

/**
 * The `Review` component is used for listing a summary of information entered
 * by a user. Its content includes a heading, value, and edit link.
 */
var Review = exports.Review = function (_React$PureComponent) {
  _inherits(Review, _React$PureComponent);

  function Review() {
    _classCallCheck(this, Review);

    return _possibleConstructorReturn(this, (Review.__proto__ || Object.getPrototypeOf(Review)).apply(this, arguments));
  }

  _createClass(Review, [{
    key: 'heading',
    value: function heading() {
      if (this.props.heading) {
        return _react2.default.createElement(
          'h3',
          { className: 'ds-text ds-u-margin-bottom--0 ds-u-font-weight--bold ds-u-display--inline-block' },
          this.props.heading
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ds-u-border-bottom--2 ds-u-padding-y--2 ds-u-justify-content--between ds-u-display--flex' },
        _react2.default.createElement(
          'div',
          { className: 'ds-u-margin-right--2' },
          this.heading(),
          _react2.default.createElement(
            'div',
            null,
            this.props.children
          )
        ),
        _react2.default.createElement(
          _ReviewLink2.default,
          { onClick: this.props.onClick, href: this.props.href },
          this.props.linkText
        )
      );
    }
  }]);

  return Review;
}(_react2.default.PureComponent);

Review.defaultProps = {
  linkText: 'Edit'
};

Review.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * An optional function that is executed on link click. The href value is
   * passed to this function.
   */
  onClick: _propTypes2.default.func,
  heading: _propTypes2.default.string,
  href: _propTypes2.default.string.isRequired,
  linkText: _propTypes2.default.node.isRequired
};

exports.default = Review;