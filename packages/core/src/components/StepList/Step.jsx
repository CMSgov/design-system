import PropTypes from 'prop-types';
import React from 'react';
import StepLink from './StepLink';
import SubStep from './SubStep';
import classNames from 'classnames';
import { stepShape } from './StepList';

export const Step = ({ step, ...props }) => {
  const start = step.isNextStep;
  const resume = step.started && !step.completed;
  const className = classNames('ds-c-step', {
    'ds-c-step--current': start || resume,
    'ds-c-step--completed': step.completed
  });
  return (
    <li className={className}>
      <h2 className="ds-c-step__header">
        <div className="ds-c-step__title">{step.title}</div>
        <div className="ds-c-step__actions">
          {step.completed && (
            <div className="ds-c-step__completed_text">
              {props.completedText}
            </div>
          )}
          {step.completed &&
            !step.steps && (
              <StepLink
                href={step.href}
                stepId={step.id}
                screenReaderText={`"${step.title}"`}
                onEnterStep={props.onEnterStep}
              >
                {props.editText}
              </StepLink>
            )}
          {start && (
            <StepLink
              href={step.href}
              stepId={step.id}
              screenReaderText={`"${step.title}"`}
              onEnterStep={props.onEnterStep}
              className="ds-c-button ds-c-button--primary"
            >
              {props.startText}
            </StepLink>
          )}
          {resume && (
            <StepLink
              href={step.href}
              stepId={step.id}
              screenReaderText={`"${step.title}"`}
              onEnterStep={props.onEnterStep}
              className="ds-c-button ds-c-button--primary"
            >
              {props.resumeText}
            </StepLink>
          )}
        </div>
      </h2>
      {step.description && (
        <div className="ds-c-step__description">{step.description}</div>
      )}
      {step.steps && (
        <ol className="ds-c-step__substeps">
          {step.steps.map(s => <SubStep step={s} key={s.id} {...props} />)}
        </ol>
      )}
    </li>
  );
};

Step.propTypes = {
  step: PropTypes.shape(stepShape).isRequired,
  onEnterStep: PropTypes.func.isRequired,
  completedText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  resumeText: PropTypes.string.isRequired,
  startText: PropTypes.string.isRequired
};

export default Step;
