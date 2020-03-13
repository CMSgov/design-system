import PropTypes from 'prop-types';
import React from 'react';
import StepLink from './StepLink';
import SubStep from './SubStep';
import classNames from 'classnames';
import { stepShape } from './StepList';

export const Step = ({ step, ...props }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (step.title) {
      console.warn(
        `[Deprecated]: Please remove the 'title' prop the <StepList> step object, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
      );
    }
    if (!step.title && !step.heading) {
      console.warn(
        `The 'heading' prop the <StepList> step object, use 'heading' instead. This prop has been renamed and will be removed in a future release.`
      );
    }
  }

  const Heading = `h${step.headingLevel || '2'}`;
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
  const actionsLabel = actionsLabelText.replace('%{step}', step.heading || step.title);
  const substepsLabel = substepsLabelText.replace('%{step}', step.heading || step.title);
  const descriptionLabel = descriptionLabelText.replace('%{step}', step.heading || step.title);

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
    linkClassName = 'ds-c-button ds-c-button--primary';
  }

  // TODO: make heading required after removing title
  return (
    <li className={className}>
      <div className={contentClassName}>
        <Heading className="ds-c-step__heading">{step.heading || step.title}</Heading>
        {step.description && (
          <div className="ds-c-step__description" aria-label={descriptionLabel}>
            {step.description}
          </div>
        )}
        {step.steps && (
          <ol className="ds-c-step__substeps" aria-label={substepsLabel}>
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
      <div className="ds-c-step__actions" aria-label={actionsLabel}>
        {step.completed && <div className="ds-c-step__completed-text">{props.completedText}</div>}
        {linkLabel && (
          <StepLink
            component={step.component}
            href={step.href}
            stepId={step.id}
            screenReaderText={`"${step.heading || step.title}"`}
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
