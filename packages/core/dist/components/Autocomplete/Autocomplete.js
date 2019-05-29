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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://www.levelaccess.com/differences-aria-1-0-1-1-changes-rolecombobox/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://www.digitala11y.com/aria-autocomplete-properties/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * We have opted to retain the ARIA 1.0 markup pattern for comboboxes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This was done because the ARIA 1.1 markup pattern triggers a different
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * behavior on containers with a role="combobox" attribute. WCAG refers to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this as a composite widget: https://www.w3.org/TR/wai-aria-1.1/#h-composite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Our testing with screen readers, specifically JAWS, has been the deciding
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * factor in going back to the ARIA 1.0 markup pattern. There were a number
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of conflicting interactions using the 1.1 markup pattern that felt like
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * an unacceptable regression of the user experience.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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

    _this.id = _this.props.id || (0, _lodash2.default)('autocomplete_');
    _this.labelId = _this.props.labelId || (0, _lodash2.default)('autocomplete_label_');
    _this.listboxId = (0, _lodash2.default)('autocomplete_owned_listbox_');
    _this.listboxContainerId = (0, _lodash2.default)('autocomplete_owned_container_');
    _this.listboxHeadingId = (0, _lodash2.default)('autocomplete_header_');
    _this.loader = null;
    return _this;
  }

  _createClass(Autocomplete, [{
    key: 'filterItems',
    value: function filterItems(items, inputValue, getInputProps, getItemProps, highlightedIndex) {
      var _this2 = this;

      // If we have results, create a mapped list
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

      // If we're waiting for results to load, show the non-selected message
      if (this.props.loading) {
        return _react2.default.createElement(
          'li',
          {
            'aria-selected': 'false',
            className: 'ds-c-autocomplete__list-item--message',
            role: 'option'
          },
          this.props.loadingMessage
        );
      }

      // If we have no results, show the non-selected message
      return _react2.default.createElement(
        'li',
        {
          'aria-selected': 'false',
          className: 'ds-c-autocomplete__list-item--message',
          role: 'option'
        },
        this.props.noResultsMessage
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(getInputProps, listboxOpen) {
      var _this3 = this;

      var isOpen = listboxOpen;
      // Extend props on the TextField, by passing them
      // through Downshift's `getInputProps` method
      return _react2.default.Children.map(this.props.children, function (child) {
        if (isTextField(child)) {
          var propOverrides = {
            'aria-autocomplete': 'list',
            'aria-controls': isOpen ? _this3.listboxId : null,
            'aria-expanded': isOpen,
            'aria-labelledby': null,
            'aria-owns': isOpen ? _this3.listboxId : null,
            autoComplete: _this3.props.autoCompleteLabel,
            focusTrigger: _this3.props.focusTrigger,
            id: _this3.id,
            labelId: _this3.labelId,
            onBlur: child.props.onBlur,
            onChange: child.props.onChange,
            onKeyDown: child.props.onKeyDown,
            role: 'combobox'
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
          className = _props.className,
          clearSearchButton = _props.clearSearchButton,
          autocompleteProps = _objectWithoutProperties(_props, ['ariaClearLabel', 'clearInputText', 'items', 'label', 'loading', 'children', 'className', 'clearSearchButton']);

      // See https://github.com/downshift-js/downshift#getrootprops
      // Custom container returns a plain div, without the ARIA markup
      // required for a WAI-ARIA 1.1 combobox. See the comments at the
      // top of the component file for an explanation of this decision.


      var MyDiv = function MyDiv(_ref) {
        var innerRef = _ref.innerRef,
            rest = _objectWithoutProperties(_ref, ['innerRef']);

        return _react2.default.createElement('div', _extends({ ref: innerRef }, rest));
      };

      var rootClassName = (0, _classnames2.default)('ds-u-clearfix', 'ds-c-autocomplete', className);

      return _react2.default.createElement(
        _downshift2.default,
        autocompleteProps,
        function (_ref2) {
          var clearSelection = _ref2.clearSelection,
              getInputProps = _ref2.getInputProps,
              getItemProps = _ref2.getItemProps,
              getRootProps = _ref2.getRootProps,
              highlightedIndex = _ref2.highlightedIndex,
              inputValue = _ref2.inputValue,
              isOpen = _ref2.isOpen;
          return _react2.default.createElement(
            MyDiv,
            getRootProps({
              'aria-expanded': null,
              'aria-haspopup': null,
              'aria-labelledby': null,
              'aria-owns': null,
              className: rootClassName,
              refKey: 'innerRef',
              role: null
            }),
            _this4.renderChildren(getInputProps, isOpen),
            isOpen && (loading || items) ? _react2.default.createElement(
              'div',
              {
                className: 'ds-u-border--1 ds-u-padding--1 ds-c-autocomplete__list',
                id: _this4.listboxContainerId
              },
              label && !loading && _react2.default.createElement(
                'h5',
                {
                  className: 'ds-u-margin--0 ds-u-padding--1',
                  id: _this4.listboxHeadingId
                },
                label
              ),
              _react2.default.createElement(
                'ul',
                {
                  'aria-labelledby': label ? _this4.listboxHeadingId : null,
                  className: 'ds-c-list--bare',
                  id: _this4.listboxId,
                  role: 'listbox'
                },
                _this4.filterItems(items, inputValue, getInputProps, getItemProps, highlightedIndex)
              )
            ) : null,
            clearSearchButton && _react2.default.createElement(
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
      );
    }
  }]);

  return Autocomplete;
}(_react2.default.PureComponent);

Autocomplete.defaultProps = {
  ariaClearLabel: 'Clear typeahead and search again',
  autoCompleteLabel: 'off',
  clearInputText: 'Clear search',
  clearSearchButton: true,
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
  /**
   * Control the `TextField` autocomplete attribute. Changed to "off" to support accessibility. Chrome 70 appears to support this correct behavior in early testing.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
   */
  autoCompleteLabel: _propTypes2.default.string,
  children: _propTypes2.default.node,
  /**
   * Additional classes to be added to the root element.
   * Useful for adding utility classes.
   */
  className: _propTypes2.default.string,
  /**
   * Text rendered on the page if `clearInput` prop is passed. Default is "Clear search".
   */
  clearInputText: _propTypes2.default.node,
  /**
   * Removes the Clear search button when set to `false`
   */
  clearSearchButton: _propTypes2.default.bool,
  /**
   * Used to focus child `TextField` on `componentDidMount()`
   */
  focusTrigger: _propTypes2.default.bool,
  /**
   * A unique id to be passed to the child `TextField`. If no id is passed as a prop,
   * the `Autocomplete` component will auto-generate one. This prop was provided in cases
   * where an id might need to be passed to multiple components, such as the `htmlFor`
   * attribute on a label and the id of an input.
   */
  id: _propTypes2.default.string,
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
   * A unique `id` to be used on the child `TextField` label tag
   */
  labelId: _propTypes2.default.string,
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