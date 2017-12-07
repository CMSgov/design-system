'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stepShape = exports.StepList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * The `StepList` component is the preferred method for building a step list,
 * since it handles all the state logic necessary to produce its markup. A
 * step is represented by an object with text, progress, and routing information
 * and can optionally include an array of substeps as well as a description.
 */
var StepList = function StepList(_ref) {
  var steps = _ref.steps,
      props = _objectWithoutProperties(_ref, ['steps']);

  return _react2.default.createElement(
    'ol',
    { className: 'ds-c-step-list ds-u-margin-top--4' },
    steps.map(function (step, i) {
      return _react2.default.createElement(_Step2.default, _extends({ step: step, key: step.id || i }, props));
    })
  );
};

// Define the shape of a single step so we can recursively define the shape
// as well as reuse it in multiple components' prop-type definitions. This
// has to be in this file or else the docs generator will break.
exports.StepList = StepList;
var stepShape = exports.stepShape = {
  id: _propTypes2.default.string,
  href: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string,
  completed: _propTypes2.default.bool,
  started: _propTypes2.default.bool,
  isNextStep: _propTypes2.default.bool
};
stepShape.steps = _propTypes2.default.arrayOf(_propTypes2.default.shape(stepShape));

StepList.defaultProps = {
  showSubSubSteps: false,
  completedText: 'Completed',
  editText: 'Edit',
  resumeText: 'Resume',
  startText: 'Start',
  actionsLabelText: 'Primary actions for %{step}',
  descriptionLabelText: 'Description for %{step}',
  substepsLabelText: 'Secondary actions for %{step}'
};

StepList.propTypes = {
  /**
   * An array of step objects that contain information needed to render
   * them like text, state, and link/button URLs.
   * See [Start, Resume, and Edit links]({{root}}/patterns/step-list/#patterns.step-list.buttons)
   * and [Step object]({{root}}/patterns/step-list/#patterns.step-list.step-object)
   */
  steps: _propTypes2.default.arrayOf(_propTypes2.default.shape(stepShape)).isRequired,
  /**
   * Whether or not to render a substep's substeps.
   */
  showSubSubSteps: _propTypes2.default.bool,
  /**
   * Function called when a step's Edit, Start, or Resume button/link is
   * clicked. The step's `href` property will be passed as a parameter.
   */
  onStepLinkClick: _propTypes2.default.func,
  completedText: _propTypes2.default.string.isRequired,
  editText: _propTypes2.default.string.isRequired,
  resumeText: _propTypes2.default.string.isRequired,
  startText: _propTypes2.default.string.isRequired,
  /**
   * A template string for the aria-label describing a step's actions where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  actionsLabelText: _propTypes2.default.string.isRequired,
  /**
   * A template string for the aria-label for a step's description where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  descriptionLabelText: _propTypes2.default.string.isRequired,
  /**
   * A template string for the aria-label describing a step's substeps where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  substepsLabelText: _propTypes2.default.string.isRequired
};

exports.default = StepList;