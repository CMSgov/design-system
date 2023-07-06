import React from 'react';
import Step, { StepObject } from './Step';
import { StepLinkProps } from './StepLink';

export interface StepListProps {
  /**
   * An array of `StepObjects` that contain text, state, link URLs, and other
   * info needed to render steps.
   *
   * | Name                              | Type                      | Description                                                                                                                                                                              |
   * | --------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `completed`                       | `bool`                    | Whether the step has been completed                                                                                                                                                      |
   * | `component`                       | `element, func`           | When provided, this will render the passed in component for link elements in this Step. This is useful when integrating with React Router's `<Link>` or using your own custom component. |
   * | `description`                     | `string`                  | Additional text to dsiplay under (only rendered for top-level steps)                                                                                                                     |
   * | `heading` (required)              | `string`                  | Text to display as the step heading                                                                                                                                                      |
   * | `headingLevel`                    | `'1', '2', '3', '4', '5'` | Heading type to override default `<h2>`.                                                                                                                                                 |
   * | `href` (required)                 | `string`                  | URL or partial URL that routes to the step. Will be passed to `onStepLinkClick` as first parameter                                                                                       |
   * | `id`                              | `string`                  | Unique string representing the step. WIll be passed to `onStepLinkClick` as second parameter                                                                                             |
   * | `isNextStep`                      | `bool`                    | Whether this is the next unstarted step                                                                                                                                                  |
   * | `linkText`                        | `string`                  | Alternative text for the link or button for this step. Will override the defaults                                                                                                        |
   * | `onClick`                         | `func`                    | `onClick` handler for this specific step's link/button                                                                                                                                   |
   * | `started`                         | `bool`                    | Whether the step has been started                                                                                                                                                        |
   * | `steps`                           | `StepObject[]`            | Array of substeps                                                                                                                                                                        |
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

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/step-list/).
 */
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
