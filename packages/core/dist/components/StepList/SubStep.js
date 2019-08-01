'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubStep = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StepLink = require('./StepLink');

var _StepLink2 = _interopRequireDefault(_StepLink);

var _StepList = require('./StepList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SubStep = function SubStep(_ref) {
  var step = _ref.step,
      props = _objectWithoutProperties(_ref, ['step']);

  return _react2.default.createElement(
    'li',
    { className: 'ds-c-substep' },
    _react2.default.createElement(
      'div',
      { className: 'ds-c-substep__title' },
      step.title
    ),
    step.completed && _react2.default.createElement(
      _StepLink2.default,
      {
        href: step.href,
        stepId: step.id,
        screenReaderText: '"' + step.title + '"',
        onClick: props.onStepLinkClick,
        className: 'ds-c-substep__edit'
      },
      props.editText
    ),
    step.steps && props.showSubSubSteps && _react2.default.createElement(
      'ul',
      null,
      step.steps.map(function (s, i) {
        return _react2.default.createElement(SubStep, _extends({ step: s, key: s.id || i }, props));
      })
    )
  );
};

exports.SubStep = SubStep;
SubStep.propTypes = {
  step: _propTypes2.default.shape(_StepList.stepShape).isRequired,
  onStepLinkClick: _propTypes2.default.func,
  showSubSubSteps: _propTypes2.default.bool,
  editText: _propTypes2.default.string.isRequired
};

exports.default = SubStep;