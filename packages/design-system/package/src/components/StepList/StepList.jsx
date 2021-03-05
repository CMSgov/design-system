import PropTypes from 'prop-types';
import React from 'react';
import Step from './Step';

export const StepList = ({ steps, ...props }) => (
  <ol className="ds-c-step-list ds-u-margin-top--4">
    {steps.map((step, i) => (
      <Step
        step={{ ...step, ...{ component: props.component || step.component } }}
        key={step.id || i}
        {...props}
      />
    ))}
  </ol>
);

StepList.defaultProps = {
  showSubSubSteps: false,
  completedText: 'Completed',
  editText: 'Edit',
  resumeText: 'Resume',
  startText: 'Start',
  actionsLabelText: 'Primary actions for %{step}',
  descriptionLabelText: 'Description for %{step}',
  substepsLabelText: 'Secondary actions for %{step}',
};

StepList.propTypes = {
  /**
   * An array of [step objects]({{root}}/patterns/step-list/#patterns.step-list.step-object) that contain
   * text, state, [link/button URLs]({{root}}/patterns/step-list/#patterns.step-list.buttons) and other info needed to render steps.
   */
  steps: PropTypes.arrayOf(PropTypes.shape).isRequired,
  /**
   * When provided, this will render the passed in component for all link elements. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   * If more specific control is needed, each `step` object also accepts a `component` prop.
   */
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType, PropTypes.func]),
  /**
   * Whether or not to render a substep's substeps.
   */
  showSubSubSteps: PropTypes.bool,
  /**
   * Function called when a step's Edit, Start, or Resume button/link is
   * clicked. The step's `href` property will be passed as a parameter.
   */
  onStepLinkClick: PropTypes.func,
  completedText: PropTypes.string,
  editText: PropTypes.string,
  resumeText: PropTypes.string,
  startText: PropTypes.string,
  /**
   * A template string for the aria-label describing a step's actions where
   * the substring `%{step}` is replaced with that step's `heading`.
   */
  actionsLabelText: PropTypes.string,
  /**
   * A template string for the aria-label for a step's description where
   * the substring `%{step}` is replaced with that step's `heading`.
   */
  descriptionLabelText: PropTypes.string,
  /**
   * A template string for the aria-label describing a step's substeps where
   * the substring `%{step}` is replaced with that step's `heading`.
   */
  substepsLabelText: PropTypes.string,
};

export default StepList;
