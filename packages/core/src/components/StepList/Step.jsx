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
      <h2 className="ds-c-step__header ds-h3 ds-u-display--flex ds-u-justify-content--between">
        <div className="ds-c-step__title">{step.title}</div>
        <div>
          {step.completed && (
            <div className="ds-c-step__completed">
              <span>{props.completedText}</span>
              {!step.steps && (
                <StepLink
                  route={step.route}
                  stepId={step.id}
                  screenReaderText={`"${step.title}"`}
                  onEnterStep={props.onEnterStep}
                >
                  {props.editText}
                </StepLink>
              )}
            </div>
          )}
          {start && (
            <StepLink
              route={step.route}
              stepId={step.id}
              screenReaderText={`"${step.title}"`}
              onEnterStep={props.onEnterStep}
              className="ds-c-button ds-c-button--success"
            >
              {props.startText}
            </StepLink>
          )}
          {resume && (
            <StepLink
              route={step.route}
              stepId={step.id}
              screenReaderText={`"${step.title}"`}
              onEnterStep={props.onEnterStep}
              className="ds-c-button ds-c-button--success"
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
