'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormLabel = require('./FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormField = exports.FormField = function (_React$PureComponent) {
  _inherits(FormField, _React$PureComponent);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)({ 'ds-base--inverse': this.props.inversed }, this.props.className);

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _FormLabel2.default,
          { hint: this.props.hint },
          this.props.label
        ),
        _react2.default.createElement('input', {
          className: 'ds-c-field ds-c-field--error',
          id: 'input-lastname',
          name: this.props.name,
          type: this.props.type,
          'aria-describedby': 'input-lastname-message'
        })
      );
    }
  }]);

  return FormField;
}(_react2.default.PureComponent);

FormField.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /** Additional classes to be added to the root `select` element. */
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  errorMessage: _FormLabel2.default.propTypes.errorMessage,
  hint: _FormLabel2.default.propTypes.hint,
  inversed: _propTypes2.default.bool,
  /** Field label */
  label: _FormLabel2.default.propTypes.children,
  name: _propTypes2.default.string.isRequired
};

exports.default = FormField;