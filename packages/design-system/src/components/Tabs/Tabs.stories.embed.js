function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import { Tabs as TabsComponent } from "./Tabs";
import TabPanel from "./TabPanel";
import { action } from "../../../../../scripts/mock-storybook/mocks/addon-actions";
import { useArgs } from "../../../../../scripts/mock-storybook/mocks/preview-api";
var meta = {
  title: 'Components/Tabs',
  component: TabsComponent
};
export default meta;
var tabPanels = [/*#__PURE__*/React.createElement(TabPanel, {
  key: "summary",
  id: "summary",
  tab: "Summary"
}, "The Bill of Rights is the first ten amendments to the United States Constitution."), /*#__PURE__*/React.createElement(TabPanel, {
  key: "preamble",
  id: "preamble",
  tab: "Preamble"
}, "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."), /*#__PURE__*/React.createElement(TabPanel, {
  key: "amendments",
  id: "amendments",
  tab: "Amendments"
}, /*#__PURE__*/React.createElement("h2", {
  className: "ds-h4"
}, "Bill of Rights"), /*#__PURE__*/React.createElement("ol", {
  className: "ds-c-list"
}, /*#__PURE__*/React.createElement("li", null, "Freedoms, Petitions, Assembly"), /*#__PURE__*/React.createElement("li", null, "Right to bear arms"), /*#__PURE__*/React.createElement("li", null, "Quartering of soldiers"), /*#__PURE__*/React.createElement("li", null, "Search and arrest"), /*#__PURE__*/React.createElement("li", null, "Rights in criminal cases"), /*#__PURE__*/React.createElement("li", null, "Right to a fair trial"), /*#__PURE__*/React.createElement("li", null, "Rights in civil cases"), /*#__PURE__*/React.createElement("li", null, "Bail, fines, punishment"), /*#__PURE__*/React.createElement("li", null, "Rights retained by the People"), /*#__PURE__*/React.createElement("li", null, "States\u2019 rights")), /*#__PURE__*/React.createElement("h2", {
  className: "ds-h4"
}, "Later Amendments"), /*#__PURE__*/React.createElement("ol", {
  className: "ds-c-list",
  start: 11
}, /*#__PURE__*/React.createElement("li", null, "Lawsuits against states"), /*#__PURE__*/React.createElement("li", null, "Presidential elections"), /*#__PURE__*/React.createElement("li", null, "Abolition of slavery"), /*#__PURE__*/React.createElement("li", null, "Civil rights"), /*#__PURE__*/React.createElement("li", null, "Black suffrage"), /*#__PURE__*/React.createElement("li", null, "Income taxes"), /*#__PURE__*/React.createElement("li", null, "Senatorial elections"), /*#__PURE__*/React.createElement("li", null, "Prohibition of liquor"), /*#__PURE__*/React.createElement("li", null, "Women\u2019s suffrage"), /*#__PURE__*/React.createElement("li", null, "Terms of office"), /*#__PURE__*/React.createElement("li", null, "Repeal of Prohibition"), /*#__PURE__*/React.createElement("li", null, "Term Limits for the Presidency"), /*#__PURE__*/React.createElement("li", null, "Washington, D.C., suffrage"), /*#__PURE__*/React.createElement("li", null, "Abolition of poll taxes"), /*#__PURE__*/React.createElement("li", null, "Presidential succession"), /*#__PURE__*/React.createElement("li", null, "18-year-old suffrage"), /*#__PURE__*/React.createElement("li", null, "Congressional pay raises")))];
export var Default = {
  render: function Component(args) {
    return /*#__PURE__*/React.createElement(TabsComponent, args, tabPanels);
  }
};
export var Disabled = {
  render: function Component(args) {
    return /*#__PURE__*/React.createElement(TabsComponent, args, /*#__PURE__*/React.createElement(TabPanel, {
      id: "summary",
      tab: "Summary"
    }, "The Bill of Rights is the first ten amendments to the United States Constitution."), /*#__PURE__*/React.createElement(TabPanel, {
      id: "preamble",
      tab: "Preamble"
    }, "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America."), /*#__PURE__*/React.createElement(TabPanel, {
      id: "disabled",
      tab: "Disabled",
      disabled: true
    }, "You should not see this."));
  }
};
export var Controlled = {
  render: function Component(args) {
    var _useArgs = useArgs(),
      _useArgs2 = _slicedToArray(_useArgs, 2),
      selectedId = _useArgs2[0].selectedId,
      updateArgs = _useArgs2[1];
    var onChange = function onChange(selectedId, prevSelectedId) {
      action('onChange')(selectedId, prevSelectedId);
      updateArgs({
        selectedId: selectedId
      });
    };
    return /*#__PURE__*/React.createElement(TabsComponent, _extends({}, args, {
      selectedId: selectedId,
      onChange: onChange
    }), tabPanels);
  }
};