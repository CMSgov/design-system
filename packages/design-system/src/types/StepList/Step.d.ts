import * as React from 'react';

export interface StepStep {
  id?: string;
  href: string;
  title?: string;
  heading: string;
  headingLevel?: '1' | '2' | '3' | '4' | '5';
  description?: string;
  linkText?: string;
  completed?: boolean;
  started?: boolean;
  isNextStep?: boolean;
  onClick?: (...args: any[]) => any;
  component?: React.ReactElement<any> | ((...args: any[]) => any);
}

export interface StepProps {
  step: StepStep;
  onStepLinkClick?: (...args: any[]) => any;
  showSubSubSteps?: boolean;
  completedText: string;
  editText: string;
  resumeText: string;
  startText: string;
  actionsLabelText?: string;
  descriptionLabelText?: string;
  substepsLabelText?: string;
}

declare const Step: React.FC<StepProps>;

export default Step;
