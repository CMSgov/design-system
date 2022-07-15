import React from 'react';
import StepLink, { StepLinkProps } from './StepLink';
import { StepObject } from './Step';

interface SubStepProps {
  step: StepObject;
  onStepLinkClick?: StepLinkProps['onClick'];
  showSubSubSteps?: boolean;
  editText: string;
}

export const SubStep = ({ step, ...props }: SubStepProps) => (
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

export default SubStep;
