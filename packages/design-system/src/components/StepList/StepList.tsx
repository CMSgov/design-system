import React from 'react';
import Step, { StepObject } from './Step';
import { StepLinkProps } from './StepLink';

export interface StepListProps {
  /**
   * An array of [step objects]({{root}}/patterns/step-list/#patterns.step-list.step-object) that contain
   * text, state, [link/button URLs]({{root}}/patterns/step-list/#patterns.step-list.buttons) and other info needed to render steps.
   */
  steps: StepObject[];
  /**
   * When provided, this will render the passed in component for all link elements. This is useful when
   * integrating with React Router's `<Link>` or using your own custom component.
   * If more specific control is needed, each `step` object also accepts a `component` prop.
   */
  component?: StepLinkProps['component'];
  /**
   * Whether or not to render a substep's substeps.
   */
  showSubSubSteps?: boolean;
  /**
   * Function called when a step's Edit, Start, or Resume button/link is
   * clicked. The step's `href` property will be passed as a parameter.
   */
  onStepLinkClick?: StepLinkProps['onClick'];
  completedText?: string;
  editText?: string;
  resumeText?: string;
  startText?: string;
  /**
   * A template string for the aria-label describing a step's actions where
   * the substring `%{step}` is replaced with that step's `heading`.
   */
  actionsLabelText?: string;
  /**
   * A template string for the aria-label describing a step's substeps where
   * the substring `%{step}` is replaced with that step's `heading`.
   */
  substepsLabelText?: string;
}

export const StepList = ({
  steps,
  component,
  showSubSubSteps = false,
  completedText = 'Completed',
  editText = 'Edit',
  resumeText = 'Resume',
  startText = 'Start',
  ...otherProps
}: StepListProps) => (
  <ol role="list" className="ds-c-step-list">
    {steps.map((step, i) => (
      <Step
        step={{ ...step, ...{ component: component || step.component } }}
        key={step.id || i}
        {...{
          showSubSubSteps,
          completedText,
          editText,
          resumeText,
          startText,
          ...otherProps,
        }}
      />
    ))}
  </ol>
);

export default StepList;
