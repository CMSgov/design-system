import PropTypes from 'prop-types';
import React from 'react';
import Step from './Step';

/**
 * The `StepList` component is the preferred method for building a step list,
 * since it handles all the state logic necessary to produce its markup. A
 * step is represented by an object with text, progress, and routing information
 * and can optionally include an array of substeps as well as a description.
 */
export const StepList = ({ steps, ...props }) => (
  <ol className="ds-c-step-list ds-u-margin-top--4">
    {steps.map((step, i) => <Step step={step} key={step.id || i} {...props} />)}
  </ol>
);

// Define the shape of a single step so we can recursively define the shape
// as well as reuse it in multiple components' prop-type definitions. This
// has to be in this file or else the docs generator will break.
export const stepShape = {
  id: PropTypes.string,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool,
  started: PropTypes.bool,
  isNextStep: PropTypes.bool
};
stepShape.steps = PropTypes.arrayOf(PropTypes.shape(stepShape));

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
  steps: PropTypes.arrayOf(PropTypes.shape(stepShape)).isRequired,
  /**
   * Whether or not to render a substep's substeps.
   */
  showSubSubSteps: PropTypes.bool,
  /**
   * Function called when a step's Edit, Start, or Resume button/link is
   * clicked. The step's `href` property will be passed as a parameter.
   */
  onStepLinkClick: PropTypes.func,
  completedText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  resumeText: PropTypes.string.isRequired,
  startText: PropTypes.string.isRequired,
  /**
   * A template string for the aria-label describing a step's actions where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  actionsLabelText: PropTypes.string.isRequired,
  /**
   * A template string for the aria-label for a step's description where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  descriptionLabelText: PropTypes.string.isRequired,
  /**
   * A template string for the aria-label describing a step's substeps where
   * the substring `%{step}` is replaced with that step's `title`.
   */
  substepsLabelText: PropTypes.string.isRequired
};

export default StepList;
