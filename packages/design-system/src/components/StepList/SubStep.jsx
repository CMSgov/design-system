import PropTypes from 'prop-types';
import React from 'react';
import StepLink from './StepLink';

export const SubStep = ({ step, ...props }) => (
  <li className="ds-c-substep">
    <div className="ds-c-substep__heading">{step.title || step.heading}</div>
    {(step.completed || step.started) && (
      <StepLink
        component={step.component}
        href={step.href}
        stepId={step.id}
        screenReaderText={step.title || step.heading}
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

// Duplication of stepShape in `StepList`, for react2dts
export const stepShape = {
  id: PropTypes.string,
  href: PropTypes.string.isRequired,
  title: PropTypes.string, // [Deprecated]
  heading: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOf(['1', '2', '3', '4', '5']),
  description: PropTypes.string,
  linkText: PropTypes.string,
  completed: PropTypes.bool,
  started: PropTypes.bool,
  isNextStep: PropTypes.bool,
  onClick: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

SubStep.propTypes = {
  step: PropTypes.shape(stepShape).isRequired,
  onStepLinkClick: PropTypes.func,
  showSubSubSteps: PropTypes.bool,
  editText: PropTypes.string.isRequired,
};

export default SubStep;
