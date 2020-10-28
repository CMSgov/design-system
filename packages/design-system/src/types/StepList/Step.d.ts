import * as React from 'react';
import { SubStepProps } from './SubStep';

// Step Object is used in <Step> and <SubStep>
export interface StepObject {
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

// Substeps can be defined via the `steps` prop
interface SubSteps {
  steps?: SubStepProps[];
};

export interface StepProps {
  step: StepObject & SubSteps
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
