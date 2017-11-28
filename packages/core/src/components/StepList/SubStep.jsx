import PropTypes from 'prop-types';
import React from 'react';
import StepLink from './StepLink';
import { stepShape } from './StepList';

export const SubStep = ({ step, ...props }) => (
  <li className="ds-c-substep">
    <div className="ds-u-display--flex ds-u-justify-content--between">
      <div className="ds-c-substep__title">{step.title}</div>
      <div>
        {step.completed && (
          <StepLink
            route={step.route}
            screenReaderText={`"${step.title}"`}
            onEnterStep={props.onEnterStep}
          >
            {props.editText}
          </StepLink>
        )}
      </div>
    </div>
    {step.steps && (
      <ul>{step.steps.map(s => <SubStep step={s} key={s.id} {...props} />)}</ul>
    )}
  </li>
);

SubStep.propTypes = {
  step: PropTypes.shape(stepShape).isRequired,
  onEnterStep: PropTypes.func.isRequired,
  editText: PropTypes.string.isRequired
};

export default SubStep;
