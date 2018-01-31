'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('core-js/fn/array/find');

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _downshift = require('downshift');

var _downshift2 = _interopRequireDefault(_downshift);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('../TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Determine if a React component is a TextField
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TextField component?
 */
function isTextField(child) {
  return child != null && child.type === _TextField2.default;
}

/**
 * The `Autocomplete` component is a parent component that adds autocomplete functionality to a `TextField` component.
 */

var Autocomplete = exports.Autocomplete = function (_React$PureComponent) {
  _inherits(Autocomplete, _React$PureComponent);

  function Autocomplete(props) {
    _classCallCheck(this, Autocomplete);

    var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

    _this.id = (0, _lodash2.default)('autocomplete_');
    _this.labelId = (0, _lodash2.default)('autocomplete_header_');
    _this.listboxId = (0, _lodash2.default)('autocomplete_owned_listbox_');
    return _this;
  }

  _createClass(Autocomplete, [{
    key: 'filterItems',
    value: function filterItems(items, inputValue, getInputProps, getItemProps, highlightedIndex) {
      var _this2 = this;

      if (this.props.loading) {
        return _react2.default.createElement(
          'li',
          { className: 'ds-c-autocomplete__list-item--message' },
          this.props.loadingMessage
        );
      }

      if (items.length) {
        return items.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            _extends({
              'aria-selected': highlightedIndex === index,
              className: highlightedIndex === index ? 'ds-c-autocomplete__list-item ds-c-autocomplete__list-item--active' : 'ds-c-autocomplete__list-item',
              key: item.id,
              role: 'option'
            }, getItemProps({ item: item })),
            _this2.props.itemToString(item)
          );
        });
      }

      return _react2.default.createElement(
        'li',
        { className: 'ds-c-autocomplete__list-item--message' },
        this.props.noResultsMessage
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(getInputProps) {
      var _this3 = this;

      // Extend props on the TextField, by passing them through
      // Downshift's `getInputProps` method
      return _react2.default.Children.map(this.props.children, function (child) {
        if (isTextField(child)) {
          var propOverrides = {
            'aria-controls': _this3.listboxId,
            id: _this3.id,
            onBlur: child.props.onBlur,
            onChange: child.props.onChange,
            onKeyDown: child.props.onKeyDown
          };

          return _react2.default.cloneElement(child, getInputProps(propOverrides));
        }

        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          ariaClearLabel = _props.ariaClearLabel,
          clearInputText = _props.clearInputText,
          items = _props.items,
          label = _props.label,
          loading = _props.loading,
          children = _props.children,
          autocompleteProps = _objectWithoutProperties(_props, ['ariaClearLabel', 'clearInputText', 'items', 'label', 'loading', 'children']);

      return _react2.default.createElement(_downshift2.default, _extends({
        render: function render(_ref) {
          var clearSelection = _ref.clearSelection,
              getInputProps = _ref.getInputProps,
              getItemProps = _ref.getItemProps,
              highlightedIndex = _ref.highlightedIndex,
              inputValue = _ref.inputValue,
              isOpen = _ref.isOpen;
          return _react2.default.createElement(
            'div',
            { className: 'ds-u-clearfix ds-c-autocomplete' },
            _this4.renderChildren(getInputProps),
            isOpen && (loading || items) ? _react2.default.createElement(
              'div',
              { className: 'ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list' },
              label && !loading && _react2.default.createElement(
                'h5',
                {
                  className: 'ds-u-margin--0 ds-u-padding--1',
                  id: _this4.labelId
                },
                label
              ),
              _react2.default.createElement(
                'ul',
                {
                  'aria-labelledby': label ? _this4.labelId : null,
                  className: 'ds-c-list--bare',
                  id: _this4.listboxId,
                  role: 'listbox'
                },
                _this4.filterItems(items, inputValue, getInputProps, getItemProps, highlightedIndex)
              )
            ) : null,
            _react2.default.createElement(
              _Button2.default,
              {
                'aria-label': ariaClearLabel,
                className: 'ds-u-float--right ds-u-padding-right--0',
                onClick: clearSelection,
                size: 'small',
                variation: 'transparent'
              },
              clearInputText
            )
          );
        }
      }, autocompleteProps));
    }
  }]);

  return Autocomplete;
}(_react2.default.PureComponent);

Autocomplete.defaultProps = {
  ariaClearLabel: 'Clear typeahead and search again',
  clearInputText: 'Clear search',
  itemToString: function itemToString(item) {
    return item ? item.name : '';
  },
  loadingMessage: 'Loading...',
  noResultsMessage: 'No results'
};

Autocomplete.propTypes = {
  /**
   * Screenreader-specific label for the Clear search `<button>`. Intended to provide a longer, more descriptive explanation of the button's behavior.
   */
  ariaClearLabel: _propTypes2.default.string,
  children: _propTypes2.default.node,
  /**
   * Clear search text that will appear on the page as part of the rendered `<button>` component
   */
  clearInputText: _propTypes2.default.node,
  /**
   * Used to determine the string value for the selected item (which is used to compute the `inputValue`).
   *
   * Also see: https://github.com/paypal/downshift#itemtostring
   */
  itemToString: _propTypes2.default.func,
  /**
   * Array of objects used to populate the suggestion list that appears below the input as users type. This array of objects is intended for an async data callback, and should conform to the prescribed shape to avoid errors.
   */
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string,
    name: _propTypes2.default.string
  })),
  /**
   * Adds a heading to the top of the autocomplete list. This can be used to convey to the user that they're required to select an option from the autocomplete list.
   */
  label: _propTypes2.default.node,
  /**
   * Can be called when the `items` array is being fetched remotely, or will be delayed for more than 1-2 seconds.
   */
  loading: _propTypes2.default.bool,
  /**
   * Message users will see when the `loading` prop is passed to `Autocomplete`.
   */
  loadingMessage: _propTypes2.default.node,
  /**
   * Message users will see when the `items` array returns empty and the `loading` prop is passed to `<Autocomplete />`.
   */
  noResultsMessage: _propTypes2.default.node,
  /**
   * Called when the user selects an item and the selected item has changed. Called with the item that was selected and the new state.
   *
   * Also see: https://github.com/paypal/downshift#onchange
   */
  onChange: _propTypes2.default.func,
  /**
   * Called when the child `TextField` value changes. Returns a String `inputValue`.
   *
   * Also see: https://github.com/paypal/downshift#oninputvaluechange
   */
  onInputValueChange: _propTypes2.default.func
};

exports.default = Autocomplete;