function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import Dropdown from "./Dropdown";
import { action } from "../../../../../scripts/mock-storybook/mocks/addon-actions";
import { useArgs } from "../../../../../scripts/mock-storybook/mocks/preview-api";
var meta = {
  title: 'Components/Dropdown',
  component: Dropdown
};
export default meta;
var dropdownOptions = [{
  label: '- Select an option -',
  value: ''
}, {
  label: 'Confederated Tribes and Bands of the Yakama Nation',
  value: '1'
}, {
  label: 'Confederated Tribes of the Chehalis Reservation',
  value: '2'
}, {
  label: 'Confederated Tribes of the Colville Reservation',
  value: '3'
}, {
  label: 'Cowlitz Indian Tribe',
  value: '4'
}, {
  label: 'Hoh Indian Tribe (formerly the Hoh Indian Tribe of the Hoh Indian Reservation)',
  value: '5'
}, {
  label: 'Nisqually Indian Tribe (formerly the Nisqually Indian Tribe of the Nisqually Reservation)',
  value: '6'
}, {
  label: 'Lummi Tribe of the Lummi Reservation',
  value: '7'
}];
var htmlOptGroups = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("optgroup", {
  label: "Group A"
}, /*#__PURE__*/React.createElement("option", {
  value: "a-1"
}, "Option A-1"), /*#__PURE__*/React.createElement("option", {
  value: "a-2"
}, "Option A-2"), /*#__PURE__*/React.createElement("option", {
  value: "a-3"
}, "Option A-3")), /*#__PURE__*/React.createElement("optgroup", {
  label: "Group B"
}, /*#__PURE__*/React.createElement("option", {
  value: "b-1"
}, "Option B-1"), /*#__PURE__*/React.createElement("option", {
  value: "b-2"
}, "Option B-2"), /*#__PURE__*/React.createElement("option", {
  value: "b-3"
}, "Option B-3")));
var htmlOptions = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("option", {
  value: "1"
}, "Option 1"), /*#__PURE__*/React.createElement("option", {
  value: "2"
}, "Option 2"), /*#__PURE__*/React.createElement("option", {
  value: "3"
}, "Option 3"), /*#__PURE__*/React.createElement("option", {
  value: "4"
}, "Option 4"), /*#__PURE__*/React.createElement("option", {
  value: "5"
}, "Option 5"), /*#__PURE__*/React.createElement("option", {
  value: "6"
}, "Option 6"), /*#__PURE__*/React.createElement("option", {
  value: "7"
}, "Option 7"), /*#__PURE__*/React.createElement("option", {
  value: "8"
}, "Option 8"));
export var Default = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown example',
    name: 'dropdown_field'
  }
};
export var Component = Dropdown;
export var WithError = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Error example',
    name: 'error_dropdown_field'
  }
};
export var Disabled = {
  args: {
    options: dropdownOptions,
    label: 'Disabled example',
    disabled: true,
    name: 'disabled_dropdown_field'
  }
};
export var OptionGroups = {
  args: {
    options: [{
      label: 'Group A',
      options: [{
        value: 'a-1',
        label: 'Option A-1'
      }, {
        value: 'a-2',
        label: 'Option A-2'
      }, {
        value: 'a-3',
        label: 'Option A-3'
      }]
    }, {
      label: 'Group B',
      options: [{
        value: 'b-1',
        label: 'Option B-1'
      }, {
        value: 'b-2',
        label: 'Option B-2'
      }, {
        value: 'b-3',
        label: 'Option B-3'
      }]
    }],
    label: 'Option groups example',
    name: 'optgroups_dropdown_field'
  }
};
export var HtmlOptionGroups = {
  args: {
    options: undefined,
    label: 'Option group example',
    name: 'custom_dropdown_field',
    children: htmlOptGroups
  }
};
export var HtmlOptions = {
  args: {
    options: undefined,
    label: 'Option group example',
    name: 'custom_dropdown_field',
    children: htmlOptions
  }
};
export var InverseOption = {
  args: {
    options: dropdownOptions,
    errorMessage: 'Example error message',
    hint: 'Helpful hint text',
    label: 'Inverse example',
    name: 'inverse_dropdown_field',
    inversed: true
  },
  parameters: {
    // Must supply `layout: 'fullscreen'` when we use `onDark: true`
    onDark: true,
    layout: 'fullscreen'
  }
};
export var Controlled = {
  args: {
    options: dropdownOptions,
    label: 'Dropdown example',
    name: 'dropdown_field',
    value: '3'
  },
  render: function Component(args) {
    var _useArgs = useArgs(),
      _useArgs2 = _slicedToArray(_useArgs, 2),
      value = _useArgs2[0].value,
      updateArgs = _useArgs2[1];
    var onChange = function onChange(event) {
      action('onChange')(event);
      updateArgs({
        value: event.currentTarget.value
      });
    };
    return /*#__PURE__*/React.createElement(Dropdown, _extends({}, args, {
      value: value,
      onChange: onChange
    }));
  }
};