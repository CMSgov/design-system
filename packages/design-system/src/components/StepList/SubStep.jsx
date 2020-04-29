import PropTypes from 'prop-types';
import React from 'react';
import StepLink from './StepLink';
import { stepShape } from './StepList';

export const SubStep = ({ step, ...props }) => (
  <li className="ds-c-substep">
    <div className="ds-c-substep__heading">{step.title}</div>
    {step.completed && (
      <StepLink
        component={step.component}
        href={step.href}
        stepId={step.id}
        screenReaderText={`"${step.title}"`}
        onClick={step.onClick || props.onStepLinkClick}
        className="ds-c-substep__edit"
      >
        {step.linkText || props.editText}
      </StepLink>
    )}
    {step.steps && props.showSubSubSteps && (
      <ul>
        {step.steps.map((s, i) => (
          <SubStep step={s} key={s.id || i} {...props} />
        ))}
      </ul>
    )}
  </li>
);

SubStep.propTypes = {
  step: PropTypes.shape(stepShape).isRequired,
  onStepLinkClick: PropTypes.func,
  showSubSubSteps: PropTypes.bool,
  editText: PropTypes.string.isRequired
};

export default SubStep;
