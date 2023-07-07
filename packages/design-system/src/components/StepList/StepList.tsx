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
 *
 * ## Start, Resume, and Edit links
 *
 * A user interacts with the steps through "Start", "Resume", and "Edit"
 * links.
 *
 * In the React component, the links' `href` properties are determined by the
 * `step` object's `href` property. One can also optionally pass an
 * `onStepLinkClick` function that will cancel the default link behavior and call
 * `onStepLinkClick` with `href` as a parameter for apps that handle routing with
 * JavaScript.
 *
 * When a step has substeps and is incomplete, the `href` property should be set to
 * match the `href` of the current substep—that is, the first incomplete substep.
 * The "Edit" button will only appear on substeps that have been completed.
 *
 * ## Managing list state
 *
 * ### Substeps
 *
 * The `<StepList>` component takes an array of step objects. From there steps can
 * be broken down infinitely into sub-steps. This allows us to have unique URLs for
 * each part of a step; however, by default we only display two levels of this tree
 * —the _step_ and _substep_. This default behavior should remain unchanged except
 * for special circumstances. It is better not to overwhelm the user with showing
 * all the substeps and giving them names.
 *
 * We do, nonetheless, encourage the use of sub-substeps that are not visible where
 * these substeps span multiple pages and have their own unique URLs. If, for
 * example, the user completes the first page of the `household > overall` substep
 * where they list the household members but has not completed the second page
 * where they define those members' relationships to each other, we want the
 * "Resume" button to take them back to the relationships page and not the first
 * page where they entered their names. This, of course, requires an extra
 * steps-building process to update a top-level steps' `href` property by
 * traversing the substep tree to find the first incomplete step. See the
 * [Completed, started, and isNextStep](#completed-started-and-isnextstep) section
 * below for an example JavaScript function that can change the `href` of steps
 * based on their substeps.
 *
 * ### Completed, started, and isNextStep
 *
 * The _state_ of a step object will be defined for these purposes as the values
 * of its `completed`, `started`, and `isNextStep` properties. These correspond to
 * different visual states when rendered by the `<StepList>`, showing "Completed",
 * "Resume", or "Start" respectively. For steps with substeps, the state should be
 * representative of the collective states of its substeps. For example, if a step
 * has substeps that have `completed: false`, that step should not have
 * `completed: true` because not all of its substeps have been completed. Similarly
 * a step can only be `started` if at least one of its substeps has been `started`.
 * This should be true for each of the substep's substeps and so on. Below is an
 * example function that can propagate this state information up from the smallest
 * substep to the largest step before passing the steps array to the `<StepList>`
 * component.
 *
 * ```js
 * function propagateSubstepState(step) {
 *   if (step.steps) {
 *     const steps = step.steps.map(propagateSubstepState);
 *     const newStep = {
 *       ...step,
 *       steps,
 *       started: steps.some((s) => s.started),
 *       completed: steps.every((s) => s.completed),
 *     };
 *     if (!newStep.completed) {
 *       const nextStep = steps.find((s) => !s.completed);
 *       newStep.href = nextStep.href;
 *     }
 *     return newStep;
 *   } else {
 *     return step;
 *   }
 * }
 *
 * // ...
 * //
 * // Render function:
 *
 * const steps = rawSteps.map(propagateSubstepState);
 * return <StepList steps={steps} />;
 * ```
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
