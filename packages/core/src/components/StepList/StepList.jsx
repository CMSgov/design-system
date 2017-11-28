import PropTypes from 'prop-types';
import React from 'react';
import Step from './Step';

/**
 * Hello
 */
export const StepList = ({ steps, ...props }) => (
  <ol className="ds-c-step-list ds-u-margin-top--4">
    {steps.map(step => <Step step={step} key={step.id} {...props} />)}
  </ol>
);

// Define the shape of a single step so we can recursively define the shape
// as well as reuse it in multiple components' prop-type definitions. This
// has to be in this file or else the docs generator will break.
export const stepShape = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  started: PropTypes.bool,
  isNextStep: PropTypes.bool,
  route: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};
stepShape.steps = PropTypes.arrayOf(PropTypes.shape(stepShape));

StepList.propTypes = {
  /**
   * An array of step objects that contain information needed to render
   * them like text, state, and link/button URLs (routes).
   */
  steps: PropTypes.arrayOf(PropTypes.shape(stepShape)).isRequired,
  /**
   * Function called when a step's Edit, Start, or Resume button/link is
   * clicked. The step's `route` property will be passed as a parameter.
   */
  onEnterStep: PropTypes.func.isRequired,
  completedText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  resumeText: PropTypes.string.isRequired,
  startText: PropTypes.string.isRequired
};

export default StepList;
