'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StepLink = require('./StepLink');

var _StepLink2 = _interopRequireDefault(_StepLink);

var _SubStep = require('./SubStep');

var _SubStep2 = _interopRequireDefault(_SubStep);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _StepList = require('./StepList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Step = function Step(_ref) {
  var step = _ref.step,
      props = _objectWithoutProperties(_ref, ['step']);

  var start = step.isNextStep;
  var resume = step.started && !step.completed;
  var className = (0, _classnames2.default)('ds-c-step', {
    'ds-c-step--current': start || resume,
    'ds-c-step--completed': step.completed
  });
  var contentClassName = (0, _classnames2.default)('ds-c-step__content', {
    'ds-c-step__content--with-content': step.description || step.steps
  });
  var actionsLabelText = props.actionsLabelText,
      substepsLabelText = props.substepsLabelText,
      descriptionLabelText = props.descriptionLabelText;

  var actionsLabel = actionsLabelText.replace('%{step}', step.title);
  var substepsLabel = substepsLabelText.replace('%{step}', step.title);
  var descriptionLabel = descriptionLabelText.replace('%{step}', step.title);
  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: contentClassName },
      _react2.default.createElement(
        'h2',
        { className: 'ds-c-step__title' },
        step.title
      ),
      step.description && _react2.default.createElement(
        'div',
        { className: 'ds-c-step__description', 'aria-label': descriptionLabel },
        step.description
      ),
      step.steps && _react2.default.createElement(
        'ol',
        { className: 'ds-c-step__substeps', 'aria-label': substepsLabel },
        step.steps.map(function (s, i) {
          return _react2.default.createElement(_SubStep2.default, _extends({ step: s, key: s.id || i }, props));
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'ds-c-step__actions', 'aria-label': actionsLabel },
      step.completed && _react2.default.createElement(
        'div',
        { className: 'ds-c-step__completed-text' },
        props.completedText
      ),
      step.completed && !step.steps && _react2.default.createElement(
        _StepLink2.default,
        {
          href: step.href,
          stepId: step.id,
          screenReaderText: '"' + step.title + '"',
          onClick: props.onStepLinkClick
        },
        props.editText
      ),
      start && _react2.default.createElement(
        _StepLink2.default,
        {
          href: step.href,
          stepId: step.id,
          screenReaderText: '"' + step.title + '"',
          onClick: props.onStepLinkClick,
          className: 'ds-c-button ds-c-button--primary'
        },
        props.startText
      ),
      resume && _react2.default.createElement(
        _StepLink2.default,
        {
          href: step.href,
          stepId: step.id,
          screenReaderText: '"' + step.title + '"',
          onClick: props.onStepLinkClick,
          className: 'ds-c-button ds-c-button--primary'
        },
        props.resumeText
      )
    )
  );
};

exports.Step = Step;
Step.propTypes = {
  step: _propTypes2.default.shape(_StepList.stepShape).isRequired,
  onStepLinkClick: _propTypes2.default.func,
  showSubSubSteps: _propTypes2.default.bool,
  completedText: _propTypes2.default.string.isRequired,
  editText: _propTypes2.default.string.isRequired,
  resumeText: _propTypes2.default.string.isRequired,
  startText: _propTypes2.default.string.isRequired,
  actionsLabelText: _propTypes2.default.string.isRequired,
  descriptionLabelText: _propTypes2.default.string.isRequired,
  substepsLabelText: _propTypes2.default.string.isRequired
};

exports.default = Step;