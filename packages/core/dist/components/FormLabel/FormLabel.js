'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormLabel = undefined;

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

/**
 * The `FormLabel` component provides the `label` (or `legend`) for a field,
 * along with any associated hint text and error message.
 */
var FormLabel = exports.FormLabel = function (_React$PureComponent) {
  _inherits(FormLabel, _React$PureComponent);

  function FormLabel() {
    _classCallCheck(this, FormLabel);

    return _possibleConstructorReturn(this, (FormLabel.__proto__ || Object.getPrototypeOf(FormLabel)).apply(this, arguments));
  }

  _createClass(FormLabel, [{
    key: 'errorMessage',
    value: function errorMessage() {
      if (this.props.errorMessage) {
        return _react2.default.createElement(
          'span',
          {
            className: 'ds-c-field__hint ds-u-color--error',
            id: this.props.fieldId + '-message',
            role: 'alert'
          },
          this.props.errorMessage
        );
      }
    }
  }, {
    key: 'hint',
    value: function hint() {
      var _props = this.props,
          hint = _props.hint,
          requirementLabel = _props.requirementLabel;

      if (!hint && !requirementLabel) return;

      var classes = (0, _classnames2.default)('ds-c-field__hint', {
        'ds-c-field__hint--inverse': this.props.inversed
      });

      if (requirementLabel && hint) {
        if (typeof requirementLabel === 'string') {
          // Remove any existing spacing and punctuation
          requirementLabel = requirementLabel.trim().replace(/\.$/, '');
          // Add punctuation after the requirementLabel so it doesn't run into the hint
          requirementLabel = requirementLabel + '.';
        }

        // Add space between hint and preceding requirementLabel
        hint = ' ' + hint;
      }

      return _react2.default.createElement(
        'span',
        { className: classes },
        requirementLabel,
        hint
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var ComponentType = this.props.component;
      var labelTextClasses = (0, _classnames2.default)(this.props.labelClassName, {
        'ds-u-font-weight--bold': this.props.errorMessage
      });
      var classes = (0, _classnames2.default)('ds-c-label', this.props.className);

      return _react2.default.createElement(
        ComponentType,
        { className: classes, htmlFor: this.props.fieldId },
        _react2.default.createElement(
          'span',
          { className: labelTextClasses },
          this.props.children
        ),
        this.errorMessage(),
        this.hint()
      );
    }
  }]);

  return FormLabel;
}(_react2.default.PureComponent);

FormLabel.defaultProps = { component: 'label' };
FormLabel.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Additional classes to be added to the label text.
   */
  labelClassName: _propTypes2.default.string,
  /** The root HTML element used to render the label */
  component: _propTypes2.default.oneOf(['label', 'legend']),
  /** Enable the error state by providing an error message. */
  errorMessage: _propTypes2.default.node,
  /**
   * The ID of the field this label is for. This is used for the label's `for`
   * attribute and any related ARIA attributes, such as for the error message.
   */
  fieldId: _propTypes2.default.string,
  /**
   * Additional hint text to display
   */
  hint: _propTypes2.default.node,
  /**
   * Text showing the requirement (ie. "Optional", or "Required").
   * In most cases, this should be used to indicate which fields are optional.
   * See the [form guidelines]({{root}}/guidelines/forms/) for more info.
   */
  requirementLabel: _propTypes2.default.node,
  /**
   * Set to `true` to apply the "inverse" theme
   */
  inversed: _propTypes2.default.bool
};

exports.default = FormLabel;