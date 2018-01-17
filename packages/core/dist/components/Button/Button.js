'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Button` component accepts its text as children (AKA inner HTML), which
 * means you can also pass in HTML or custom components. This gives you a lot of
 * flexibility and supports a variety of advanced use cases. The most common use
 * case would be passing in an SVG icon along with the text.
 *
 * In addition to the supported props listed, you can also pass in additional
 * props, which will be passed to the rendered root component. For example,
 * you could pass in a `target` prop to pass to the rendered anchor element.
 */
var Button = exports.Button = function (_React$PureComponent) {
  _inherits(Button, _React$PureComponent);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'attrs',

    // Get an object of props to pass to the rendered <Button> component
    value: function attrs() {
      /**
       * Since any number of arbitrary props can be passed into this component, we
       * use a destructuring assignment to get only the props we want to pass to the
       * rendered HTML element. For example, the "variation" prop is used to generate
       * the classNames, but doesn't need passed to the rendered component, so we
       * omit it here so that it's not included in the props object.
       */
      var _props = this.props,
          className = _props.className,
          component = _props.component,
          inverse = _props.inverse,
          onClick = _props.onClick,
          size = _props.size,
          variation = _props.variation,
          props = _objectWithoutProperties(_props, ['className', 'component', 'inverse', 'onClick', 'size', 'variation']);

      var attrs = _extends({
        className: this.classNames()
      }, props);

      if (this.props.onClick) {
        attrs.onClick = this.handleClick.bind(this);
      }

      return attrs;
    }
  }, {
    key: 'classNames',
    value: function classNames() {
      var variationClass = this.props.variation && 'ds-c-button--' + this.props.variation;
      var disabledClass = this.props.disabled && 'ds-c-button--disabled';

      if (this.props.inverse) {
        if (disabledClass) {
          disabledClass += '-inverse';
        } else if (variationClass) {
          variationClass += '-inverse';
        } else {
          variationClass = 'ds-c-button--inverse';
        }
      }

      return (0, _classnames2.default)('ds-c-button', disabledClass, !disabledClass && variationClass, this.props.size && 'ds-c-button--' + this.props.size, this.props.className);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (!this.props.disabled) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var attrs = this.attrs();
      var ComponentType = 'button';

      if (this.props.component) {
        ComponentType = this.props.component;
      } else if (this.props.href) {
        ComponentType = 'a';
        // Remove <button> specific attributes
        delete attrs.disabled;
        delete attrs.type;
      }

      return _react2.default.createElement(
        ComponentType,
        attrs,
        this.props.children
      );
    }
  }]);

  return Button;
}(_react2.default.PureComponent);

Button.defaultProps = { type: 'button' };
Button.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root button element.
   * Useful for adding utility classes.
   */
  className: _propTypes2.default.string,
  /**
   * When provided, this will render the passed in component. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  disabled: _propTypes2.default.bool,
  /**
   * When provided the root component will render as an `<a>` element
   * rather than `button`.
   */
  href: _propTypes2.default.string,
  /** Applies the inverse theme styling */
  inverse: _propTypes2.default.bool,
  /**
   * Returns the [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html).
   * Not called when the button is disabled.
   */
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.oneOf(['small', 'big']),
  /**
   * Button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute
   */
  type: _propTypes2.default.oneOf(['button', 'submit']),
  /**
   * A string corresponding to the button-component variation classes (`primary`, `danger`, `success`, `transparent`)
   */
  variation: _propTypes2.default.string
};

exports.default = Button;