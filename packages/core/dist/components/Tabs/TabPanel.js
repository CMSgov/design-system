'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabPanel = TabPanel;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A `TabPanel` is a presentational component which accepts a tab's content as
 * its `children`.
 */
function TabPanel(props) {
  var classes = (0, _classnames2.default)('ds-c-tabs__panel', props.className);

  return _react2.default.createElement(
    'div',
    {
      'aria-labelledby': props.tabId,
      'aria-hidden': String(!props.selected),
      className: classes,
      id: props.id,
      role: 'tabpanel'
    },
    props.children
  );
}

TabPanel.defaultProps = {
  selected: false
};

TabPanel.propTypes = {
  children: _propTypes2.default.node.isRequired,
  /**
   * Additional classes to be added to the root element.
   */
  className: _propTypes2.default.string,
  /**
   * A unique `id`, to be used on the rendered panel element.
   */
  id: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.bool,
  /* eslint-disable react/no-unused-prop-types */
  /**
   * The associated tab's label. Only applicable when the panel is a
   * child of `Tabs`.
   */
  tab: _propTypes2.default.string,
  /**
   * Additional classes for the associated tab. Only applicable when the panel
   * is a child of `Tabs`.
   */
  tabClassName: _propTypes2.default.string,
  /**
   * The associated tab's `href`. Only applicable when the panel is a
   * child of `Tabs`.
   */
  tabHref: _propTypes2.default.string,
  /* eslint-enable react/no-unused-prop-types */
  // tabId is actually required, but it's not marked here since we generate
  // this id within the Tabs component. Otherwise React will yell at you even
  // though it's ultimately being passed in.
  /**
   * The `id` of the associated `Tab`. Used for the `aria-labelledby` attribute.
   */
  tabId: _propTypes2.default.string
};

exports.default = TabPanel;