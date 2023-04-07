import React from 'react';
import StepLink, { StepLinkProps } from './StepLink';
import SubStep from './SubStep';
import classNames from 'classnames';
import { CheckIcon } from '../Icons';
import uniqueId from 'lodash/uniqueId';

type HeadingLevel = '1' | '2' | '3' | '4' | '5';

export interface StepObject {
  id?: string;
  href: string;
  heading: string;
  headingLevel?: HeadingLevel;
  description?: string;
  linkText?: string;
  completed?: boolean;
  started?: boolean;
  isNextStep?: boolean;
  onClick?: StepLinkProps['onClick'];
  component?: StepLinkProps['component'];
  steps?: StepObject[];
}

export interface StepProps {
  step: StepObject;
  onStepLinkClick?: StepLinkProps['onClick'];
  showSubSubSteps?: boolean;
  completedText: string;
  editText: string;
  resumeText: string;
  startText: string;
  actionsLabelText: string;
  substepsLabelText: string;
}

export const Step = ({ step, ...props }: StepProps) => {
  const getAriaLabelText = (text) => {
    const isValidTemplate = text && text.length > 0;
    const label = isValidTemplate ? text.replace('%{step}', step.heading) : undefined;
    return label;
  };
  const Heading = `h${step.headingLevel || '2'}` as const;
  const start = step.isNextStep;
  const resume = step.started && !step.completed;
  const className = classNames('ds-c-step', {
    'ds-c-step--current': start || resume,
    'ds-c-step--completed': step.completed,
  });
  const contentClassName = classNames('ds-c-step__content', {
    'ds-c-step__content--with-content': step.description || step.steps,
  });
  const { actionsLabelText, substepsLabelText } = props;
  const actionsLabel = getAriaLabelText(actionsLabelText);
  const substepsLabel = getAriaLabelText(substepsLabelText);
  const descriptionHeadingID = uniqueId('heading-');
  const subStepsAriaSpanID = uniqueId('ss-label-');

  let linkLabel;
  if (step.completed && !step.steps) {
    linkLabel = step.linkText || props.editText;
  } else if (start) {
    linkLabel = step.linkText || props.startText;
  } else if (resume) {
    linkLabel = step.linkText || props.resumeText;
  }

  let linkClassName;
  if (start || resume) {
    linkClassName = 'ds-c-button ds-c-button--solid ds-c-button--main ds-c-button--on-light';
  }

  // TODO: make heading required after removing title
  return (
    <li role="listitem" className={className}>
      <div className={contentClassName}>
        <Heading id={descriptionHeadingID} className="ds-c-step__heading">
          {step.heading}
        </Heading>
        {step.description && (
          <div
            className="ds-c-step__description"
            aria-describedby={descriptionHeadingID}
            role="region"
          >
            {step.description}
          </div>
        )}
        <span id={subStepsAriaSpanID} className="ds-u-visibility--screen-reader">
          {' '}
          {substepsLabel}
        </span>
        {step.steps && (
          <ol role="list" className="ds-c-step__substeps" aria-describedby={subStepsAriaSpanID}>
            {step.steps.map((s, i) => (
              <SubStep
                step={{ ...s, ...{ component: step.component || s.component } }}
                key={s.id || i}
                {...props}
              />
            ))}
          </ol>
        )}
      </div>
      <div className="ds-c-step__actions" role="region">
        {step.completed && (
          <div className="ds-c-step__completed-text">
            <CheckIcon className="ds-c-icon-color--success" />
            {props.completedText}
          </div>
        )}
        {linkLabel && (
          <StepLink
            component={step.component}
            href={step.href}
            stepId={step.id}
            screenReaderText={actionsLabel}
            onClick={step.onClick || props.onStepLinkClick}
            className={linkClassName}
          >
            {linkLabel}
          </StepLink>
        )}
      </div>
    </li>
  );
};

export default Step;
