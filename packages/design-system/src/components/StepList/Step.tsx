import React from 'react';
import StepLink, { StepLinkProps } from './StepLink';
import SubStep from './SubStep';
import classNames from 'classnames';
// import { CheckIcon } from '../Icons';
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
}

export const Step = ({ step, ...props }: StepProps) => {
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

  let linkLabel: string;
  if (step.completed && !step.steps) {
    linkLabel = step.linkText || props.editText;
  } else if (start) {
    linkLabel = step.linkText || props.startText;
  } else if (resume) {
    linkLabel = step.linkText || props.resumeText;
  }

  let linkClassName: string;
  if (start || resume) {
    linkClassName = 'ds-c-button ds-c-button--solid ds-c-button--main ds-c-button--on-light';
  }

  // TODO: make heading required after removing title
  return (
    <li role="listitem" className={className}>
      <div className={contentClassName}>
        <Heading className="ds-c-step__heading">{step.heading}</Heading>
        {step.description && (
          <div className="ds-c-step__description" role="region">
            {step.description}
          </div>
        )}
        {step.steps && (
          <ol role="list" className="ds-c-step__substeps">
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
            {/* <CheckIcon className="ds-c-icon-color--success" /> */}
            {props.completedText}
          </div>
        )}
        {linkLabel && (
          <StepLink
            component={step.component}
            href={step.href}
            stepId={step.id}
            screenReaderText={step.heading}
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
