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
  const contentClassName = classNames('ds-c-step__content', {
    'ds-c-step__content--with-content': step.description || step.steps
  });
  const { actionsLabelText, substepsLabelText, descriptionLabelText } = props;
  const actionsLabel = actionsLabelText.replace('%{step}', step.title);
  const substepsLabel = substepsLabelText.replace('%{step}', step.title);
  const descriptionLabel = descriptionLabelText.replace('%{step}', step.title);
  return (
    <li className={className}>
      <div className={contentClassName}>
        <h2 className="ds-c-step__title">{step.title}</h2>
        {step.description && (
          <div className="ds-c-step__description" aria-label={descriptionLabel}>
            {step.description}
          </div>
        )}
        {step.steps && (
          <ol className="ds-c-step__substeps" aria-label={substepsLabel}>
            {step.steps.map((s, i) => (
              <SubStep step={s} key={s.id || i} {...props} />
            ))}
          </ol>
        )}
      </div>
      <div className="ds-c-step__actions" aria-label={actionsLabel}>
        {step.completed && (
          <div className="ds-c-step__completed-text">{props.completedText}</div>
        )}
        {step.completed &&
          !step.steps && (
            <StepLink
              href={step.href}
              stepId={step.id}
              screenReaderText={`"${step.title}"`}
              onClick={props.onStepLinkClick}
            >
              {props.editText}
            </StepLink>
          )}
        {start && (
          <StepLink
            href={step.href}
            stepId={step.id}
            screenReaderText={`"${step.title}"`}
            onClick={props.onStepLinkClick}
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
            onClick={props.onStepLinkClick}
            className="ds-c-button ds-c-button--primary"
          >
            {props.resumeText}
          </StepLink>
        )}
      </div>
    </li>
  );
};

Step.propTypes = {
  step: PropTypes.shape(stepShape).isRequired,
  onStepLinkClick: PropTypes.func,
  showSubSubSteps: PropTypes.bool,
  completedText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  resumeText: PropTypes.string.isRequired,
  startText: PropTypes.string.isRequired,
  actionsLabelText: PropTypes.string.isRequired,
  descriptionLabelText: PropTypes.string.isRequired,
  substepsLabelText: PropTypes.string.isRequired
};

export default Step;
