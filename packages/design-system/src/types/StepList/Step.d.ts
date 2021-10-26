import * as React from 'react';
import { StepObjectWithSubStep } from './StepList';

export interface StepProps {
  step: StepObjectWithSubStep;
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
