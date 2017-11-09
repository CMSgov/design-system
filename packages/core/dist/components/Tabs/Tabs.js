'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('core-js/fn/array/find-index');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabPanel = require('./TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** CONSTANTS
 * Adding in the constant values for keycodes
 * to handle onKeyDown events
 */
var LEFT_ARROW = 'ArrowLeft';
var RIGHT_ARROW = 'ArrowRight';

/**
 * Get the id of the first TabPanel child
 * @param {Object} props
 * @return {String} The id
 */
function getDefaultSelectedId(props) {
  var selectedId = void 0;

  // TODO: Use the panelChildren method to pass in an array
  // of panels, instead of doing it here...
  _react2.default.Children.forEach(props.children, function (child) {
    if (isTabPanel(child) && !selectedId) {
      selectedId = child.props.id;
    }
  });

  return selectedId;
}

/**
 * Generate an id for a panel's associated tab if one doesn't yet exist
 * @param {Object} TabPanel component
 * @return {String} Tab ID
 */
function panelTabId(panel) {
  return panel.props.tabId || 'ds-c-tabs__item--' + panel.props.id;
}

/**
 * Determine if a React component is a TabPanel
 * @param {React.Node} child - a React component
 * @return {Boolean} Is this a TabPanel component?
 */
function isTabPanel(child) {
  return child != null && child.type === _TabPanel2.default;
}

/**
 * `Tabs` is a container component that manages the state of your tabs for you.
 * In most cases, you'll want to use this component rather than the presentational
 * components (`Tab`, `TabPanel`) on their own.
 */

var Tabs = exports.Tabs = function (_React$PureComponent) {
  _inherits(Tabs, _React$PureComponent);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    var selectedId = void 0;

    if ('defaultSelectedId' in props) {
      selectedId = props.defaultSelectedId;
    } else {
      selectedId = getDefaultSelectedId(props);
    }

    _this.handleTabClick = _this.handleTabClick.bind(_this);
    _this.handleTabKeyDown = _this.handleTabKeyDown.bind(_this);
    _this.state = { selectedId: selectedId };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_, prevState) {
      if (this.state.selectedId !== prevState.selectedId) {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selectedId, prevState.selectedId);
        }
        this.tabs[this.state.selectedId].focus();
        this.replaceState(this.tabs[this.state.selectedId].href);
      }
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(evt, panelId) {
      evt.preventDefault();
      this.setState({ selectedId: panelId });
    }
  }, {
    key: 'handleTabKeyDown',
    value: function handleTabKeyDown(evt, panelId) {
      var tabs = this.panelChildren();
      var tabIndex = tabs.findIndex(function (elem) {
        return elem.props.id === panelId;
      });
      var target = void 0;

      switch (evt.key) {
        case LEFT_ARROW:
          evt.preventDefault();
          if (tabIndex === 0) {
            target = tabs[tabs.length - 1].props.id;
          } else {
            target = tabs[tabIndex - 1].props.id;
          }
          this.setState({ selectedId: target });
          break;
        case RIGHT_ARROW:
          evt.preventDefault();
          if (tabIndex === tabs.length - 1) {
            target = tabs[0].props.id;
          } else {
            target = tabs[tabIndex + 1].props.id;
          }
          this.setState({ selectedId: target });
          break;
        default:
          break;
      }
    }

    /**
     * Filter children and return only TabPanel components
     */

  }, {
    key: 'panelChildren',
    value: function panelChildren() {
      return _react2.default.Children.toArray(this.props.children).filter(isTabPanel);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      return _react2.default.Children.map(this.props.children, function (child) {
        if (isTabPanel(child)) {
          // Extend props on panels before rendering. Also removes any props
          // that don't need passed into TabPanel but are used to generate
          // the Tab components
          return _react2.default.cloneElement(child, {
            selected: _this2.state.selectedId === child.props.id,
            tab: undefined,
            tabHref: undefined,
            tabId: panelTabId(child)
          });
        }

        return child;
      });
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs() {
      var _this3 = this;

      var panels = this.panelChildren();
      var listClasses = (0, _classnames2.default)('ds-c-tabs', this.props.tablistClassName);

      this.tabs = {};

      var tabs = panels.map(function (panel) {
        return _react2.default.createElement(
          _Tab2.default,
          {
            className: panel.props.tabClassName,
            href: panel.props.tabHref,
            id: panelTabId(panel),
            key: panel.key,
            onClick: _this3.handleTabClick,
            onKeyDown: _this3.handleTabKeyDown,
            panelId: panel.props.id,
            ref: function ref(tab) {
              _this3.tabs[panel.props.id] = tab;
            },
            selected: _this3.state.selectedId === panel.props.id
          },
          panel.props.tab
        );
      });

      return _react2.default.createElement(
        'div',
        { className: listClasses, role: 'tablist' },
        tabs
      );
    }

    /**
     * Update the URL in the browser without adding a new entry to the history.
     * @param {String} url - Absolute or relative URL
     */

  }, {
    key: 'replaceState',
    value: function replaceState(url) {
      if (window.history) {
        window.history.replaceState({}, document.title, url);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderTabs(),
        this.renderChildren()
      );
    }
  }]);

  return Tabs;
}(_react2.default.PureComponent);

Tabs.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Sets the initial selected `TabPanel` state. If this isn't set, the first
   * `TabPanel` will be selected.
   */
  defaultSelectedId: _propTypes2.default.string,
  /**
   * A callback function that's invoked when the selected tab is changed.
   * `(selectedId, prevSelectedId) => void`
   */
  onChange: _propTypes2.default.func,
  /**
   * Additional classes to be added to the component wrapping the tabs
   */
  tablistClassName: _propTypes2.default.string
};

exports.default = Tabs;